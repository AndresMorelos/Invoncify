// Libs
const moment = require('moment');
const { ipcMain } = require('electron');
const appConfig = require('electron-settings');
const path = require('path');
const fs = require('fs');

ipcMain.on('export-data', (event, docToExport) => {
  const exportDir = appConfig.getSync('invoice.exportDir');
  const filePath = path.join(exportDir, `data-export-${moment().format('MM-DD-YYYY')}.json`);

  const data = JSON.stringify(docToExport, null, 2)

  fs.writeFileSync(filePath, data);

  // Show notification
  event.sender.send('file-exported',
    {
      title: 'Data Exported',
      body: 'Click to reveal file.',
      location: filePath,
    });

});