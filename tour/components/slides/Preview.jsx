import React from 'react';
import path from 'path';
import Slide from '../Slide';
import PreviewImg from '@images/Preview.svg'

const description = `
`;

function Preview({t}) {
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
