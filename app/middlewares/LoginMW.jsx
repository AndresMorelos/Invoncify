import * as ACTION_TYPES from '../constants/actions.jsx';
import * as SettingsActions from '../actions/settings';

const ipc = require('electron').ipcRenderer;

const LoginMW =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    switch (action.type) {
      case ACTION_TYPES.LOGIN_GET_SECRET: {
        const secretKey = sessionStorage.getItem('secretKey');
        return secretKey;
      }
      case ACTION_TYPES.LOGIN_SET_SECRET: {
        const result = ipc.sendSync('secret-key-updated', {
          secretKey: action.payload,
        });
        if (result && result.pass) {
          sessionStorage.setItem('secretKey', action.payload);
          ipc.send('check-for-updates', { silent: true });
          next({
            type: ACTION_TYPES.LOGIN_SET_SECRET,
            payload: action.payload,
          });
          // Load Initial Settings
          dispatch(SettingsActions.getInitialSettings());
        }
        break;
      }
      case ACTION_TYPES.LOGIN_DELETE_SECRET: {
        sessionStorage.removeItem('secretKey');
        next(action);
        break;
      }
      default: {
        return next(action);
      }
    }
  };

export default LoginMW;
