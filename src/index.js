import React from 'react';
import ReactDOM from 'react-dom';
import { StoriesApp } from './StoriesApp';
import { SnackbarProvider } from 'notistack';

import './styles.css';

ReactDOM.render(
   <SnackbarProvider maxSnack={3}>
      <StoriesApp />
   </SnackbarProvider>,
  document.getElementById('root')
);

