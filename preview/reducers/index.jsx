// Libs
import { createSelector } from 'reselect';
import { handleActions } from 'redux-actions';
import * as ACTION_TYPES from '../constants/actions';
const appConfig = require('@electron/remote').require('electron-settings');
const invoiceSettings = appConfig.getSync('invoice');
const profileSettings = appConfig.getSync('profile');
const generalSettings = appConfig.getSync('general');

const initialState = {
  ui: { language: generalSettings.language },
  invoice: {},
  profile: profileSettings,
  configs: {
    // Set default from settings
    dateFormat: invoiceSettings.dateFormat,
    language: generalSettings.language,
    template: invoiceSettings.template,
    accentColor: '#2CCCE4',
    // Other settings
    logoSize: '20',
    fontSize: '200',
    alignItems: 'middle',
    // Toggle
    showLogo: true,
    useSymbol: true,
    customAccentColor: true,
    showRecipient: true,
  },
};

const RootReducer = handleActions(
  {
    [ACTION_TYPES.INVOICE_UPDATE]: (state, action) =>
    ({
      ...state,
      invoice: action.payload,
      configs: action.payload.configs ? action.payload.configs : state.configs
    }),
    [ACTION_TYPES.UI_CHANGE_LANGUAGE]: (state, action) =>
    ({
      ...state,
      ui: { ...state.ui, language: action.payload }
    }),
    [ACTION_TYPES.SETTINGS_UPDATE_PROFILE]: (state, action) =>
    ({
      ...state,
      profile: action.payload
    }),
    [ACTION_TYPES.SETTINGS_UPDATE_CONFIGS]: (state, action) =>
    ({
      ...state,
      configs: { ...state.configs, [action.payload.name]: action.payload.value, },
    }),
    [ACTION_TYPES.SETTINGS_RELOAD_CONFIGS]: (state, action) => {
      const { profile, invoice, general } = action.payload;
      return {
        ...state, profile,
        configs: {
          ...state.configs,
          language: general.language,
          template: invoice.template,
          dateFormat: invoice.dateFormat,
        },
      };
    }
  },
  initialState
);

export default RootReducer;

// Selectors
const getState = state => state;
export const getConfigs = createSelector(getState, state => state.configs);
export const getInvoice = createSelector(getState, state => state.invoice);
export const getProfile = createSelector(getState, state => state.profile);
export const getUILang = createSelector(getState, state => state.ui.language);
export const getInvoiceLang = createSelector(getState, state => state.invoice.language);

