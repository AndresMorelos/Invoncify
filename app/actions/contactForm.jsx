import { createAction } from 'redux-actions';
import * as ACTION_TYPES from '../constants/actions.jsx';


// Form Actions
export const clearForm = createAction(
  ACTION_TYPES.CONTACT_FORM_CLEAR,
  (event, muted = false) => muted
  // Since clearForm can be called via click event or from other action
  // such as saveForm, the first argument will be resreved for event and
  // the second one will be used to determined whether to play a sound or not
);

export const saveFormData = createAction(ACTION_TYPES.CONTACT_FORM_SAVE);

export const editContact = createAction(ACTION_TYPES.CONTACT_FORM_CONTACT_UPDATE);

export const updateFieldData = createAction(
  ACTION_TYPES.CONTACT_FORM_FIELD_UPDATE_DATA,
  (field, data) => ({ field, data })
);