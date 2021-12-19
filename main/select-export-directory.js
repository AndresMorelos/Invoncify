// Node Libs
const fs = require('fs');

// Electron Libs
const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;
const BrowserWindow = require('electron').BrowserWindow;

// 3rd Party Libs
const appConfig = require('electron-settings');

ipc.on('select-export-directory', event => {
  const window = BrowserWindow.fromWebContents(event.sender);
  const path = dialog.showOpenDialogSync(window, { properties: ['openDirectory'] });
  
  if (path) {
    fs.access(path[0], fs.constants.W_OK, err => {
      if (err) {
        event.sender.send('no-access-directory', err.message);
      } else {
        appConfig.setSync('exportDir', path[0]);
        event.sender.send('confirmed-export-directory', path[0]);
      }
    });
  }
});
