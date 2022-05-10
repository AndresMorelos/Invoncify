// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import AppNav from '@components/layout/AppNav';
import AppMain from '@components/layout/AppMain';
import AppNoti from '@components/layout/AppNoti';
import AppUpdate from '@components/layout/AppUpdate';
import { AppWrapper, LoginWrapper } from '@components/shared/Layout';
import * as UIActions from './actions/ui';
import * as FormActions from './actions/form';
import * as SettingsActions from './actions/settings';
import * as InvoicesActions from './actions/invoices';
import * as ContactsActions from './actions/contacts';
import * as LoginActions from './actions/login'

// Components

// Reducers
import { getSecretKey } from './reducers/LoginReducer'
import Login from './containers/Login';

import windowStateKeeper from '../helpers/windowStateKeeper';
import resize from './helpers/resize'
import { Notify } from '../helpers/notify'
const ipc = require('electron').ipcRenderer;

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
    ipc.on('menu-change-tab', (event, tabName) => {
      this.changeTab(tabName);
    });
    ipc.on('menu-form-save', () => {
      dispatch(FormActions.saveFormData());
    });
    ipc.on('menu-form-clear', () => {
      dispatch(FormActions.clearForm());
    });
    ipc.on('menu-form-add-item', () => {
      dispatch(FormActions.addItem());
    });
    ipc.on('menu-form-toggle-dueDate', () => {
      dispatch(FormActions.toggleField('dueDate'));
    });
    ipc.on('menu-form-toggle-currency', () => {
      dispatch(FormActions.toggleField('currency'));
    });
    ipc.on('menu-form-toggle-vat', () => {
      dispatch(FormActions.toggleField('vat'));
    });
    ipc.on('menu-form-toggle-discount', () => {
      dispatch(FormActions.toggleField('discount'));
    });
    ipc.on('menu-form-toggle-note', () => {
      dispatch(FormActions.toggleField('note'));
    });
    ipc.on('menu-form-toggle-settings', () => {
      dispatch(FormActions.toggleFormSettings());
    });
    // Save configs to invoice
    ipc.on('save-configs-to-invoice', (event, invoiceID, configs) => {
      dispatch(InvoicesActions.saveInvoiceConfigs(invoiceID, configs));
    });

    ipc.on('file-exported', (event, options) => {
      const noti = Notify(options);
      // Handle click on notification
      noti.onclick = () => {
        ipc.send('reveal-file', options.location);
      };
    });

    ipc.once('migrate-all-data', (event) => {
      dispatch(ContactsActions.encryptContacts())
      dispatch(InvoicesActions.encryptInvoices())
      ipc.send('data-migrated');
    })

    ipc.on('lock-app', (event, options) => {
      dispatch(LoginActions.deleteSecretKey())
    })
  }

  componentWillUnmount() {
    ipc.removeAllListeners([
      'menu-change-tab',
      'menu-form-save',
      'menu-form-clear',
      'menu-form-add-item',
      'menu-form-toggle-dueDate',
      'menu-form-toggle-currency',
      'menu-form-toggle-discount',
      'menu-form-toggle-vat',
      'menu-form-toggle-note',
      'menu-form-toggle-settings',
      // Save template configs to invoice
      'save-configs-to-invoice',
      'file-exported',
      'migrate-all-data',
      'lock-app'
    ]);
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
    ipc.send('resize-main-window', width, height);
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
