/* eslint-disable no-undef */
const path = require('path');
// Libs
const {
  app,
  nativeImage,
  Menu,
  Tray,
  BrowserWindow,
  ipcMain,
} = require('electron');
const appConfig = require('electron-settings');

const { trayIcon } = appConfig.getSync('general');

// Get mainWindow Object
const mainWindowID = appConfig.getSync('mainWindowID');
const mainWindow = BrowserWindow.fromId(mainWindowID);

function showApp() {
  app.isHidden = false;
  if (process.platform !== 'darwin') {
    mainWindow.setSkipTaskbar(false);
  } else {
    app.dock.show();
  }
  mainWindow.show();
}

function hideApp() {
  app.isHidden = true;
  if (process.platform !== 'darwin') {
    mainWindow.setSkipTaskbar(true);
  } else {
    app.dock.hide();
  }
  mainWindow.hide();
}

const trayMenu = [
  {
    label: 'Open/Hide Invoncify',
    click() {
      if (app.isHidden === true) {
        showApp();
      } else {
        hideApp();
      }
    },
  },
  {
    type: 'separator',
  },
  {
    label: 'New Invoice',
    accelerator: 'CmdOrCtrl+N',
    click() {
      showApp();
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
      showApp();
      mainWindow.webContents.send('menu-change-tab', 'invoices');
    },
  },
  {
    label: 'Go to Contacts',
    accelerator: 'CmdOrCtrl+Shift+D',
    click() {
      showApp();
      mainWindow.webContents.send('menu-change-tab', 'contacts');
    },
  },
  {
    label: 'Go to Statistics',
    accelerator: 'CmdOrCtrl+Shift+G',
    click() {
      showApp();
      mainWindow.webContents.send('menu-change-tab', 'statistics');
    },
  },
  {
    label: 'Go to Settings',
    accelerator: 'CmdOrCtrl+Shift+S',
    click() {
      showApp();
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

function buildTray() {
  if ([null, undefined, false].includes(app.isTrayCreated)) {
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

    app.isTrayCreated = true;
  }
}

if (trayIcon) {
  app.whenReady().then(() => {
    buildTray();
  });
} else {
  app.isTrayCreated = false;
}

ipcMain.on('destroy-tray', () => {
  try {
    tray.destroy();
    app.isTrayCreated = false;
  } catch (error) {
    console.error('Error destroying tray');
  }
});

ipcMain.on('show-tray', () => {
  buildTray();
});
