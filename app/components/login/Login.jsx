import React from 'react';
import WelcomeImg from '@images/Welcome.svg'
import Slide from '../shared/Slide';

const Login = function({ t, formAction }) {
  return (
    <Slide
      inverted
      fromColor="#090979"
      toColor="#00d4ff"
      heading={t('login:heading')}
      description={t('login:description')}
      imgSrc={WelcomeImg}
      imgSize="300px"
      formAction={formAction}
    />
  );
}

export default Login;
