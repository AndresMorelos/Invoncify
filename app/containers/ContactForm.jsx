// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

// Actions
import { bindActionCreators } from 'redux';

// Components
import Form from '@components/contacts/Form/Form';
import Button from '@components/shared/Button';
import _withFadeInAnimation from '@components/shared/hoc/_withFadeInAnimation';
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '@components/shared/Layout';
import * as ContactFormActions from '../actions/contactForm';
import { getCurrentContact } from '../reducers/ContactFormReducer';

// Component
class ContactForm extends PureComponent {
  render() {
    const { boundFormActionCreators, currentContact } = this.props;
    // Form & Settings Actions
    const { clearForm, saveFormData, updateFieldData } =
      boundFormActionCreators;

    // Translation
    const { t } = this.props;
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>{t('form:header:contactEdit')}</PageHeaderTitle>
          <PageHeaderActions>
            <Button danger onClick={clearForm}>
              {t('form:header:btns:clear')}
            </Button>
            <Button primary onClick={saveFormData}>
              {t('form:header:btns:update')}
            </Button>
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <Form
            formData={currentContact}
            updateRecipientForm={updateFieldData}
            t={t}
          />
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
  currentContact: PropTypes.shape({}).isRequired,
};

// Map state & dispatch to props
const mapStateToProps = (state) => ({
  currentContact: getCurrentContact(state),
});

const mapDispatchToProps = (dispatch) => ({
  boundFormActionCreators: bindActionCreators(ContactFormActions, dispatch),
});

// Export
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  _withFadeInAnimation
)(ContactForm);
