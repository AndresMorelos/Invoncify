// Electron Libs
const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

ipc.on('open-import-file-dialog', event => {
  const [file] = dialog.showOpenDialogSync(
    {
      properties: ['openFile'],
      filters: [{ name: 'Import Data', extensions: ['json'] }],
    }
  )

  if (file) { event.sender.send('import-file-selected', file); }
});
