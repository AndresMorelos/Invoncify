const { ipcMain } = require('electron');
const electronConfig = require('electron-settings');

ipcMain.on('getSync', (event, key) => {
    const config = electronConfig.getSync(key)
    event.returnValue =  config
})