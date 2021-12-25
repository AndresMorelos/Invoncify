import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

import Login from '../components/login/Login'; // Welcome Slide


function Slider({ t }) {
  return (
    <Content>
      <Login t={t} />
    </Content>
  );
}

export default Slider;
