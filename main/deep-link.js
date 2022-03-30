const { app, BrowserWindow } = require('electron');
const appConfig = require('electron-settings');

// Get mainWindow Object
const mainWindowID = appConfig.getSync('mainWindowID');
const mainWindow = BrowserWindow.fromId(mainWindowID);

app.on('open-url', (event, url) => {
  if (url.includes('invoncify://')) {
    let operation;
    const [protocol, request] = url.split('invoncify://');

    if (request.includes('?')) {
      const [requestBase, queryParams] = request.split('?');

      operation = requestBase;
    } else {
      operation = request;
    }

    switch (operation) {
      case 'new': {
        mainWindow.webContents.send('menu-change-tab', 'form');
        break;
      }
      case 'invoices': {
        mainWindow.webContents.send('menu-change-tab', 'invoices');
        break;
      }
      case 'contacts': {
        mainWindow.webContents.send('menu-change-tab', 'contacts');
        break;
      }
      case 'statistics': {
        mainWindow.webContents.send('menu-change-tab', 'statistics');
        break;
      }
      case 'settings': {
        mainWindow.webContents.send('menu-change-tab', 'settings');
        break;
      }
      case 'preview': {
        // coming soon
        break;
      }
      default:
        break;
    }
  }
});
