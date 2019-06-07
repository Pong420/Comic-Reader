import * as path from 'path';
import * as url from 'url';
import {
  app,
  shell,
  session,
  BrowserWindow,
  WebPreferences,
  OnBeforeSendHeadersDetails
} from 'electron';
import { MenuBuilder } from './menu';

let mainWindow: BrowserWindow | null = null;

interface RequestHeaders {
  Origin: string;
  Referer: string;
  'User-Agent': string;
}

interface HeaderDetails extends OnBeforeSendHeadersDetails {
  requestHeaders: RequestHeaders;
}

const isDevelopment = process.env.NODE_ENV === 'development';
const webPreferences: WebPreferences = isDevelopment
  ? {
      // if you have CROS issue, you could uncomment below config
      webSecurity: false,
      nodeIntegration: true
    }
  : {};

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
    titleBarStyle: 'hiddenInset',
    frame: false,
    webPreferences,
    autoHideMenuBar: true
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
    if (mainWindow) {
      mainWindow.show();

      isDevelopment &&
        mainWindow.webContents.openDevTools({ mode: 'undocked' });
    }
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  if (session.defaultSession) {
    session.defaultSession.webRequest.onBeforeSendHeaders(
      { urls: [] },
      (detailsProps, callback) => {
        const details = detailsProps as HeaderDetails;

        if (/hamreus/.test(details.url)) {
          details.requestHeaders.Referer = 'https://www.manhuagui.com/';
        }

        if (/m\.manhuagui\.com/.test(details.url)) {
          details.requestHeaders['User-Agent'] =
            '"Mozilla/5.0 (Linux; Android 7.0;) Chrome/58.0.3029.110 Mobile")';
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
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
