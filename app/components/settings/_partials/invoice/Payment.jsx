import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Row, Field, Part } from '../../../shared/Part';


const PaymentContent = styled.textarea`
  min-height: 36px;
  border-radius: 4px;
  padding: 10px;
  display: block;
  width: 100%;
  border: 1px solid #f2f3f4;
  color: #3a3e42;
  font-size: 14px;
`;

const Payment = function ({ t, payment, handlePaymentChange }) {
  return [
    <label key="label" className="itemLabel">
      {t('settings:fields:paymentSettings')}
    </label>,
    <Part key="part">
      <Row>
        <Field>
          <label className="itemLabel">{t('common:details')}</label>
          <PaymentContent
            name="details"
            cols="50"
            rows="3"
            value={payment.details || ''}
            onChange={handlePaymentChange}
            placeholder={t('form:fields:payment:description')}
          />
        </Field>
      </Row>
    </Part>,
  ];
}

Payment.propTypes = {
  payment: PropTypes.object.isRequired,
  handlePaymentChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Payment;