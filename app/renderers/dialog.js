const { ipcRenderer } = require("electron")

const openDialog = (dialogOptions, returnChannel, ...rest) => {
  ipcRenderer.send('open-dialog', dialogOptions, returnChannel, ...rest)
}

module.exports = openDialog;
