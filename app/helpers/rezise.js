const { BrowserWindow, ipcMain } = require('@electron/remote');
const appConfig = require('@electron/remote').require('electron-settings');

const mainWindowID = appConfig.getSync('mainWindowID');
const mainWindow = BrowserWindow.fromId(mainWindowID);


ipcMain.on('rezie-main-window', (event, width, height) => {
    mainWindow.setSize(width, height, true)
})