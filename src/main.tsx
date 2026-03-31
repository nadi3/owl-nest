/**
 * @file main.tsx
 * @description The main entry point for the React application.
 *
 * This file is responsible for:
 * 1. Importing the necessary global stylesheets, including fonts.
 * 2. Importing the i18n configuration to initialize internationalization.
 * 3. Rendering the root `App` component into the DOM.
 *
 * It uses React 18's `createRoot` API for concurrent rendering and wraps the
 * `App` component in `React.StrictMode` to enable checks and warnings for
 * potential problems in the application.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './i18n/config';
import '@/styles/fonts.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
