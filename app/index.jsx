// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import ErrorBoundary from '@components/shared/ErrorBoundary';
// eslint-disable-next-line import/no-unresolved
import * as Sentry from '@sentry/electron/renderer';
import { BrowserTracing } from '@sentry/tracing';
import configureStore from './store';
import i18n from '../i18n/i18n';

// Root Component
import App from './App';

const appConfig = require('@electron/remote').require('electron-settings');

import '@styles/bootstrap.min.css';
import '@styles/ionicons.min.css';
import '@styles/general.css';
import '@styles/layout.css';
import '@styles/form.css';
import '@styles/contact.css';
import '@styles/items.css';
import '@styles/date-picker.css';
import '@styles/tooltip.css';

Sentry.init({
  enabled: appConfig.getSync('general.enableMetrics'),
  dsn: 'https://369beb9600244b6e83ef6f3fe77b4d29@o1191884.ingest.sentry.io/6313417',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.5,
});

// Store
const store = configureStore();

// Render
ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </AppContainer>
  </Provider>,
  document.getElementById('root')
);
