// Sound Themes
const {cs_sounds, default_sounds } = window.invoncify.sounds

let cache;
function preload() {
  cache = {};
  setSounds();
  for (const name in sounds) {
    if (!cache[name]) {
      const sound = sounds[name];
      const audio = (cache[name] = new window.Audio());
      audio.volume = sound.volume;
      audio.src = sound.url;
    }
  }
}

let sounds;
function setSounds() {
  const soundTheme = window.invoncify.appConfig.getSync('general.sound');
  switch (soundTheme) {
    case 'cs': {
      sounds = cs_sounds;
      break;
    }
    default: {
      sounds = default_sounds;
      break;
    }
  }
}

function play(name) {
  const appMute = window.invoncify.appConfig.getSync('general.muted');
  if (!appMute) {
    let audio = cache[name];
    if (!audio) {
      const sound = sounds[name];
      if (!sound) {
        throw new Error('Invalid sound name');
      }
      audio = cache[name] = new window.Audio();
      audio.volume = sound.volume;
      audio.src = sound.url;
    }
    audio.currentTime = 0;
    audio.play();
  }
}

module.exports = {
  preload,
  play,
};
