import { handleActions, combineActions } from 'redux-actions';
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