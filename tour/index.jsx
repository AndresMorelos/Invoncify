// Prevent window to open dropped file
require('../libs/dragNdrop.js');

// Libraries
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import i18n from '../i18n/i18n';

// Root Component
import Tour from './Tour';

import '@styles/bootstrap.min.css'
import '@styles/ionicons.min.css'
import '@styles/general.css'


render(
  <AppContainer>
    <Tour />
  </AppContainer>,
  document.getElementById('root')
);

// Accepting Hot Updates
module.hot && module.hot.accept();
