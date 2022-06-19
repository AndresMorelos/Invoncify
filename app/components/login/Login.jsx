import React from 'react';
import WelcomeImg from '@images/default_logo.svg';
import Slide from '../shared/Slide';

const Login = function ({ t, formAction }) {
  return (
    <Slide
      inverted
      fromColor="#2da4a3"
      toColor="#ffbd3e"
      heading={t('login:heading')}
      description={t('login:description')}
      imgSrc={WelcomeImg}
      imgSize="300px"
      formAction={formAction}
    />
  );
};

export default Login;
