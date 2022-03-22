const { app } = require('electron');

// Auto-Start
app.setLoginItemSettings({
  openAtLogin: true,
  enabled: true,
});
