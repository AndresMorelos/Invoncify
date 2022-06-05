// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Animation
import _withFadeInAnimation from '@components/shared/hoc/_withFadeInAnimation';

// Styles
import { Part, Row, Field } from '../../shared/Part';

export const RecipientForm = function ({ t, formData, updateRecipientForm }) {
  const [contact, setContact] = useState(formData);

  // Hanlde Update Recipient Form Data
  const updateRecipientFormAction = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact((prevState) => ({ ...prevState, [name]: value }));
    updateRecipientForm(name, value);
  };

  return (
    <Part>
      <Row>
        <Field>
          <label className="itemLabel">{t('common:fields:fullname')} *</label>
          <input
            name="fullname"
            type="text"
            value={contact.fullname || ''}
            onChange={updateRecipientFormAction}
          />
        </Field>
        <Field>
          <label className="itemLabel">{t('common:fields:company')}</label>
          <input
            name="company"
            type="text"
            value={contact.company || ''}
            onChange={updateRecipientFormAction}
          />
        </Field>
      </Row>
      <Row>
        <Field>
          <label className="itemLabel">{t('common:fields:email')} *</label>
          <input
            name="email"
            type="text"
            value={contact.email || ''}
            onChange={updateRecipientFormAction}
          />
        </Field>
        <Field>
          <label className="itemLabel">{t('common:fields:phone')}</label>
          <input
            name="phone"
            type="text"
            value={contact.phone || ''}
            onChange={updateRecipientFormAction}
          />
        </Field>
      </Row>
      <Row>
        <Field>
          <label className="itemLabel">{t('common:fields:address')}</label>
          <input
            name="address"
            type="text"
            value={contact.address || ''}
            onChange={updateRecipientFormAction}
          />
        </Field>
      </Row>
    </Part>
  );
};

// PropTypes Validation
RecipientForm.propTypes = {
  formData: PropTypes.object,
  t: PropTypes.func.isRequired,
  updateRecipientForm: PropTypes.func.isRequired,
};

RecipientForm.defaultProps = {
  formData: {},
};

export default _withFadeInAnimation(RecipientForm);
