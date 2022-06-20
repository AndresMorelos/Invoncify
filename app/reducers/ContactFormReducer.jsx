// Actions Verbs
// Libs
import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  company: '',
  email: '',
  fullname: '',
  phone: '',
  _id: '',
  _rev: '',
  address: '',
  created_at: new Date().getTime(),
};

const ContactFormReducer = handleActions(
  {
    [ACTION_TYPES.CONTACT_FORM_FIELD_UPDATE_DATA]: (state, action) => {
      const { field, data } = action.payload;
      if (typeof data === 'object') {
        return {
          ...state,
          [field]: {
            ...state[field],
            ...data,
          },
        };
      }
      return { ...state, [field]: data };
    },

    [ACTION_TYPES.CONTACT_FORM_CONTACT_UPDATE]: (state, action) => {
      const { company, email, fullname, phone, _id, _rev, address } =
        action.payload;
      return Object.assign(state, {
        company,
        email,
        fullname,
        phone,
        address,
        _id,
        _rev,
      });
    },

    [ACTION_TYPES.CONTACT_FORM_CLEAR]: (state) => ({
      ...initialState,
    }),
  },
  initialState
);

export default ContactFormReducer;

// Selector Input
const getContactFormState = (state) => state.contactForm;

// Selectors
export const getCurrentContact = createSelector(
  getContactFormState,
  (contactFormState) => contactFormState
);
