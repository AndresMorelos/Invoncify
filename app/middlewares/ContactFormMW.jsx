import { v4 as uuidv4 } from 'uuid';

// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Actions
import * as FormActions from '../actions/form';
import * as ContactsActions from '../actions/contacts';
import * as SettingsActions from '../actions/settings';
import * as UIActions from '../actions/ui';

// Helper
import { getInvoiceData, validateFormData } from '../helpers/form';

// Node Libs
import i18n from '../../i18n/i18n';
const { require: RemoteRequire } = require('@electron/remote');
const appConfig = RemoteRequire('electron-settings');

const FormMW =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    switch (action.type) {
      case ACTION_TYPES.CONTACT_FORM_SAVE: {
        const currentFormData = getState().contactForm;

        // Update existing contact
        dispatch(ContactsActions.updateContact(currentFormData));
        // Change Tab to contacts
        dispatch(UIActions.changeActiveTab('invoices'));
        // Clear The Form
        dispatch(FormActions.clearForm(null, true));
        break;
      }

      case ACTION_TYPES.FORM_CLEAR: {
        // Close Setting Panel
        dispatch(FormActions.closeFormSettings());
        // Clear The Form
        next(action);
        // Create An item
        dispatch(FormActions.addItem());
        break;
      }

      default: {
        return next(action);
      }
    }
  };

export default FormMW;
