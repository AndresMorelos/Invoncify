const { ipcRenderer } = require("electron")
const sounds = require('../../libs/sounds')

const openDialog = (dialogOptions, returnChannel, ...rest) => {
  ipcRenderer.send('open-dialog', dialogOptions, returnChannel, ...rest)
  sounds.play('DIALOG');
}

module.exports = openDialog;
