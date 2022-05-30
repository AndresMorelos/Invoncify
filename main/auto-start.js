if (!process.env.isDev === 'true') {
  const { app, ipcMain } = require('electron');

  const setLoginItemSettings = (openAtLogin) => {
    app.setLoginItemSettings({
      openAtLogin,
      enabled: true,
    });
  };

  const loginItemSettings = app.getLoginItemSettings();

  if (loginItemSettings) {
    switch (loginItemSettings.openAtLogin) {
      case true:
        setLoginItemSettings(true);
        break;
      case false:
        setLoginItemSettings(false);
      default:
        break;
    }
  }

  ipcMain.on('openAtLogin', (event, openAtLogin) => {
    setLoginItemSettings(openAtLogin);
  });
}
