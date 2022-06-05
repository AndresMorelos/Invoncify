// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom Components
import Form from '../../containers/Form';
import Invoices from '../../containers/Invoices';
import Contacts from '../../containers/Contacts';
import ContactForm from '../../containers/ContactForm';
import Settings from '../../containers/Settings';
import Statistics from '../../containers/Statistics';

// Layout
import { AppMainContent } from '../shared/Layout';

class AppMain extends Component {
  shouldComponentUpdate(nextProps) {
    const { activeTab } = this.props;
    return activeTab !== nextProps.activeTab;
  }

  render() {
    const { activeTab } = this.props;
    return (
      <AppMainContent>
        {activeTab === 'form' && <Form />}
        {activeTab === 'invoices' && <Invoices />}
        {activeTab === 'contacts' && <Contacts />}
        {activeTab === 'statistics' && <Statistics />}
        {activeTab === 'settings' && <Settings />}
        {activeTab === 'contactForm' && <ContactForm />}
      </AppMainContent>
    );
  }
}

AppMain.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default AppMain;
