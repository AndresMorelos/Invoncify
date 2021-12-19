// Prevent window to open dropped file
require('../libs/dragNdrop.js');

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Dialog';

import '@styles/bootstrap.min.css'
import '@styles/ionicons.min.css'
import '@styles/general.css'

ReactDOM.render(
  <Dialog />,
  document.getElementById('root')
);
