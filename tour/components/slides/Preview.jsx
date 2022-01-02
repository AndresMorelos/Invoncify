import React from 'react';
import PreviewImg from '@images/Preview.svg'
import Slide from '../Slide';

const description = `
`;

const Preview = function({ t }) {
  return (
    <Slide
      inverted
      fromColor="#5691c8"
      toColor="#457fca"
      heading={t('tour:slides:preview:heading')}
      description={t('tour:slides:preview:description')}
      imgSrc={PreviewImg}
      imgSize="400px"
    />
  );
}

export default Preview;
