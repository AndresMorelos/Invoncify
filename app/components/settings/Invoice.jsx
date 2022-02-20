// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom Libs
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

import Currency from './_partials/invoice/Currency';
import Fields from './_partials/invoice/Fields';
import Other from './_partials/invoice/Other';
import Tax from './_partials/invoice/Tax';
import Payment from './_partials/invoice/Payment';

const invoncify = window.invoncify;
const openDialog = require('../../renderers/dialog.js');

// Component
class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.invoice;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTaxChange = this.handleTaxChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handlePaymentChange = this.handlePaymentChange.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  componentDidMount() {
    const { t, updateSettings } = this.props;
    invoncify.receive('no-access-directory', (event, message) => {
      openDialog({
        type: 'warning',
        title: t('dialog:noAccess:title'),
        message: `${message}. ${t('dialog:noAccess:message')}`,
      });
    });

    invoncify.receive('confirmed-export-directory', (event, path) => {
      this.setState({ exportDir: path }, () => {
        updateSettings('invoice', this.state);
      });
    });
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { updateSettings } = this.props;
    this.setState({ [name]: value }, () => {
      updateSettings('invoice', this.state);
    });
  }

  handleTaxChange(event) {
    const target = event.target;
    const name = target.name;
    const value = name === 'amount' ? parseFloat(target.value) : target.value;
    const { updateSettings } = this.props;
    const { tax } = this.state;
    this.setState(
      {
        tax: { ...tax, [name]: value },
      },
      () => {
        updateSettings('invoice', this.state);
      }
    );
  }

  handleCurrencyChange(event) {
    const target = event.target;
    const name = target.name;
    const value =
      name === 'fraction' ? parseInt(target.value, 10) : target.value;
    const { updateSettings } = this.props;
    const { currency } = this.state;
    this.setState(
      {
        currency: { ...currency, [name]: value },
      },
      () => {
        updateSettings('invoice', this.state);
      }
    );
  }

  handlePaymentChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const { updateSettings } = this.props;
    const { payment } = this.state;
    this.setState(
      {
        payment: { ...payment, [name]: value },
      },
      () => {
        updateSettings('invoice', this.state);
      }
    );
  }

  handleVisibilityChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.checked;
    const { updateSettings } = this.props;
    const { required_fields } = this.state;
    this.setState(
      {
        required_fields: { ...required_fields, [name]: value },
      },
      () => {
        updateSettings('invoice', this.state);
      }
    );
  }

  selectExportDir() {
    invoncify.settings.selectExportDirectory()
  }

  render() {
    const { t } = this.props;
    const {
      exportDir,
      template,
      currency,
      tax,
      payment,
      required_fields,
      dateFormat,
    } = this.state;
    return [
      <Fields
        key="required_fields_settings"
        required_fields={required_fields}
        handleVisibilityChange={this.handleVisibilityChange}
        t={t}
      />,
      <Tax
        key="tax_settings"
        handleTaxChange={this.handleTaxChange}
        tax={tax}
        t={t}
      />,
      <Currency
        key="currency_settings"
        currency={currency}
        handleCurrencyChange={this.handleCurrencyChange}
        t={t}
      />,
      <Payment
        key="payment_settings"
        handlePaymentChange={this.handlePaymentChange}
        payment={payment}
        t={t}
      />,
      <Other
        key="other_settings"
        dateFormat={dateFormat}
        exportDir={exportDir}
        template={template}
        handleInputChange={this.handleInputChange}
        selectExportDir={this.selectExportDir}
        t={t}
      />,
    ];
  }
}

Invoice.propTypes = {
  invoice: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(Invoice);
