// Electron Libs
const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

ipc.on('open-file-dialog', event => {
  const [file] = dialog.showOpenDialogSync(
    {
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'svg'] }],
    }
  )

  if (file) { event.sender.send('file-selected', file); }
});
