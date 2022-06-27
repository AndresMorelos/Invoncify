import { v4 as uuidv4 } from 'uuid';

// Actions & Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';
import * as UIActions from '../actions/ui';
import * as FormActions from '../actions/form';

// Helpers
import {
  getAllDocs,
  getSingleDoc,
  saveDoc,
  deleteDoc,
  updateDoc,
  updateMultipleDocs,
} from '../helpers/pouchDB';
import { encrypt, decrypt } from '../helpers/encryption';

// Node Libs
import i18n from '../../i18n/i18n';
const ipc = require('electron').ipcRenderer;

const InvoicesMW =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    switch (action.type) {
      case ACTION_TYPES.INVOICE_NEW_FROM_CONTACT: {
        // Change Tab to Form
        next(UIActions.changeActiveTab('form'));
        // Update Recipient Data
        dispatch(
          FormActions.updateRecipient({
            new: {},
            select: action.payload,
            newRecipient: false,
          })
        );
        break;
      }

      case ACTION_TYPES.INVOICE_GET_ALL: {
        const secretKey = getState().login.secretKey;
        if (secretKey) {
          return getAllDocs('invoices')
            .then((allDocs) => {
              const allDocsDecrypted = decrypt({ docs: allDocs, secretKey });
              next({ ...action, payload: allDocsDecrypted });
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
        }
        break;
      }

      case ACTION_TYPES.INVOICE_ENCRYPT: {
        return getAllDocs('invoices')
          .then((allDocs) => {
            const secretKey = getState().login.secretKey;
            const allDocsEncrypted = encrypt({ docs: allDocs, secretKey });
            allDocsEncrypted.forEach((doc) => {
              updateDoc('invoices', doc);
            });
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
      }

      case ACTION_TYPES.INVOICE_SAVE: {
        // Save doc to db
        return saveDoc('invoices', action.payload)
          .then((newDocs) => {
            const secretKey = getState().login.secretKey;
            const allDocsDecrypted = decrypt({ docs: newDocs, secretKey });
            next({
              type: ACTION_TYPES.INVOICE_SAVE,
              payload: allDocsDecrypted,
            });
            dispatch({
              type: ACTION_TYPES.UI_NOTIFICATION_NEW,
              payload: {
                type: 'success',
                message: i18n.t('messages:invoice:saved'),
              },
            });
            const docDecrypted = decrypt({ docs: action.payload, secretKey });
            // Preview Window
            ipc.send('preview-invoice', docDecrypted);
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
      }

      case ACTION_TYPES.INVOICE_EDIT: {
        // Continue
        return getAllDocs('contacts')
          .then((allDocs) => {
            next({
              ...action,
              payload: { ...action.payload, contacts: allDocs },
            });
            // Change Tab to Form
            dispatch(UIActions.changeActiveTab('form'));
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
      }

      case ACTION_TYPES.INVOICE_DELETE: {
        return deleteDoc('invoices', action.payload[0])
          .then((remainingDocs) => {
            const secretKey = getState().login.secretKey;
            const allDocsDecrypted = decrypt({
              docs: remainingDocs,
              secretKey,
            });
            next({
              type: ACTION_TYPES.INVOICE_DELETE,
              payload: allDocsDecrypted,
            });
            // Send Notification
            dispatch({
              type: ACTION_TYPES.UI_NOTIFICATION_NEW,
              payload: {
                type: 'success',
                message: i18n.t('messages:invoice:deleted'),
              },
            });
            // Clear form if this invoice is being editted
            const { editMode } = getState().form.settings;
            if (editMode.active) {
              if (editMode.data._id === action.payload[0]) {
                dispatch({ type: ACTION_TYPES.FORM_CLEAR });
              }
            }
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
      }

      case ACTION_TYPES.INVOICE_DUPLICATE: {
        const secretKey = getState().login.secretKey;
        delete action.payload._id;
        delete action.payload._rev;
        const content = encrypt({
          docs: { ...action.payload, created_at: Date.now() },
          secretKey,
        });
        const duplicateInvoice = {
          content,
          _id: uuidv4(),
          _rev: null,
        };
        return dispatch({
          type: ACTION_TYPES.INVOICE_SAVE,
          payload: duplicateInvoice,
        });
      }

      case ACTION_TYPES.INVOICE_UPDATE: {
        const secretKey = getState().login.secretKey;
        return updateDoc('invoices', action.payload)
          .then((docs) => {
            const allDocsDecrypted = decrypt({ docs, secretKey });
            next({
              type: ACTION_TYPES.INVOICE_UPDATE,
              payload: allDocsDecrypted,
            });
            dispatch({
              type: ACTION_TYPES.UI_NOTIFICATION_NEW,
              payload: {
                type: 'success',
                message: i18n.t('messages:invoice:updated'),
              },
            });
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
      }

      case ACTION_TYPES.INVOICE_CONFIGS_SAVE: {
        const { invoiceID, configs } = action.payload;
        const secretKey = getState().login.secretKey;
        return getSingleDoc('invoices', invoiceID)
          .then((doc) => {
            const docDecrypted = decrypt({
              docs: doc,
              secretKey,
            });

            delete docDecrypted._id;
            delete docDecrypted._rev;
            const content = encrypt({
              docs: { ...docDecrypted, configs },
              secretKey,
            });
            const updatedInvocie = {
              _id: doc._id,
              _rev: doc._rev,
              content,
            };
            dispatch({
              type: ACTION_TYPES.INVOICE_UPDATE,
              payload: updatedInvocie,
            });
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
      }
      
      case ACTION_TYPES.INVOICE_SET_STATUS: {
        const secretKey = getState().login.secretKey;
        const { invoiceID, status } = action.payload;

        return getSingleDoc('invoices', invoiceID)
          .then((doc) => {
            const docDecrypted = decrypt({ docs: doc, secretKey });
            delete docDecrypted._id;
            delete docDecrypted._rev;
            const content = encrypt({
              docs: { ...docDecrypted, status },
              secretKey,
            });
            const updatedInvocie = {
              _id: doc._id,
              _rev: doc._rev,
              content,
            };
            dispatch({
              type: ACTION_TYPES.INVOICE_UPDATE,
              payload: updatedInvocie,
            });
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
      }

      case ACTION_TYPES.INVOICE_CONTACT_UPDATE: {
        return getAllDocs('invoices')
          .then((allDocs) => {
            const secretKey = getState().login.secretKey;

            const allDocsDecrypted = decrypt({
              docs: allDocs,
              secretKey,
            });
            const allInvoices = allDocsDecrypted.map((invoice) => {
              if (
                invoice.recipient &&
                invoice.recipient._id === action.payload._id
              ) {
                invoice.recipient = action.payload;
              }
              return invoice;
            });
            const allDocsEncrypted = encrypt({ docs: allInvoices, secretKey });

            next({
              type: ACTION_TYPES.INVOICE_GET_ALL,
              payload: allInvoices,
            });
            
            updateMultipleDocs('invoices', allDocsEncrypted);
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
      }

      default: {
        return next(action);
      }
    }
  };

export default InvoicesMW;
