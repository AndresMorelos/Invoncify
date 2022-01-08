import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as Actions from '../actions/exportImport';

const exportImportReducer = handleActions(
  {
    [combineActions(
      Actions.exportData,
      Actions.importData,
    )]: (state, action) => action.payload,
  },
  []
);

export default exportImportReducer;

const getLoginState = state => state.login

export const getSecretKey = createSelector(
  getLoginState,
  login => login.secretKey
)