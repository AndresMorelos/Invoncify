const { contextBridge, ipcRenderer } = require('electron');
const exportData = require('./main/export-data');
const { cs_sounds, default_sounds } = require('./helpers/sound');
const PouchDB = require('./helpers/pouchDB');
const Jimp = require('./helpers/Jimp')

contextBridge.exposeInMainWorld('invoncify', {
  receive(channel, func) {
    const validChannels = [
      'confirmed-delete-invoice',
      'confirmed-delete-contact',
      'bad-secret-key'
    ];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  exportData,
  appConfig: {
    getSync(key) {
      return ipcRenderer.sendSync('getSync', key);
    },
  },
  settings: {
    changePreviewWindowProfile(newProfile) {
      ipcRenderer.send('change-preview-window-profile', newProfile);
    },
    changePreviewWindowLanguage(newLang) {
      ipcRenderer.send('change-preview-window-language', newLang);
    },
    openImportFileDialog(){
      ipcRenderer.send('open-import-file-dialog');
    },
    dataMigrated(){
      ipcRenderer.send('data-migrated');
    },
    resizeMainWindow(width, height) {
      ipcRenderer.send('resize-main-window', width, height);
    },
    openFileDialog(){
      ipcRenderer.send('open-file-dialog');
    },
    updateDownloadStarted(){
      ipcRenderer.send('update-download-started')
    },
    quitAndInstall(){
      ipcRenderer.send('quit-and-install');
    },
    selectExportDirectory(){
      ipcRenderer.send('select-export-directory');
    },
    checkForUpdates(){
      ipcRenderer.send('check-for-updates');
    },
    quitApp(){
      ipcRenderer.send('quit-app');
    },
    startTour(){
      ipcRenderer.send('start-tour');
    }
  },
  platform: process.platform,
  type: process.type,
  isDev: process.env.isDev,
  sounds: {
    cs_sounds,
    default_sounds,
  },
  openDialog(dialogOptions, returnChannel, ...rest) {
    ipcRenderer.send('open-dialog', dialogOptions, returnChannel, ...rest);
  },
  encryption: {
    encrypt(data) {
      return ipcRenderer.sendSync('encrypt-data', data);
    },
    decrypt(data) {
      return ipcRenderer.sendSync('decrypt-data', data);
    },
    getSettings() {
      return ipcRenderer.sendSync('encryption-get-settings');
    },
    setSettings(data) {
      return ipcRenderer.sendSync('encryption-set-settings', data);
    },
    validateSecret(data) {
      return ipcRenderer.sendSync('secret-key-updated', data);
    },
  },
  PouchDB,
  Jimp,
  invoice: {
    previewInvoice(docDecrypted) {
      ipcRenderer.send('preview-invoice', docDecrypted);
    },
  },
  menuActions: {

  }
});
