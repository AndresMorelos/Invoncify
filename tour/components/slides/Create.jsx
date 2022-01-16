import React from 'react';
import path from 'path';
import CreateImg from '@images/Create.svg'
import Slide from '../Slide';

const Create = function({t}) {
  return (
    <Slide
      fromColor="#85E5A9"
      toColor="#26BB86"
      heading={t('tour:slides:create:heading')}
      description={t('tour:slides:create:description')}
      imgSrc={CreateImg}
      imgSize="350px"
    />
  );
}

export default Create;
