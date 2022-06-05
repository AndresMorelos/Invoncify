// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Actions
import * as ContactFormActions from '../actions/contactForm';
import * as ContactsActions from '../actions/contacts';
import * as UIActions from '../actions/ui';

// Node Libs
const { require: RemoteRequire } = require('@electron/remote');

const ContactFormMW =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    switch (action.type) {
      case ACTION_TYPES.CONTACT_EDIT: {
        // Change Tab to Form
        next(UIActions.changeActiveTab('contactForm'));
        dispatch(
          ContactFormActions.editContact({
            ...action.payload,
          })
        );
        break;
      }

      case ACTION_TYPES.CONTACT_FORM_SAVE: {
        const currentFormData = getState().contactForm;

        // Update existing contact
        dispatch(ContactsActions.updateContact(currentFormData));
        // Change Tab to contacts
        dispatch(UIActions.changeActiveTab('contacts'));
        // Clear The Form
        dispatch(ContactFormActions.clearForm(null, true));
        break;
      }

      case ACTION_TYPES.CONTACT_FORM_CLEAR: {
        // Clear The Form
        next(action);
        // Change Tab to contacts
        dispatch(UIActions.changeActiveTab('contacts'));
        break;
      }

      default: {
        return next(action);
      }
    }
  };

export default ContactFormMW;
