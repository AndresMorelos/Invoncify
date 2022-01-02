import * as ACTION_TYPES from '../constants/actions.jsx';

import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

const initialState = {
    secretKey: null,
}

const LoginReducer = handleActions(
    {
        [ACTION_TYPES.LOGIN_SET_SECRET]: (state, action) => 
            ({ ...state, secretKey: action.payload }),
    },
    initialState
)

export default LoginReducer

const getLoginState = state => state.login

export const getSecretKey = createSelector(
    getLoginState,
    loginState => loginState.secretKey
)