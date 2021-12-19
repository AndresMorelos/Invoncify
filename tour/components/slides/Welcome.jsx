import React from 'react';
import path from 'path';
import Slide from '../Slide';
import WelcomeImg from '@images/Welcome.svg'

function Welcome({t}) {
  return (
    <Slide
      inverted
      fromColor="#CAD2E8"
      toColor="#6979A4"
      heading={t('tour:slides:welcome:heading')}
      description={t('tour:slides:welcome:description')}
      imgSrc={WelcomeImg}
      imgSize="400px"
    />
  );
}

export default Welcome;
