import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';

const container = document.getElementById('app');
if (!container) throw new Error('Failed to find the root element');

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
