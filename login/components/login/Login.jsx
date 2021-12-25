import React from 'react';
import Login from '../Slide';
import WelcomeImg from '@images/Welcome.svg'

function Login({t}) {
  return (
    <Slide
      inverted
      fromColor="#CAD2E8"
      toColor="#6979A4"
      heading={t('login:heading')}
      description={t('login:description')}
      imgSrc={WelcomeImg}
      imgSize="300px"
    />
  );
}

export default Login;
