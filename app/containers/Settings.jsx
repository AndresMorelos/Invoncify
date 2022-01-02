// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { withTranslation } from 'react-i18next';

// Node Libs
import { ipcRenderer as ipc } from 'electron';

// Components
import Profile from '@components/settings/Profile';
import General from '@components/settings/General';
import Invoice from '@components/settings/Invoice';
import Button from '@components/shared/Button';
import { Tab, Tabs, TabContent } from '@components/shared/Tabs';
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '@components/shared/Layout';
import _withFadeInAnimation from '@components/shared/hoc/_withFadeInAnimation';

// Helpers
import { parseImportFile } from '../helpers/importFile';
// Selectors
import {
  getCurrentSettings,
  getSavedSettings,
} from '../reducers/SettingsReducer';

// Actions
import * as SettingsActions from '../actions/settings';
import * as ExportImportActions from '../actions/exportImport';

import { bindActionCreators } from 'redux';


// Component
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { visibleTab: 1, canSave: true };
    this.saveSettingsState = this.saveSettingsState.bind(this);
    this.setSavable = this.setSavable.bind(this);
    this.selectImportFile = this.selectImportFile.bind(this);
  }

  componentDidMount() {
    ipc.on('import-file-selected', (event, filePath) => {
      this.handleFileUpload(filePath);
    })
  }

  componentWillUnmount() {
    ipc.removeAllListeners(['import-file-selected'])
  }

  // Check if settings have been saved
  settingsSaved() {
    const { currentSettings, savedSettings } = this.props;
    return isEqual(currentSettings, savedSettings);
  }

  // Save Settings to App Config
  saveSettingsState() {
    const { currentSettings, boundActionCreators } = this.props;
    boundActionCreators.saveSettings(currentSettings);
  }

  // Switch Tab
  changeTab(tabNum) {
    this.setState({ visibleTab: tabNum });
  }

  // controls if save button appears
  setSavable(settingsValid) {
    this.setState({ canSave: settingsValid });
  }

  handleFileUpload(filePath) {
    parseImportFile(filePath, (err, fileData) => {
      if (err) {
        return;
      }
      this.importData(fileData)
    })
  }

  importData(fileData) {
    const { importData } = this.props.boundExportImportActionsCreators;
    importData(fileData)
  }

  selectImportFile(fileData) {
    ipc.send('open-import-file-dialog')
  }

  // Render Main Content
  renderSettingsContent() {
    const { t } = this.props;
    const { updateSettings } = this.props.boundActionCreators;
    const { exportData } = this.props.boundExportImportActionsCreators;
    const { profile, general, invoice } = this.props.currentSettings;
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>{t('settings:header')}</PageHeaderTitle>
          {!this.settingsSaved() && this.state.canSave && (
            <PageHeaderActions>
              <Button primary onClick={this.saveSettingsState}>
                {t('common:save')}
              </Button>
            </PageHeaderActions>
          )}
        </PageHeader>
        <PageContent>
          <Tabs>
            <Tab
              href="#"
              className={this.state.visibleTab === 1 ? 'active' : ''}
              onClick={() => this.changeTab(1)}
            >
              {t('settings:tabs:profile')}
            </Tab>
            <Tab
              href="#"
              className={this.state.visibleTab === 2 ? 'active' : ''}
              onClick={() => this.changeTab(2)}
            >
              {t('settings:tabs:invoice')}
            </Tab>
            <Tab
              href="#"
              className={this.state.visibleTab === 3 ? 'active' : ''}
              onClick={() => this.changeTab(3)}
            >
              {t('settings:tabs:general')}
            </Tab>
          </Tabs>
          <TabContent>
            {this.state.visibleTab === 1 && (
              <Profile t={t} profile={profile} updateSettings={updateSettings} setSavable={this.setSavable} />
            )}
            {this.state.visibleTab === 2 && (
              <Invoice t={t} invoice={invoice} updateSettings={updateSettings} setSavable={this.setSavable} />
            )}
            {this.state.visibleTab === 3 && (
              <General
                t={t}
                general={general}
                updateSettings={updateSettings}
                setSavable={this.setSavable}
                exportData={exportData}
                importData={this.selectImportFile}
              />
            )}
          </TabContent>
        </PageContent>
      </PageWrapper>
    );
  }

  render() {
    return this.props.currentSettings ? this.renderSettingsContent() : null;
  }
}

// PropTypes Validation
Settings.propTypes = {
  boundActionCreators: PropTypes.shape({
    getInitalSettings: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    saveSettings: PropTypes.func.isRequired,
  }).isRequired,
  boundExportImportActionsCreators: PropTypes.shape({
    exportData: PropTypes.func.isRequired,
    importData: PropTypes.func.isRequired
  }),
  currentSettings: PropTypes.object.isRequired,
  savedSettings: PropTypes.object.isRequired,
};

// Map State & Dispatch to Props & Export
const mapDispatchToProps = dispatch => ({
  boundActionCreators: bindActionCreators(SettingsActions, dispatch),
  boundExportImportActionsCreators: bindActionCreators(ExportImportActions, dispatch)
});

const mapStateToProps = state => ({
  currentSettings: getCurrentSettings(state),
  savedSettings: getSavedSettings(state),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  _withFadeInAnimation
)(Settings);
