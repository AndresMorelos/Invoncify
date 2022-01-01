// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Custom Components
import Button from '../shared/Button';

// Component
class ExportImport extends PureComponent {
    render() {
        const { t, exportData, importData } = this.props;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em', marginBottom: '1em' }}>
                <Button style={{ width: '30em', height: '4em', marginRigth: '1em' }} primary onClick={exportData}>
                    <h6> {t('exportImport:actions:export')}<i className="ion-arrow-up-c" /></h6>
                </Button>
                <Button style={{ width: '30em', height: '4em', marginLeft: '1em' }} warning onClick={importData}>
                    <h6>{t('exportImport:actions:import')}<i className="ion-arrow-down-c" /></h6>
                </Button>
            </div>
        );
    }
}

ExportImport.propTypes = {
    t: PropTypes.func.isRequired,
    exportData: PropTypes.func.isRequired,
    importData: PropTypes.func.isRequired
};


export default ExportImport;
