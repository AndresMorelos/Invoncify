// Electron Libs
const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

ipc.on('open-import-file-dialog', event => {
  const result = dialog.showOpenDialogSync(
    {
      properties: ['openFile'],
      filters: [{ name: 'Import Data', extensions: ['json'] }],
    }
  )

  if (result && result.file) { event.sender.send('import-file-selected', result.file); }
});
