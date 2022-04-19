import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language Files
import de from './de';
import en from './en';
import fr from './fr';
import id from './id';
import it from './it';
import sk from './sk';
import esES from './esES';
import urPK from './ur-PK';
import vi from './vi';
import zhCN from './zh-CN';
import sr from './sr';
import nl from './nl';
import ro from './ro';
const moment = require('moment');
const appConfig = require('@electron/remote').require('electron-settings');

const defaultLanguage = appConfig.getSync('general.language');

i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  fallbackLng: 'en',
  debug: process.env.isDev === 'true',
  defaultNS: 'form',
  resources: {
    de,
    en,
    fr,
    id,
    it,
    sk,
    esES,
    'ur-PK': urPK,
    vi,
    'zh-CN': zhCN,
    sr,
    nl,
    ro,
  },
  interpolation: {
    function(value, format, lng) {
      if (value instanceof Date) return moment(value).format(format);
      return value;
    },
  },
  react: {
    wait: false,
    bindI18n: false,
    bindStore: false,
    nsMode: false,
  },
});

i18n.on('languageChanged', (currentLang) => {
  moment.locale(currentLang);
});

moment.locale(defaultLanguage);

export default i18n;
