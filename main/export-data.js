// Libs
const { BrowserWindow, ipcMain, shell } = require('electron');
const appConfig = require('electron-settings');
const path = require('path');
const fs = require('fs');
const { v4 } = require('uuid')

ipcMain.on('export-data', (event, docToExport) => {

  const exportDir = appConfig.getSync('invoice.exportDir');
  const filePath = path.join(exportDir, `${v4()}.json`);
  const win = BrowserWindow.fromWebContents(event.sender);

  const data = JSON.stringify(docToExport, null, 2)

  fs.writeFileSync(filePath, data, (error) => {
    if(error) {
      throw error
    }
    // Show notification
    win.webContents.send('file-exported',
      {
        title: 'Data Exported',
        body: 'Click to reveal file.',
        location: filePath,
      });
  });

});