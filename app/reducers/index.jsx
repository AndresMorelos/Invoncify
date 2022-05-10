import { combineReducers } from 'redux';
import UIReducer from './UIReducer';
import FormReducer from './FormReducer';
import InvoicesReducer from './InvoicesReducer';
import ContactsReducer from './ContactsReducer';
import SettingsReducer from './SettingsReducer';
import LoginReducer from './LoginReducer';
import exportImportReducer from './exportImportReducer';
import * as ACTION_TYPES from '../constants/actions'

const appReducers = combineReducers({
  ui: UIReducer,
  form: FormReducer,
  invoices: InvoicesReducer,
  contacts: ContactsReducer,
  settings: SettingsReducer,
  login: LoginReducer,
  exportImport: exportImportReducer,
});

export default function rootReducer(state, action) {
  if (action.type === ACTION_TYPES.LOGIN_DELETE_SECRET) {
    state = undefined
  }
  return appReducers(state, action)
}