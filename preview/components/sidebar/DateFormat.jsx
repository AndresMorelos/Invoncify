// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Section, Label } from '../shared';
const moment = require('moment');

// Styling

const DateFormat = function({ t, dateFormat, handleInputChange, language, UILang }) {
  return (
    <Section>
      <Label>
        {t('settings:fields:dateFormat', { lng: UILang })}
      </Label>
      <select name="dateFormat" value={dateFormat} onChange={handleInputChange}>
        <option value="dddd, MMMM Do, YYYY">
          {moment(Date.now()).lang(language).format('dddd, MMMM Do, YYYY')} (dddd, MMMM Do,
          YYYY)
        </option>
        <option value="MMMM Do, YYYY">
          {moment(Date.now()).lang(language).format('MMMM Do, YYYY')} (MMMM Do, YYYY)
        </option>
        <option value="MM/DD/YYYY">
          {moment(Date.now()).lang(language).format('MM/DD/YYYY')} (MM/DD/YYYY)
        </option>
        <option value="MM/DD/YY">
          {moment(Date.now()).lang(language).format('MM/DD/YY')} (MM/DD/YY)
        </option>
        <option value="dddd, DD MMMM YYYY">
          {moment(Date.now()).lang(language).format('dddd, DD MMMM YYYY')} (dddd, DD MMMM
          YYYY)
        </option>
        <option value="DD/MMMM/YYYY">
          {moment(Date.now()).lang(language).format('DD/MMMM/YYYY')} (DD/MMMM/YYYY)
        </option>
        <option value="DD/MM/YYYY">
          {moment(Date.now()).lang(language).format('DD/MM/YYYY')} (DD/MM/YYYY)
        </option>
        <option value="DD/MM/YY">
          {moment(Date.now()).lang(language).format('DD/MM/YY')} (DD/MM/YY)
        </option>
        <option value="dddd, Do MMMM YYYY">
          {moment(Date.now()).format('dddd, Do MMMM YYYY')} (dddd, Do MMMM YYYY)
        </option>
        <option value="Do MMMM YYYY">
          {moment(Date.now()).format('Do MMMM YYYY')} (Do MMMM YYYY)
        </option>
        <option value="DD.MM.YYYY">
          {moment(Date.now()).format('DD.MM.YYYY')} (DD.MM.YYYY)
        </option>
        <option value="DD.MM.YY">
          {moment(Date.now()).format('DD.MM.YY')} (DD.MM.YY)
        </option>
        <option value="YYYY-MM-DD">
          {moment(Date.now()).format('YYYY-MM-DD')} (YYYY-MM-DD)
        </option>
      </select>
    </Section>
  );
}

DateFormat.propTypes = {
  dateFormat: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  UILang: PropTypes.string.isRequired,
};

export default DateFormat;