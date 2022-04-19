// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom Libs
import Button from '@components/shared/Button'
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Shared Components

// Component
class General extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.setState(this.props.general);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value }, () => {
      this.props.updateSettings('general', this.state);
    });
  }

  render() {
    const { t, exportData, importData } = this.props;
    const { sound, muted, language, previewPDF, trayIcon, enableMetrics } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{t('settings:fields:sound')}</label>
              <select
                name="sound"
                value={sound}
                onChange={this.handleInputChange}
              >
                <option value="default">{t('common:default')}</option>
                <option value="cs">Counter Strike</option>
                <option value="minecraft">Minecraft</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{t('settings:fields:mute')}</label>
              <label className="switch">
                <input
                  name="muted"
                  type="checkbox"
                  checked={muted}
                  onChange={this.handleInputChange}
                />
                <span className="slider round" />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{t('settings:fields:language:name')}</label>
              <select
                name="language"
                value={language}
                onChange={this.handleInputChange}
              >
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
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{t('settings:fields:openPDFReader')}</label>
              <label className="switch">
                <input
                  name="previewPDF"
                  type="checkbox"
                  checked={previewPDF}
                  onChange={this.handleInputChange}
                />
                <span className="slider round" />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{t('settings:fields:importExport:name')}</label>
              <Button style={{ marginRigth: '1em' }} primary onClick={exportData}>
                <b>
                  {t('settings:fields:importExport:export')} <i className="ion-arrow-up-c" />
                </b>
              </Button>
              <Button style={{ marginLeft: '1em' }} warning onClick={importData}>
                <b>
                  {t('settings:fields:importExport:import')} <i className="ion-arrow-down-c" />
                </b>
              </Button>
              <p style={{ marginLeft: '.5em' }}>
                <b style={{ color: '#6C7A89' }}>{t('settings:fields:importExport:information:label')}</b>
                <span style={{ color: '#757D75' }}> {t('settings:fields:importExport:information:info')}</span>
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{t('settings:fields:trayIcon')}</label>
              <label className="switch">
                <input
                  name="trayIcon"
                  type="checkbox"
                  checked={trayIcon}
                  onChange={this.handleInputChange}
                />
                <span className="slider round" />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="pageItem" />
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{t('settings:fields:sendMetricsAnon')}</label>
              <label className="switch">
                <input
                  name="enableMetrics"
                  type="checkbox"
                  checked={enableMetrics}
                  onChange={this.handleInputChange}
                />
                <span className="slider round" />
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

General.propTypes = {
  general: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
  exportData: PropTypes.func.isRequired,
  importData: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(General);
