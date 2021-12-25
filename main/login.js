// Libs
const { BrowserWindow, ipcMain } = require('electron');
const appConfig = require('electron-settings');

// Get Windows Instance
const loginWindowID = appConfig.getSync('loginWindowID');
const mainWindowID = appConfig.getSync('mainWindowID');
const previewWindowID = appConfig.getSync('previewWindowID');
const loginWindow = BrowserWindow.fromId(loginWindowID);
const mainWindow = BrowserWindow.fromId(mainWindowID);
const previewWindow = BrowserWindow.fromId(previewWindowID);

ipcMain.on('start-login', startLogin);
ipcMain.on('end-login', endLogin);

// TOUR
function startLogin() {
  // Save current visibility state for restoring later
  saveWinsVisibleState();
  // Hide all windows
  hideAllWindows();
  // Show the tour window
  loginWindowID.show();
  loginWindowID.focus();
  // Update tour active state
  appConfig.setSync('login.isActive', true);
}

function endLogin() {
  // Update tour state
  appConfig.setSync('login', {
    isActive: false,
  });
  // Hide the tourWindow
  loginWindow.hide();
  // Restore windows state
  restoreWindows();
  // Update new state for next use
  saveWinsVisibleState();
}

function showWindow(context) {
  const login = appConfig.getSync('login');
  if (login.isActive) {
    if (context === 'startup') {
      loginWindow.on('ready-to-show', () => {
        loginWindow.show();
        loginWindow.focus();
      });
      return;
    }
    if (context === 'activate') {
      loginWindow.show();
      loginWindow.focus();
      return;
    }
  }
  if (login.hasBeenTaken) {
    if (context === 'startup') {
      mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
      });
      return;
    }
    if (context === 'activate') {
      restoreWindows();
      return;
    }
  }
  startLogin();
}

function restoreWindows() {
  const { isMainWinVisible, isPreviewWinVisible } = appConfig.getSync(
    'winsLastVisibleState'
  );
  if (!isMainWinVisible && !isPreviewWinVisible) {
    mainWindow.show();
    mainWindow.focus();
    return;
  }
  isMainWinVisible && mainWindow.show();
  isPreviewWinVisible && previewWindow.show();
}

// HELPER FUNCTIONS
function hideAllWindows() {
  mainWindow.hide();
  previewWindow.hide();
}

function saveWinsVisibleState() {
  appConfig.setSync('winsLastVisibleState', {
    isMainWinVisible: mainWindow.isVisible(),
    isPreviewWinVisible: previewWindow.isVisible(),
  });
}

module.exports = {
  showWindow,
};
