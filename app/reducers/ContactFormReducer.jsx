// Actions Verbs
// Libs
import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as ACTION_TYPES from '../constants/actions.jsx';

// Helper
import { setEditRecipient } from '../helpers/form';

const initialState = {
  company: '',
  email: '',
  fullname: '',
  phone: '',
  _id: '',
  created_at: new Date().getTime(),
};

const ContactFormReducer = handleActions(
  {
    [ACTION_TYPES.CONTACT_FORM_FIELD_UPDATE_DATA]: (state, action) =>
      Object.assign(state, action.payload),

    [ACTION_TYPES.CONTACT_EDIT]: (state, action) => {
      const { company, email, fullname, phone, _id } = action.payload;
      return Object.assign(state, { company, email, fullname, phone, _id });
    },

    [ACTION_TYPES.CONTACT_FORM_CLEAR]: (state) => ({
      ...initialState,
    }),
  },
  initialState
);

export default ContactFormReducer;

// Selector Input
const getContactFormState = (state) => state.form;

// Selectors
export const getCurrentInvoice = createSelector(
  getContactFormState,
  (contactFormState) => contactFormState
);
