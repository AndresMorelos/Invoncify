import { createAction } from 'redux-actions';
import * as ACTION_TYPES from '../constants/actions.jsx'

export const getSecretKey = createAction(ACTION_TYPES.LOGIN_GET_SECRET);

export const setSecretKey = createAction(
    ACTION_TYPES.LOGIN_SET_SECRET,
    secretKey => secretKey
);

export const noLoadEncryptedData = createAction(ACTION_TYPES.NOT_LOAD_ENCRYPTED_DATA)

export const deleteSecretKey = createAction(ACTION_TYPES.LOGIN_DELETE_SECRET);