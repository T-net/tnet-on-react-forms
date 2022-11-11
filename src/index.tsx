import React from 'react';
import { createRoot } from 'react-dom/client';
import { applyPolyfills, defineCustomElements } from '@group-ui/group-ui-react/node_modules/@group-ui/group-ui/dist/loader';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './index.scss';

applyPolyfills().then(() => defineCustomElements());

const container = document.getElementById('app');
if (!container) throw new Error('Failed to find the root element');

createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
