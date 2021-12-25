// Libs
import React, { Component } from 'react';
import { compose } from 'recompose';
import { ipcRenderer as ipc } from 'electron';
import { withTranslation } from 'react-i18next';

import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
}
`;

// Components
import Slider from './containers/Login';

class Tour extends Component {
  constructor(props) {
    super(props);
    this.closeLogin = this.closeLogin.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }


  closeLogin() {
    ipc.send('end-login');
  }

  render() {
    const { t } = this.props;
    return (
      <Wrapper>
        <Slider t={t} />
      </Wrapper>
    );
  }
}

export default compose(withTranslation(['common', 'messages', 'login']))(Tour);
