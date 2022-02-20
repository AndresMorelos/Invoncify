// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

// Actions
import LoginForm from '@components/login/Login.jsx';
import * as LoginActions from '../actions/login';

// Components
const invoncify = window.invoncify;
import openDialog from '../renderers/dialog';

// Component
class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.badSecretKey = this.badSecretKey.bind(this);
    }

    componentDidMount() {
        invoncify.receive('bad-secret-key', (event) => {
            this.badSecretKey();
        })
    }

    login(secretKey) {
        const { dispatch } = this.props;
        dispatch(LoginActions.setSecretKey(secretKey));
    }

    badSecretKey() {
        const { t } = this.props;
        openDialog({
            type: 'warning',
            title: t('dialog:noAccess:title'),
            message: t('messages:login:badSecret'),
        });
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
