// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Section, Label } from '../shared';

const Language = function({ t, language, handleInputChange, UILang }) {
  return (
    <Section>
      <Label>
        {t('settings:fields:language:name', { lng: UILang })}
      </Label>
      <select name="language" value={language} onChange={handleInputChange}>
        <option value="de">{t('settings:fields:language:de', { lng: 'de' })}</option>
        <option value="en">{t('settings:fields:language:en', { lng: 'en' })}</option>
        <option value="esES">{t('settings:fields:language:esES', { lng: 'esES' })}</option>
        <option value="fr">{t('settings:fields:language:fr', { lng: 'fr' })}</option>
        <option value="id">{t('settings:fields:language:id', { lng: 'id' })}</option>
        <option value="it">{t('settings:fields:language:it', { lng: 'it' })}</option>
        <option value="sk">{t('settings:fields:language:sk', { lng: 'sk' })}</option>
        <option value="ur-PK">{t('settings:fields:language:ur-PK', { lng: 'ur-PK' })}</option>
        <option value="vi">{t('settings:fields:language:vi', { lng: 'vi' })}</option>
        <option value="zh-CN">{t('settings:fields:language:zh-CN', { lng: 'zh-CN' })}</option>
        <option value="sr">{t('settings:fields:language:sr', { lng: 'sr' })}</option>
        <option value="nl">{t('settings:fields:language:nl', { lng: 'nl' })}</option>
        <option value="ro">{t('settings:fields:language:ro', { lng: 'ro' })}</option>
      </select>
    </Section>
  );
}

Language.propTypes = {
  language: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  UILang: PropTypes.string.isRequired,
};

export default Language;
