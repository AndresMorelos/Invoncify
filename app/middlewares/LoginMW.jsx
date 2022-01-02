import * as ACTION_TYPES from '../constants/actions.jsx'

const ipc = require('electron').ipcRenderer;


const LoginMW = ({ dispatch, getState }) => next => action => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_GET_SECRET: {
            const secretKey = sessionStorage.getItem('secretKey')
            return secretKey
        }
        case ACTION_TYPES.LOGIN_SET_SECRET: {
            sessionStorage.setItem('secretKey', action.payload)
            const result = ipc.sendSync('secret-key-updated', { secretKey: action.payload });
            if (result && result.pass) {
                next({
                    type: ACTION_TYPES.LOGIN_SET_SECRET,
                    payload: action.payload
                })
            }
            break;
        }
        case ACTION_TYPES.LOGIN_DELETE_SECRET: {
            sessionStorage.removeItem('secretKey')
            next({
                type: ACTION_TYPES.LOGIN_SET_SECRET,
                payload: undefined
            })
            break;
        }
        default: {
            return next(action);
        }
    }
}

export default LoginMW