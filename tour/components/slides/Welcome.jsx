import React from 'react';
import WelcomeImg from '@images/Welcome.svg'
import Slide from '../Slide';

const Welcome = function({t}) {
  return (
    <Slide
      inverted
      fromColor="#2da4a3"
      toColor="#ffbd3e"
      heading={t('tour:slides:welcome:heading')}
      description={t('tour:slides:welcome:description')}
      imgSrc={WelcomeImg}
      imgSize="300px"
    />
  );
}

export default Welcome;
