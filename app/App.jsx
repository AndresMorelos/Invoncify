// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import AppNav from '@components/layout/AppNav';
import AppMain from '@components/layout/AppMain';
import AppNoti from '@components/layout/AppNoti';
// import AppUpdate from '@components/layout/AppUpdate';
import { AppWrapper, LoginWrapper } from '@components/shared/Layout';
import * as UIActions from './actions/ui';
import * as FormActions from './actions/form';
import * as SettingsActions from './actions/settings';
import * as InvoicesActions from './actions/invoices';
import * as ContactsActions from './actions/contacts';

// Components

// Reducers
import { getSecretKey } from './reducers/LoginReducer'
import Login from './containers/Login';

import windowStateKeeper from '../helpers/windowStateKeeper';
import resize from './helpers/resize'
const invoncify = window.invoncify

// Components
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.removeNoti = this.removeNoti.bind(this);
    this.resizeWindow = this.resizeWindow.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // Get All Data
    dispatch(SettingsActions.getInitialSettings());
    // Add Event Listener
    invoncify.receive('menu-change-tab', (event, tabName) => {
      this.changeTab(tabName);
    });
    invoncify.receive('menu-form-save', () => {
      dispatch(FormActions.saveFormData());
    });
    invoncify.receive('menu-form-clear', () => {
      dispatch(FormActions.clearForm());
    });
    invoncify.receive('menu-form-add-item', () => {
      dispatch(FormActions.addItem());
    });
    invoncify.receive('menu-form-toggle-dueDate', () => {
      dispatch(FormActions.toggleField('dueDate'));
    });
    invoncify.receive('menu-form-toggle-currency', () => {
      dispatch(FormActions.toggleField('currency'));
    });
    invoncify.receive('menu-form-toggle-vat', () => {
      dispatch(FormActions.toggleField('vat'));
    });
    invoncify.receive('menu-form-toggle-discount', () => {
      dispatch(FormActions.toggleField('discount'));
    });
    invoncify.receive('menu-form-toggle-note', () => {
      dispatch(FormActions.toggleField('note'));
    });
    invoncify.receive('menu-form-toggle-settings', () => {
      dispatch(FormActions.toggleFormSettings());
    });
    // Save configs to invoice
    invoncify.receive('save-configs-to-invoice', (event, invoiceID, configs) => {
      dispatch(InvoicesActions.saveInvoiceConfigs(invoiceID, configs));
    });

    invoncify.receivece('migrate-all-data', (event) => {
      dispatch(ContactsActions.encryptContacts())
      dispatch(InvoicesActions.encryptInvoices())
      invoncify.settings.dataMigrated()
    })
  }

  changeTab(tabName) {
    const { dispatch } = this.props;
    dispatch(UIActions.changeActiveTab(tabName));
  }

  removeNoti(id) {
    const { dispatch } = this.props;
    dispatch(UIActions.removeNoti(id));
  }

  resizeWindow() {
    const { width, height } = windowStateKeeper('main');
    invoncify.settings.resizeMainWindow(width, height);
  }

  render() {
    const { ui, secretKey } = this.props
    const { activeTab, notifications, checkUpdatesMessage } = ui;
    if (secretKey) {
      const { dispatch } = this.props;
      this.resizeWindow();
      // Get Encrypted data
      dispatch(InvoicesActions.getInvoices());
      dispatch(ContactsActions.getAllContacts());
      return (
        <AppWrapper>
          <AppNav activeTab={activeTab} changeTab={this.changeTab} />
          <AppMain activeTab={activeTab} />
          <AppNoti notifications={notifications} removeNoti={this.removeNoti} />
        </AppWrapper>
      );
    }

    return (
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ui: PropTypes.shape({
    activeTab: PropTypes.string.isRequired,
    notifications: PropTypes.array.isRequired,
    checkUpdatesMessage: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  ui: state.ui
})

export default connect(mapStateToProps)(App);
