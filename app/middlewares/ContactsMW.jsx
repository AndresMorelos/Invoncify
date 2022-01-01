// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Helpers
import { getAllDocs, saveDoc, deleteDoc } from '../helpers/pouchDB';
import i18n from '../../i18n/i18n';
import { decrypt, encrypt } from '../helpers/encryption.js';

const ContactsMW = ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case ACTION_TYPES.CONTACT_GET_ALL: {
      return getAllDocs('contacts')
        .then(allDocs => {
          const secretKey = getState().login.secretKey
          const allDocsDecrypted = decrypt({ docs: allDocs, secretKey })
          next(
            { ...action, payload: allDocsDecrypted, }
          );
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'warning',
              message: err.message,
            },
          });
        });
    }
    case ACTION_TYPES.CONTACT_ENCRYPT: {
      // TODO: Make migration to encrypted [CONTACTS]
       return next(action)
      // return getAllDocs('contacts')
      //   .then(allDocs => {
      //     const secretKey = getState().login.secretKey
      //     const allDocsEncrypted = encrypt({ docs: allDocs, secretKey })
      //     allDocsEncrypted.forEach(contact => {
      //       next({
      //         type: ACTION_TYPES.CONTACT_SAVE,
      //         payload: contact,
      //       })
      //     });
      //   })
      //   .catch(err => {
      //     next({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'warning',
      //         message: err.message,
      //       },
      //     });
      //   });
    }
    case ACTION_TYPES.CONTACT_SAVE: {
      return saveDoc('contacts', action.payload)
        .then(newDocs => {
          const secretKey = getState().login.secretKey
          const allDocsDecrypted = decrypt({ docs: newDocs, secretKey })
          next({
            type: ACTION_TYPES.CONTACT_SAVE,
            payload: allDocsDecrypted,
          });
          dispatch({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'success',
              message: i18n.t('messages:contact:saved'),
            },
          });
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'warning',
              message: err.message,
            },
          });
        });
    }

    case ACTION_TYPES.CONTACT_DELETE: {
      return deleteDoc('contacts', action.payload[0])
        .then(remainingDocs => {
          const secretKey = getState().login.secretKey
          const allDocsDecrypted = decrypt({ docs: remainingDocs, secretKey })
          next({
            type: ACTION_TYPES.CONTACT_DELETE,
            payload: allDocsDecrypted,
          });
          dispatch({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'success',
              message: i18n.t('messages:contact:deleted'),
            },
          });
        })
        .catch(err => {
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

export default ContactsMW;
