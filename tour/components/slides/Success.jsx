import React from 'react';
import path from 'path';
import Slide from '../Slide';
import SuccessImg from '@images/Success.svg'

function Success({t}) {
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
