// Libraries
import React, { PureComponent } from 'react';
import { Circle } from 'rc-progress';
import openDialog from '../../renderers/dialog';
import i18n from '../../../i18n/i18n';
import { Notify } from '../../../helpers/notify';
const invoncify = window.invoncify;

// Styled Components
import styled, { keyframes } from 'styled-components';

const breathing = keyframes`
  0% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const Indicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  color: #f2f3f4;
  i {
    font-size: 24px;
    animation: ${breathing} 1s infinite alternate;
  }
  svg {
    width: 24px;
    height: 24px;
  }
`;

class AppUpdate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checking: false,
      downloading: false,
      progress: null,
    };
    this.hideIndicator = this.hideIndicator.bind(this);
  }

  componentDidMount() {
    invoncify.receive('update-checking', () => {
      this.setState({ checking: true });
    });

    invoncify.receive('update-available', () => {
      this.hideIndicator();
      openDialog(
        {
          type: 'info',
          title: i18n.t('dialog:appUpdate:available:title'),
          message: i18n.t('dialog:appUpdate:available:message'),
          buttons: [i18n.t('common:yes'), i18n.t('common:noThanks')],
        },
        'update-download-confirmed'
      );
    });

    invoncify.receive('update-not-available', () => {
      openDialog({
        type: 'info',
        title: i18n.t('dialog:appUpdate:noUpdate:title'),
        message: i18n.t('dialog:appUpdate:noUpdate:message'),
      });
      this.hideIndicator();
    });

    invoncify.receive('update-error', (event, error) => {
      openDialog({
        type: 'warning',
        title: i18n.t('dialog:appUpdate:error:title'),
        message: error,
      });
      this.hideIndicator();
    });

    invoncify.receive('update-download-confirmed', (event, index) => {
      // Cancel the download
      if (index === 1) {
        this.hideIndicator();
        return;
      }
      // Start the download
      if (index === 0) {
        this.setState(
          {
            downloading: true,
          },
          invoncify.settings.updateDownloadStarted()
        );
      }
    });

    invoncify.receive('update-download-progress', (event, percentage) => {
      this.setState({
        progress: percentage,
      });
    });

    invoncify.receive('update-downloaded', () => {
      // Send notification
      Notify({
        title: i18n.t('dialog:appUpdate:downloaded:title'),
        body: i18n.t('dialog:appUpdate:downloaded:message'),
      });
      // Open Dialog
      openDialog(
        {
          type: 'info',
          title: i18n.t('dialog:appUpdate:downloaded:title'),
          message: i18n.t('dialog:appUpdate:downloaded:message'),
          buttons: [
            i18n.t('dialog:appUpdate:downloaded:quitNow'),
            i18n.t('dialog:appUpdate:downloaded:later'),
          ],
        },
        'upgrade-confirmed'
      );
      this.hideIndicator();
    });

    invoncify.receive('upgrade-confirmed', (event, index) => {
      if (index === 0) {
       invoncify.settings.quitAndInstall()
      }
    });
  }

  hideIndicator() {
    this.setState({
      checking: false,
      downloading: false,
      progress: null,
    });
  }

  render() {
    const { checking, downloading, progress } = this.state;
    return (
      <Indicator>
        {checking && <i className="ion-cloud" />}
        {downloading && (
          <Circle
            percent={progress}
            strokeWidth={16}
            trailWidth={16}
            trailColor="#4F555C"
            strokeColor="#469FE5"
          />
        )}
      </Indicator>
    );
  }
}

export default AppUpdate;
