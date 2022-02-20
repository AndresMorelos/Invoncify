const { BrowserWindow, ipcMain } = require('@electron/remote');
const appConfig = window.invoncify.appConfig

const mainWindowID = appConfig.getSync('mainWindowID');
const mainWindow = BrowserWindow.fromId(mainWindowID);


ipcMain.on('resize-main-window', (event, width, height) => {
    mainWindow.setSize(width, height, true)
})