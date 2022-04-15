// Electron Libs
const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

ipc.on('open-import-file-dialog', (event) => {
  const result = dialog.showOpenDialogSync({
    properties: ['openFile'],
    filters: [{ name: 'Import Data', extensions: ['invoncifyExport'] }],
  });
  if (Array.isArray(result) && result.length > 0) {
    event.sender.send('import-file-selected', result[0]);
  }
});
