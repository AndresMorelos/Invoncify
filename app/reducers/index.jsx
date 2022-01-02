import { combineReducers } from 'redux';
import UIReducer from './UIReducer';
import FormReducer from './FormReducer';
import InvoicesReducer from './InvoicesReducer';
import ContactsReducer from './ContactsReducer';
import SettingsReducer from './SettingsReducer';
import LoginReducer from './LoginReducer';
import exportImportReducer from './exportImportReducer';

export default combineReducers({
  ui: UIReducer,
  form: FormReducer,
  invoices: InvoicesReducer,
  contacts: ContactsReducer,
  settings: SettingsReducer,
  login: LoginReducer,
  exportImport: exportImportReducer,
});
