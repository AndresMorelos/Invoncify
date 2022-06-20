// Libs
const moment = require('moment');
const { ipcMain } = require('electron');
const appConfig = require('electron-settings');
const path = require('path');
const fs = require('fs-extra');

ipcMain.on('export-data', (event, docToExport) => {
  const exportDir = appConfig.getSync('invoice.exportDir');

  const dirPath = path.join(exportDir, 'exports');
  const filePath = path.join(
    dirPath,
    `data-export-${moment().format('MM-DD-YYYY')}.invoncifyExport`
  );

  fs.ensureDir(dirPath)
    .then(() => {
      fs.writeFileSync(filePath, docToExport);

      // Show notification
      event.sender.send('file-exported', {
        title: 'Data Exported',
        body: 'Click to reveal file.',
        location: filePath,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
