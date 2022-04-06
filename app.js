console.time('init');

// Node Libs
const fs = require('fs');
const os = require('os');
const url = require('url');
const path = require('path');
const glob = require('glob');
const isDev = require('electron-is-dev');
const omit = require('lodash').omit;
// eslint-disable-next-line import/no-unresolved
const Sentry = require('@sentry/electron/main');

// Electron Libs
const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

// 3rd Party Libs
const appConfig = require('electron-settings');
require('dotenv').config();


const electronRemoteMain = require('@electron/remote/main');
electronRemoteMain.initialize();

Sentry.init({
  environment: !(process.env.isDev === 'true') ? 'production' : 'development',
  dsn: 'https://369beb9600244b6e83ef6f3fe77b4d29@o1191884.ingest.sentry.io/6313417',
});
// Place a BrowserWindow in center of primary display
const centerOnPrimaryDisplay = require('./helpers/center-on-primary-display');
const windowStateKeeper = require('./helpers/windowStateKeeper');
const { generaterRandmBytes } = require('./helpers/encryption');

// commmandline arguments
const forceDevtools = process.argv.includes('--force-devtools');
if (process.argv.includes('--disable-hardware-acceleration')) {
  app.disableHardwareAcceleration();
}


let tourWindow = null;
let mainWindow = null;
let previewWindow = null;
let modalWindow = null;
let tray = null;

function createTourWindow() {
  const width = 700;
  const height = 600;

  // Get X and Y coordinations on primary display
  const winPOS = centerOnPrimaryDisplay(width, height);

  // Creating a New Window
  tourWindow = new BrowserWindow({
    x: winPOS.x,
    y: winPOS.y,
    width,
    height,
    show: false,
    frame: false,
    resizable: false,
    movable: false,
    title: 'Tour Window',
    backgroundColor: '#F9FAFA',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  // Register WindowID with appConfig
  appConfig.setSync('tourWindowID', parseInt(tourWindow.id));
  // Load Content
  tourWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'entrypoint', 'tour.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  electronRemoteMain.enable(tourWindow.webContents);

  // Add Event Listeners
  tourWindow.on('show', (event) => {
    if (isDev || forceDevtools)
      tourWindow.webContents.openDevTools({ mode: 'detach' });
  });
  tourWindow.on('close', (event) => {
    event.preventDefault();
    if (isDev || forceDevtools) tourWindow.webContents.closeDevTools();
    tourWindow.hide();
  });
}

function createMainWindow() {
  const width = 700;
  const height = 600;
  // Get window state
  const mainWindownStateKeeper = windowStateKeeper('main');
  // Creating a new window
  mainWindow = new BrowserWindow({
    x: mainWindownStateKeeper.x,
    y: mainWindownStateKeeper.y,
    width,
    height,
    minWidth: 600,
    minHeight: 400,
    backgroundColor: '#2e2c29',
    show: false,
    title: 'Main Window',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  // Register WindowID
  appConfig.setSync('mainWindowID', parseInt(mainWindow.id));
  // Track window state
  mainWindownStateKeeper.track(mainWindow);
  // Load Content
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'entrypoint', 'main.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
  electronRemoteMain.enable(mainWindow.webContents);
  // Add Event Listeners
  mainWindow.on('show', (event) => {
    if (isDev || forceDevtools)
      mainWindow.webContents.openDevTools({ mode: 'detach' });
  });

  mainWindow.on('minimize', (event) => {
    event.preventDefault();
    if (isDev || forceDevtools) mainWindow.webContents.closeDevTools();
    app.isHidden = true;
    if (process.platform !== 'darwin') {
      app.setSkipTaskbar(true);
    } else {
      app.dock.hide();
    }
    mainWindow.hide();
  });

  mainWindow.on('close', (event) => {
    event.preventDefault();
    if (isDev || forceDevtools) mainWindow.webContents.closeDevTools();
    app.isHidden = true;
    if (process.platform !== 'darwin') {
      app.setSkipTaskbar(true);
    } else {
      app.dock.hide();
    }
    mainWindow.hide();
  });
}

function createPreviewWindow() {
  // Get window state
  const previewWindownStateKeeper = windowStateKeeper('preview');
  // Create New Window
  previewWindow = new BrowserWindow({
    x: previewWindownStateKeeper.x,
    y: previewWindownStateKeeper.y,
    width: previewWindownStateKeeper.width,
    height: previewWindownStateKeeper.height,
    minWidth: 1024,
    minHeight: 800,
    backgroundColor: '#2e2c29',
    show: false,
    title: 'Preview Window',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  // Register WindowID
  appConfig.setSync('previewWindowID', parseInt(previewWindow.id));
  // Track window state
  previewWindownStateKeeper.track(previewWindow);
  // Load Content
  previewWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'entrypoint', 'preview.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  electronRemoteMain.enable(previewWindow.webContents);
  // Add Event Listener
  previewWindow.on('show', (event) => {
    if (isDev || forceDevtools)
      previewWindow.webContents.openDevTools({ mode: 'detach' });
  });
  previewWindow.on('close', (event) => {
    event.preventDefault();
    if (isDev || forceDevtools) previewWindow.webContents.closeDevTools();
    previewWindow.hide();
  });
}

function createModalWindow(dialogOptions, returnChannel = '', ...rest) {
  const width = 450;
  const height = 220;

  // Get X and Y coordinations on primary display
  const winPOS = centerOnPrimaryDisplay(width, height);

  modalWindow = new BrowserWindow({
    x: winPOS.x,
    y: winPOS.y,
    width,
    height,
    backgroundColor: '#282828',
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  modalWindow.loadURL(
    url.format({
      pathname: path.resolve(__dirname, 'entrypoint', 'modal.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  electronRemoteMain.enable(modalWindow.webContents);

  modalWindow.on('close', () => (modalWindow = null));
  modalWindow.webContents.on('did-finish-load', () => {
    modalWindow.webContents.send(
      'update-modal',
      dialogOptions,
      returnChannel,
      ...rest
    );
  });
  modalWindow.on('ready-to-show', () => {
    modalWindow.show();
    modalWindow.focus();
  });
}

function addDevToolsExtension() {
  if (process.env.DEVTRON_DEV_TOOLS_PATH)
    BrowserWindow.addDevToolsExtension(process.env.DEVTRON_DEV_TOOLS_PATH);
  if (process.env.REACT_DEV_TOOLS_PATH)
    BrowserWindow.addDevToolsExtension(process.env.REACT_DEV_TOOLS_PATH);
  if (process.env.REDUX_DEV_TOOLS_PATH)
    BrowserWindow.addDevToolsExtension(process.env.REDUX_DEV_TOOLS_PATH);
}

function setInitialValues() {
  // Default Logo
  const logoPath = path.resolve(__dirname, './static/imgs/default_logo.svg');
  const logoData = fs.readFileSync(logoPath);
  const logoBase64String =
    'data:image/svg+xml;base64,' + logoData.toString('base64');
  // Default Options
  const defaultOptions = {
    tour: {
      isActive: false,
      hasBeenTaken: false,
    },
    winsLastVisibleState: {
      isMainWinVisible: true,
      isPreviewWinVisible: false,
    },
    profile: {
      logo: logoBase64String,
      fullname: 'Invoncify',
      company: 'Oceanic Preservation Society',
      address: '336 Bon Air Center #384 Greenbrae, CA 94904',
      email: 'info@opsociety.org',
      phone: '+01 (0) 1-2345-6789',
      website: 'http://www.opsociety.org/',
    },
    general: {
      language: 'en',
      sound: 'default',
      muted: false,
      previewPDF: true,
      checkUpdate: 'daily',
      lastCheck: Date.now(),
    },
    invoice: {
      exportDir: os.homedir(),
      template: 'default',
      dateFormat: 'MM/DD/YYYY',
      tax: {
        tin: '123-456-789',
        method: 'default',
        amount: 0,
      },
      payment: {
        details: null,
      },
      currency: {
        code: 'USD',
        placement: 'before',
        separator: 'commaDot',
        fraction: 2,
      },
      required_fields: {
        invoiceID: false,
        dueDate: false,
        currency: false,
        discount: false,
        tax: false,
        note: false,
        payment: false,
      },
    },
    encryption: {
      iv: generaterRandmBytes(),
      salt: generaterRandmBytes(),
      validation: null,
      dataMigrated: true,
    },
  };

  // Set initial values conditionally work for 2 level depth key only,
  // Changing anything deeper would need to be done with migration
  for (const key in defaultOptions) {
    // Add level 1 key if not exist
    if (Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
      if (!appConfig.hasSync(`${key}`)) {
        appConfig.setSync(`${key}`, defaultOptions[key]);
      }
      // Add level 2 key if not exist
      for (const childKey in defaultOptions[key]) {
        if (
          Object.prototype.hasOwnProperty.call(defaultOptions[key], childKey)
        ) {
          if (!appConfig.hasSync(`${key}.${childKey}`)) {
            appConfig.setSync(
              `${key}.${childKey}`,
              defaultOptions[key][childKey]
            );
          }
        }
      }
    }
  }
}

function migrateData() {
  // Migration scheme
  const migrations = {
    1: (configs) => {
      // Get the current configs
      const { info, appSettings } = configs;
      // Return current configs if this is the first time install
      if (info === undefined || appSettings === undefined) {
        return configs;
      }
      // Update current configs
      const migratedConfigs = {
        ...configs,
        profile: info,
        general: {
          language: appSettings.language,
          sound: appSettings.sound,
          muted: appSettings.muted,
        },
        invoice: {
          exportDir: appSettings.exportDir,
          template: appSettings.template,
          currency: appSettings.currency,
          dateFormat: 'MM/DD/YYYY',
          tax: {
            tin: '123-456-789',
            method: 'default',
            amount: 0,
          },
          payment: {
            details: null,
          },
          required_fields: {
            dueDate: false,
            currency: false,
            discount: false,
            tax: false,
            note: false,
            payment: false,
          },
        },
      };
      // Omit old keys
      return omit(migratedConfigs, [
        'info',
        'appSettings',
        'printOptions',
        'test',
      ]);
    },

    2: (configs) => {
      // Return current configs if this is the first time install
      if (configs.invoice.currency.placement !== undefined) {
        return configs;
      }
      // Update current configs
      return {
        ...configs,
        invoice: {
          ...configs.invoice,
          currency: {
            code: configs.invoice.currency,
            placement: 'before',
            separator: 'commaDot',
            fraction: 2,
          },
        },
      };
    },

    3: (configs) => {
      // Return current configs if checkUpdate and lastCheck do not exist
      const { checkUpdate, lastCheck } = configs.general;
      if (checkUpdate === undefined || lastCheck === undefined) {
        return configs;
      }
      // Remove checkUpdate and lastCheck
      return {
        ...configs,
        general: omit(configs.general, ['checkUpdate', 'lastCheck']),
      };
    },

    4: (configs) => {
      // Return current configs if this is the first time install
      if (configs.encryption !== undefined) {
        return configs;
      }

      // Update current configs
      return {
        ...configs,
        encryption: {
          iv: generaterRandmBytes(),
          salt: generaterRandmBytes(),
          validation: null,
          dataMigrated: false,
        },
      };
    },
  };
  // Get the current Config
  const configs = appConfig.getSync();
  // Get the current configs
  const version = configs.version || 0;
  // Handle migration
  const newMigrations = Object.keys(migrations)
    .filter((k) => k > version)
    .sort();
  // Exit if there's no migration to run
  if (!newMigrations.length) return;
  // If there's migration to run run the current
  // config through each migration
  const migratedConfigs = newMigrations.reduce(
    (prev, key) => migrations[key](prev),
    configs
  );
  // Save the final config to DB
  appConfig.unsetSync();
  appConfig.setSync(migratedConfigs);
  // Update the latest config version
  appConfig.setSync('version', newMigrations[newMigrations.length - 1]);
}

function addEventListeners() {
  ipcMain.on('open-dialog', (event, dialogOptions, returnChannel, ...rest) => {
    createModalWindow(dialogOptions, returnChannel, rest);
  });

  ipcMain.on('quit-app', () => {
    app.quit();
  });
  // Quit and install
  // https://github.com/electron-userland/electron-builder/issues/1604#issuecomment-306709572
  ipcMain.on('quit-and-install', () => {
    setImmediate(() => {
      // Remove this listener
      app.removeAllListeners('window-all-closed');
      // Force close all windows
      tourWindow.destroy();
      mainWindow.destroy();
      previewWindow.destroy();
      // Start the quit and update sequence
      autoUpdater.quitAndInstall(false);
    });
  });
}

function loadMainProcessFiles() {
  const files = glob.sync(path.join(__dirname, 'main/*.js'));
  files.forEach((file) => require(file));
}

function initialize() {
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    });

    app.on('ready', () => {
      if (!app.isDefaultProtocolClient('invoncify')) {
        app.setAsDefaultProtocolClient('invoncify');
      }
      createTourWindow();
      createMainWindow();
      createPreviewWindow();
      setInitialValues();
      migrateData();
      if (isDev) addDevToolsExtension();
      addEventListeners();
      loadMainProcessFiles();
      // Show Tour Window
      const { showWindow } = require('./main/tour');
      showWindow('startup');
    });
    // Reactivate the app
    app.on('activate', () => {
      const { showWindow } = require('./main/tour');
      showWindow('activate');
    });
    // Close all windows before quit the app
    app.on('before-quit', () => {
      // Use condition in case quit sequence is initiated by autoUpdater
      // which will destroy all there windows already before emitting this event
      if (tourWindow !== null) tourWindow.destroy();
      if (mainWindow !== null) mainWindow.destroy();
      if (previewWindow !== null) previewWindow.destroy();
    });
    console.timeEnd('init');
  }
}

initialize();
