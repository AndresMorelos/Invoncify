const path = require('path');
const VOLUME = 0.5;

module.exports = {
  STARTUP: {
    url: path.resolve(__dirname, '../static/sounds/minecraft/evocation.wav'),
    volume: VOLUME * 2,
  },

  DIALOG: {
    url: path.resolve(__dirname, '../static/sounds/minecraft/pop.wav'),
    volume: VOLUME,
  },

  SUCCESS: {
    url: path.resolve(__dirname, '../static/sounds/minecraft/fireworks.wav'),
    volume: VOLUME,
  },

  WARNING: {
    url: path.resolve(__dirname, '../static/sounds/minecraft/villager.wav'),
    volume: VOLUME,
  },

  ADD: {
    url: path.resolve(__dirname, '../static/sounds/minecraft/ravarger.wav'),
    volume: VOLUME,
  },

  REMOVE: {
    url: path.resolve(__dirname, '../static/sounds/minecraft/attack.wav'),
    volume: VOLUME,
  },

  RELOAD: {
    url: path.resolve(__dirname, '../static/sounds/minecraft/vex.wav'),
    volume: VOLUME,
  },

  TAP: {
    url: path.resolve(__dirname, '../static/sounds/minecraft/endermen.wav'),
    volume: VOLUME,
  },
};
