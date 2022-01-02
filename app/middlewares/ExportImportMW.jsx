// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Helpers
import { getAllDocs, importData } from '../helpers/pouchDB';
import i18n from '../../i18n/i18n';
import { getSettings, setSettings } from '../helpers/encryption.js';
const ipc = require('electron').ipcRenderer;


const ExportImportMW = ({ dispatch }) => next => action => {
    switch (action.type) {
        case ACTION_TYPES.EXPORT_DATA: {
            Promise.all([getAllDocs('contacts'), getAllDocs('invoices'), getSettings()])
                .then(values => {
                    const [contacts, invoices, settings] = values;

                    const docToExport = {
                        contacts,
                        invoices,
                        settings
                    }
                    ipc.send('export-data', docToExport);

                })
                .catch(err => {
                    next({
                        type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                        payload: {
                            type: 'warning',
                            message: err.message,
                        },
                    })
                });
            break;
        }

        case ACTION_TYPES.IMPORT_DATA: {
            const { contacts = [], invoices = [], settings } = action.payload;
            const { iv, salt, validation } = settings
            Promise.all([importData('contacts', contacts), importData('invoices', invoices), setSettings(iv, salt, validation)])
                .then(values => {
                    next({
                        type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                        payload: {
                            type: 'success',
                            message: i18n.t('messages:settings:saved'),
                        },
                    })
                    dispatch({ type: ACTION_TYPES.LOGIN_DELETE_SECRET })
                })
                .catch(err => {
                    next({
                        type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                        payload: {
                            type: 'warning',
                            message: err.message,
                        },
                    })
                })
            break;
        }

        default: {
            return next(action);
        }
    }
};

export default ExportImportMW;
