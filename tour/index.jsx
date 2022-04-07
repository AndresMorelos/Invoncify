// Prevent window to open dropped file
import '../libs/dragNdrop';

// Libraries
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
// eslint-disable-next-line import/no-unresolved
import * as Sentry from '@sentry/electron/renderer';
import { BrowserTracing } from '@sentry/tracing';
import i18n from '../i18n/i18n';

// Root Component
import Tour from './Tour';

const appConfig = require('@electron/remote').require('electron-settings');

import '@styles/bootstrap.min.css'
import '@styles/ionicons.min.css'
import '@styles/general.css'

Sentry.init({
  enabled: appConfig.getSync('general.enableMetrics'),
  dsn: 'https://369beb9600244b6e83ef6f3fe77b4d29@o1191884.ingest.sentry.io/6313417',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.5
});


render(
  <AppContainer>
    <Tour />
  </AppContainer>,
  document.getElementById('root')
);
