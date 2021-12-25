// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
const ipc = require('electron').ipcRenderer;
import { withTranslation } from 'react-i18next';

// Actions
import * as ACTION_TYPES from '../constants/actions.jsx'
import * as LoginActions from '../actions/login';

// Components
import LoginForm from '@components/login/Login.jsx';
import _withFadeInAnimation from '@components/shared/hoc/_withFadeInAnimation';
import {
    PageWrapper,
    PageHeader,
    PageHeaderTitle,
    PageContent,
} from '@components/shared/Layout';
import { bindActionCreators } from 'redux';


// Component
class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.badSecretKey = this.badSecretKey.bind(this);
        this.confirmedSecret = this.confirmedSecret.bind(this);
    }

    componentDidMount() {
        ipc.on('confirmed-secret-key', (event) => {
            this.confirmedSecret();
        });

        ipc.on('bad-secret-key', (event) => {
            this.badSecretKey();
        })
    }

    componentWillUnmount() {
        ipc.removeAllListeners([
            'confirmed-secret-key',
            'bad-secret-key'
        ]);

    }

    login(secretKey) {
        const { dispatch } = this.props;
        dispatch(LoginActions.setSecretKey(secretKey));
    }

    badSecretKey() {
        const { dispatch, t } = this.props;
        dispatch({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
                type: 'warning',
                message: t('messages:login:badSecret'),
            },
        });
    }

    confirmedSecret() {
        const { dispatch, t } = this.props;
        dispatch({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
                type: 'success',
                message: t('messages:login:success')
            }
        })
    }


    render() {
        const { t } = this.props;
        return (
            <LoginForm t={t} formAction={this.login} />
        );
    }
}

// PropTypes
Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
};



export default compose(
    connect(),
    withTranslation()
)(Login);
