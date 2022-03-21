const path = require('path');
// Libs
const { app, nativeImage, Menu, Tray, BrowserWindow } = require('electron');
const appConfig = require('electron-settings');

// Get mainWindow Object
const mainWindowID = appConfig.getSync('mainWindowID');
const mainWindow = BrowserWindow.fromId(mainWindowID);

function showApp() {
  if (process.platform !== 'darwin') {
    app.setSkipTaskbar(false);
  } else {
    app.dock.show();
  }
  mainWindow.show();
}

function hideApp() {
  if (process.platform !== 'darwin') {
    app.setSkipTaskbar(true);
  } else {
    app.dock.hide();
  }
  mainWindow.hide();
}

const trayMenu = [
  {
    label: 'Open/Hide Invoncify',
    click() {
      if ([null, undefined, true].includes(app.isHidden)) {
        app.isHidden = false;
        hideApp();
      } else {
        app.isHidden = true;
        showApp();
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
      if (process.platform !== 'darwin') {
        app.setSkipTaskbar(false);
      } else {
        app.dock.show();
      }
      mainWindow.show();
      mainWindow.webContents.send('menu-change-tab', 'invoices');
    },
  },
  {
    label: 'Go to Contacts',
    accelerator: 'CmdOrCtrl+Shift+D',
    click() {
      if (process.platform !== 'darwin') {
        app.setSkipTaskbar(false);
      } else {
        app.dock.show();
      }
      mainWindow.show();
      mainWindow.webContents.send('menu-change-tab', 'contacts');
    },
  },
  {
    label: 'Go to Statistics',
    accelerator: 'CmdOrCtrl+Shift+G',
    click() {
      if (process.platform !== 'darwin') {
        app.setSkipTaskbar(false);
      } else {
        app.dock.show();
      }
      mainWindow.show();
      mainWindow.webContents.send('menu-change-tab', 'statistics');
    },
  },
  {
    label: 'Go to Settings',
    accelerator: 'CmdOrCtrl+Shift+S',
    click() {
      if (process.platform !== 'darwin') {
        app.setSkipTaskbar(false);
      } else {
        app.dock.show();
      }
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
