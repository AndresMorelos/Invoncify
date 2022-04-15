// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Helpers
import { getAllDocs, importData } from '../helpers/pouchDB';
import i18n from '../../i18n/i18n';
import { getCurrentSettings } from '../reducers/SettingsReducer';
import { getSecretKey } from '../reducers/LoginReducer';
import { saveSettings, updateSettings } from '../actions/settings';
import {
  getEncryptionSettings,
  setEncryptionSettings,
  encrypt,
} from '../helpers/encryption.js';
const ipc = require('electron').ipcRenderer;

const ExportImportMW =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    switch (action.type) {
      case ACTION_TYPES.EXPORT_DATA: {
        const state = getState();
        Promise.all([
          getAllDocs('contacts'),
          getAllDocs('invoices'),
          getEncryptionSettings(),
          getSecretKey(state),
          getCurrentSettings(state),
        ])
          .then((values) => {
            const [contacts, invoices, encryption, secretKey, settings] =
              values;

            const dataToEncrypt = {
              contacts,
              invoices,
              settings,
            };

            const dataEncrypted = encrypt({ docs: dataToEncrypt, secretKey });

            const docToExport = {
              data: dataEncrypted,
              encryptionSettings: encryption,
            };

            ipc.send('export-data', JSON.stringify(docToExport));
          })
          .catch((err) => {
            next({
              type: ACTION_TYPES.UI_NOTIFICATION_NEW,
              payload: {
                type: 'warning',
                message: err.message,
              },
            });
          });
        break;
      }

      case ACTION_TYPES.IMPORT_DATA: {
        const {
          contacts = [],
          invoices = [],
          settings,
          encryption,
        } = action.payload;
        const { iv, salt, validation } = encryption;

        Promise.all([
          importData('contacts', contacts),
          importData('invoices', invoices),
          setEncryptionSettings(iv, salt, validation),
        ])
          .then((values) => {
            dispatch(saveSettings(settings));
            const { general, invoice, profile } = settings;
            dispatch(updateSettings('general', general));
            dispatch(updateSettings('invoice', invoice));
            dispatch(updateSettings('profile', profile));
            dispatch({ type: ACTION_TYPES.LOGIN_DELETE_SECRET });
          })
          .catch((err) => {
            next({
              type: ACTION_TYPES.UI_NOTIFICATION_NEW,
              payload: {
                type: 'warning',
                message: err.message,
              },
            });
          });
        break;
      }

      default: {
        return next(action);
      }
    }
  };

export default ExportImportMW;
