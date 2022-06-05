import { createAction } from 'redux-actions';
import * as ACTION_TYPES from '../constants/actions.jsx';

// Get All Contacts
export const getAllContacts = createAction(ACTION_TYPES.CONTACT_GET_ALL);

// Save A Contact
export const saveContact = createAction(
  ACTION_TYPES.CONTACT_SAVE,
  (invoiceData) => invoiceData
);

// Delete A Contact
export const deleteContact = createAction(
  ACTION_TYPES.CONTACT_DELETE,
  (contactID) => contactID
);

export const editContact = createAction(
  ACTION_TYPES.CONTACT_EDIT,
  (contactID) => contactID
);

export const updateContact = createAction(
  ACTION_TYPES.CONTACT_UPDATE,
  (contactData) => contactData
)

// Migration from no encrypted data
export const encryptContacts = createAction(ACTION_TYPES.CONTACT_ENCRYPT);
