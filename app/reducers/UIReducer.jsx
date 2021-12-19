import { handleActions } from 'redux-actions';
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  activeTab: 'form',
  notifications: [],
  checkUpdatesMessage: {},
};

const UIReducer = handleActions(
  {
    [ACTION_TYPES.UI_CHECK_UPDATES_MESSAGE]: (state, action) =>
      ({ ...state, checkUpdatesMessage: action.payload,}),

    [ACTION_TYPES.UI_TAB_CHANGE]: (state, action) =>
      ({ ...state, activeTab: action.payload,}),

    [ACTION_TYPES.UI_NOTIFICATION_NEW]: (state, action) =>
      ({ ...state, notifications: [action.payload, ...state.notifications],}),

    [ACTION_TYPES.UI_NOTIFICATION_REMOVE]: (state, action) =>
      ({ ...state, notifications: state.notifications.filter(
          item => item.id !== action.payload
        ),}),
  },
  initialState
);

export default UIReducer;
