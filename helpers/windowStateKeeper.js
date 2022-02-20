let appConfig;

if (process.type === 'browser') {
  appConfig = require('electron-settings');
} else {
  appConfig = window.invoncify.appConfig
}

function windowStateKeeper(windowName) {
  let window, windowState;

  function setBounds() {
    // Restore from appConfig
    if (appConfig.hasSync(`windowState.${windowName}`)) {
      windowState = appConfig.getSync(`windowState.${windowName}`);
      return;
    }
    // Default
    windowState = {
      x: undefined,
      y: undefined,
      width: 1000,
      height: 800,
    };
  }

  function saveState() {
    if (!windowState.isMaximized) {
      windowState = window.getBounds();
    }
    windowState.isMaximized = window.isMaximized();
    appConfig.setSync(`windowState.${windowName}`, windowState);
  }

  function track(win) {
    window = win;
    ['resize', 'move'].forEach(event => {
      win.on(event, saveState);
    });
  }

  setBounds();

  return {
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    isMaximized: windowState.isMaximized,
    track,
  };
}

module.exports = windowStateKeeper