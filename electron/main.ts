import * as path from 'path';
import * as url from 'url';
import { app, session, BrowserWindow, WebPreferences, OnBeforeSendHeadersDetails } from 'electron';
import { MenuBuilder } from './menu';

interface RequestHeaders {
  Origin: string;
  Referer: string;
  'User-Agent': string;
}

interface HeaderDetails extends OnBeforeSendHeadersDetails {
  requestHeaders: RequestHeaders;
}

const MAC_OS = process.platform === 'darwin';
const WIN_OS = process.platform === 'win32';
const FRAME_LESS = MAC_OS || WIN_OS;

let mainWindow: BrowserWindow | null = null;

const isDevelopment = process.env.NODE_ENV === 'development';
const webPreferences: WebPreferences = isDevelopment
  ? {
      // if you have CROS issue, you could uncomment below config
      webSecurity: false
    }
  : {
      // Disable Node.js Integration for Remote Content
      // https://electronjs.org/docs/tutorial/security#2-disable-nodejs-integration-for-remote-content
      // nodeIntegration: false,
      // nodeIntegrationInWorker: false
    };

async function createWindow() {
  if (isDevelopment) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = await import('electron-devtools-installer');
    await installExtension(REACT_DEVELOPER_TOOLS);
    await installExtension(REDUX_DEVTOOLS);
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024 + 80,
    height: 720,
    titleBarStyle: FRAME_LESS ? 'hiddenInset' : 'default',
    frame: !FRAME_LESS,
    webPreferences
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true
    });

  mainWindow.loadURL(startUrl);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow && mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  if (session.defaultSession) {
    session.defaultSession.webRequest.onBeforeSendHeaders(
      { urls: [] },
      (detailsProps: OnBeforeSendHeadersDetails, callback) => {
        const details = detailsProps as HeaderDetails;

        if (/hamreus/.test(details.url)) {
          details.requestHeaders.Referer = 'https://www.manhuagui.com/';
        }

        if (/m\.manhuagui\.com/.test(details.url)) {
          details.requestHeaders['User-Agent'] = '"Mozilla/5.0 (Linux; Android 7.0;) Chrome/58.0.3029.110 Mobile")';
        }

        callback({
          cancel: false,
          requestHeaders: details.requestHeaders
        });
      }
    );
  }
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  !MAC_OS && app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
