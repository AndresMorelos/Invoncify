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
import Actions from '@components/Actions';
import Slider from './containers/Slider';

class Tour extends Component {
  constructor(props) {
    super(props);
    this.state = { currentSlide: 1, totalSlide: 6 };
    this.nextSlide = this.nextSlide.bind(this);
    this.endTour = this.endTour.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  nextSlide() {
    this.setState((prevState) => ({ currentSlide: prevState.currentSlide + 1 }));
  }

  endTour() {
    this.setState({ currentSlide: 1 }, () => {
      ipc.send('end-tour');
    });
  }

  render() {
    const { t } = this.props;
    const { currentSlide, totalSlide } = this.state;
    return (
      <Wrapper>
        <Slider t={t} currentSlide={currentSlide} />
        <Actions
          t={t}
          totalSlide={totalSlide}
          currentSlide={currentSlide}
          nextSlide={this.nextSlide}
          endTour={this.endTour}
        />
      </Wrapper>
    );
  }
}

export default compose(withTranslation(['common', 'tour']))(Tour);
