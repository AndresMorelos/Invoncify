// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

// Actions
import { bindActionCreators } from 'redux';

// Components
import Recipient from '@components/form/Recipient';
import ItemsList from '@components/form/ItemsList';
import PaymentItemsList from '@components/form/PaymentItemsList';
import Currency from '@components/form/Currency';
import Discount from '@components/form/Discount';
import DueDate from '@components/form/DueDate';
import Tax from '@components/form/Tax';
import Note from '@components/form/Note';
import Payment from '@components/form/Payment';
import InvoiceID from '@components/form/InvoiceID';
import Settings from '@components/form/Settings';
import Button from '@components/shared/Button';
import _withFadeInAnimation from '@components/shared/hoc/_withFadeInAnimation';
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '@components/shared/Layout';
import * as SettingsActions from '../actions/settings';
import * as FormActions from '../actions/form';
import { getCurrentInvoice } from '../reducers/FormReducer';
import CreatedAt from '../components/form/CreatedAt';

// Component
class ContactForm extends PureComponent {
  render() {
    const {
      boundSettingsActionCreators,
      boundFormActionCreators,
      currentInvoice,
    } = this.props;
    // Form & Settings Actions
    const { updateSettings } = boundSettingsActionCreators;
    const {
      clearForm,
      toggleField,
      saveFormData,
      updateFieldData,
      toggleFormSettings,
      updateSavedFormSettings,
    } = boundFormActionCreators;
    // Form Value
    const {
      created_at,
      dueDate,
      currency,
      discount,
      tax,
      note,
      payment,
      invoiceID,
      settings,
      savedSettings,
    } = currentInvoice;

    const { required_fields, open, editMode } = settings;
    // Translation
    const { t } = this.props;
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>
            {editMode.active ? t('form:header:edit') : t('form:header:new')}
          </PageHeaderTitle>
          <PageHeaderActions>
            <Button danger onClick={clearForm}>
              {t('form:header:btns:clear')}
            </Button>
            <Button
              primary={editMode.active}
              success={editMode.active === false}
              onClick={saveFormData}
            >
              {editMode.active
                ? t('form:header:btns:update')
                : t('form:header:btns:saveAndPreview')}
            </Button>
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <Settings
            t={t}
            toggleField={toggleField}
            toggleFormSettings={toggleFormSettings}
            settings={settings}
            savedSettings={savedSettings.required_fields}
            updateSavedSettings={updateSavedFormSettings}
          />
          {required_fields.invoiceID && (
            <InvoiceID
              t={t}
              invoiceID={invoiceID}
              updateFieldData={updateFieldData}
            />
          )}
          <Recipient />
          <ItemsList />
          <PaymentItemsList />
          {editMode.active && (
            <CreatedAt
              t={t}
              created_at={created_at}
              updateFieldData={updateFieldData}
            />
          )}
          {required_fields.dueDate && (
            <DueDate
              t={t}
              dueDate={dueDate}
              updateFieldData={updateFieldData}
            />
          )}
          {required_fields.currency && (
            <Currency
              t={t}
              currency={currency}
              updateFieldData={updateFieldData}
              savedSettings={savedSettings.currency}
              updateSavedSettings={updateSavedFormSettings}
            />
          )}
          {required_fields.discount && (
            <Discount
              t={t}
              discount={discount}
              updateFieldData={updateFieldData}
            />
          )}
          {required_fields.tax && (
            <Tax
              t={t}
              tax={tax}
              updateFieldData={updateFieldData}
              savedSettings={savedSettings.tax}
              updateSavedSettings={updateSavedFormSettings}
            />
          )}
          {required_fields.note && (
            <Note t={t} note={note} updateFieldData={updateFieldData} />
          )}
          {required_fields.payment && (
            <Payment
              t={t}
              payment={payment}
              updateFieldData={updateFieldData}
              savedSettings={savedSettings.payment}
              updateSavedSettings={updateSavedFormSettings}
            />
          )}
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes Validation
ContactForm.propTypes = {
  boundFormActionCreators: PropTypes.shape({
    // Works but need to refactor to handle passed click event
    clearForm: PropTypes.func.isRequired,
    saveFormData: PropTypes.func.isRequired,
    updateFieldData: PropTypes.func.isRequired,
  }).isRequired,
  currentContact: PropTypes.shape({
   
  }).isRequired,
};

// Map state & dispatch to props
const mapStateToProps = (state) => ({
  currentContact: getCurrentInvoice(state),
});

const mapDispatchToProps = (dispatch) => ({
  boundFormActionCreators: bindActionCreators(FormActions, dispatch),
  boundSettingsActionCreators: bindActionCreators(SettingsActions, dispatch),
});

// Export
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  _withFadeInAnimation
)(ContactForm);
