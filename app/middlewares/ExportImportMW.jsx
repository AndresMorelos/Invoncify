// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Helpers
import { getAllDocs } from '../helpers/pouchDB';
import i18n from '../../i18n/i18n';
import { getSettings } from '../helpers/encription.js';
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
            break;
            // return saveDoc('contacts', action.payload)
            //     .then(newDocs => {
            //         const secretKey = getState().login.secretKey
            //         const allDocsDecrypted = decrypt({ docs: newDocs, secretKey })
            //         next({
            //             type: ACTION_TYPES.CONTACT_SAVE,
            //             payload: allDocsDecrypted,
            //         });
            //         dispatch({
            //             type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            //             payload: {
            //                 type: 'success',
            //                 message: i18n.t('messages:contact:saved'),
            //             },
            //         });
            //     })
            //     .catch(err => {
            //         next({
            //             type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            //             payload: {
            //                 type: 'warning',
            //                 message: err.message,
            //             },
            //         });
            //     });
        }

        default: {
            return next(action);
        }
    }
};

export default ExportImportMW;
