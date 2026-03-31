import '@fontsource/rubik/500.css';
import '@fontsource/rubik/700.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './i18n/config';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
