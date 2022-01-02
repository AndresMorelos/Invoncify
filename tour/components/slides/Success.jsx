import React from 'react';
import SuccessImg from '@images/Success.svg'
import Slide from '../Slide';

const Success = function ({ t }) {
  return (
    <Slide
      fromColor="#FFFFFF"
      toColor="#ECE9E6"
      heading={t('tour:slides:success:heading')}
      description={t('tour:slides:success:description')}
      imgSrc={SuccessImg}
      imgSize="350px"
    />
  );
}

export default Success;
