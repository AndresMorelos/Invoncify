// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
const openDialog = require('../renderers/dialog');

// Actions
import * as ExportImportActions from '../actions/exportImport';

// Components
import {
    PageWrapper,
    PageHeader,
    PageHeaderTitle,
    PageContent,
} from '@components/shared/Layout';
import ExportImportPage from '@components/exportImport/ExportImport.jsx';
import _withFadeInAnimation from '@components/shared/hoc/_withFadeInAnimation';

// Component
class ExportImport extends PureComponent {
    constructor(props) {
        super(props)
        this.exportData = this.exportData.bind(this);
        this.importData = this.importData.bind(this);
    }

    exportData() {
        const { dispatch } = this.props
        dispatch(ExportImportActions.exportData())
    }

    importData() {
        const { dispatch } = this.props
        dispatch(ExportImportActions.importData())
    }

    render() {
        const { t } = this.props;
        return (
            <PageWrapper>
                <PageHeader>
                    <PageHeaderTitle>{t('exportImport:header')}</PageHeaderTitle>
                </PageHeader>
                <PageContent>
                    <ExportImportPage t={t} exportData={this.exportData} importData={this.importData} />
                    <p style={{ marginLeft: '.5em' }}>
                        <b>{t('exportImport:information:label')}</b>
                        <span style={{ color: 'gray' }}> {t('exportImport:information:info')}</span>
                    </p>
                </PageContent>
            </PageWrapper>
        );
    }
}

// PropTypes
ExportImport.propTypes = {
    dispatch: PropTypes.func.isRequired,
};



export default compose(
    connect(),
    withTranslation()
)(ExportImport);
