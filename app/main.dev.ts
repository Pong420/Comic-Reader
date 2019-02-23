/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import {
  app,
  BrowserWindow,
  session,
  OnBeforeSendHeadersDetails
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { startServer } from '../server';
import { getFreePort } from './utils/getFreePort';
import MenuBuilder from './menu';

interface RequestHeaders {
  Origin: string;
  Referer: string;
}

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;
let server = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const PORT = process.env.PORT || (await getFreePort(1212));
  server = await startServer(PORT);

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024 + 80,
    height: 720,
    titleBarStyle: 'hiddenInset',
    frame: false
  });

  mainWindow.config = {
    PORT
  };

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  const filters = [
    {
      regex: /hamreus/,
      origin: 'https://tw.manhuagui.com/'
    }
  ];

  session.defaultSession.webRequest.onBeforeSendHeaders(
    { urls: [] },
    (
      details: OnBeforeSendHeadersDetails & { requestHeaders: RequestHeaders },
      callback
    ) => {
      filters.forEach(({ regex, origin }) => {
        if (regex.test(details.url)) {
          details.requestHeaders.Origin = origin;
          details.requestHeaders.Referer = origin;
        }
      });

      callback({
        cancel: false,
        requestHeaders: details.requestHeaders
      });
    }
  );

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});

app.on('before-quit', () => {
  server && server.close();
});
