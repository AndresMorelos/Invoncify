
import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
    secretKey: null,
    loadEncryptedData: true,
}

const LoginReducer = handleActions(
    {
        [ACTION_TYPES.LOGIN_SET_SECRET]: (state, action) =>
            ({ ...state, secretKey: action.payload }),
        [ACTION_TYPES.NOT_LOAD_ENCRYPTED_DATA]: (state, action) =>
            ({ ...state, loadEncryptedData: false })
    },
    initialState
)

export default LoginReducer

const getLoginState = state => state.login

export const getSecretKey = createSelector(
    getLoginState,
    loginState => loginState.secretKey
)

export const getLoadEncryptedData = createSelector(
    getLoginState,
    loginState => loginState.loadEncryptedData
)