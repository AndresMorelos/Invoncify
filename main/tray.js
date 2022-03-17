const path = require('path');
// Libs
const { app, nativeImage, Menu, Tray, BrowserWindow } = require('electron');
const appConfig = require('electron-settings');
const ipc = require('electron').ipcRenderer;

// Get mainWindow Object
const mainWindowID = appConfig.getSync('mainWindowID');
const mainWindow = BrowserWindow.fromId(mainWindowID);

let tray = null;

const trayMenu = [
  {
    label: 'New Invoice',
    accelerator: 'CmdOrCtrl+N',
    click() {
      mainWindow.show();
      mainWindow.webContents.send('menu-change-tab', 'form');
    },
  },
  {
    type: 'separator',
  },
  {
    label: 'Go to Invoices',
    accelerator: 'CmdOrCtrl+Shift+A',
    click() {
      mainWindow.show();
      mainWindow.webContents.send('menu-change-tab', 'invoices');
    },
  },
  {
    label: 'Go to Contacts',
    accelerator: 'CmdOrCtrl+Shift+D',
    click() {
      mainWindow.show();
      mainWindow.webContents.send('menu-change-tab', 'contacts');
    },
  },
  {
    label: 'Go to Statistics',
    accelerator: 'CmdOrCtrl+Shift+G',
    click() {
      mainWindow.show();
      mainWindow.webContents.send('menu-change-tab', 'statistics');
    },
  },
  {
    label: 'Go to Settings',
    accelerator: 'CmdOrCtrl+Shift+S',
    click() {
      mainWindow.show();
      mainWindow.webContents.send('menu-change-tab', 'settings');
    },
  },
  { type: 'separator' },
  {
    label: 'Quit App',
    accelerator: 'CmdOrCtrl+Q',
    click() {
      app.quit();
    },
  },
];

app.whenReady().then(() => {
  // Build the menu
  const menu = Menu.buildFromTemplate(trayMenu);

  const pathImg = path.resolve(
    __dirname,
    '..',
    'static',
    'imgs',
    'tray_icon.png'
  );

  const image = nativeImage.createFromPath(pathImg);

  tray = new Tray(image.resize({ width: 16, height: 16 }));

  if (process.platform === 'win32') {
    tray.on('click', tray.popUpContextMenu);
  }

  tray.setContextMenu(menu);
});
