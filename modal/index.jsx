// Prevent window to open dropped file
require('../libs/dragNdrop.js');

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-unresolved
import * as Sentry from '@sentry/electron/renderer';
import { BrowserTracing } from '@sentry/tracing';
import Dialog from './Dialog';

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

ReactDOM.render(
  <Dialog />,
  document.getElementById('root')
);
