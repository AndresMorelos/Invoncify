import * as ACTION_TYPES from '../constants/actions.jsx'
import { createAction } from 'redux-actions';

export const getSecretKey = createAction(ACTION_TYPES.LOGIN_GET_SECRET);

export const setSecretKey = createAction(
    ACTION_TYPES.LOGIN_SET_SECRET,
    secretKey => secretKey
);