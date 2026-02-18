import '@fontsource/rubik/500.css';
import '@fontsource/rubik/700.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { owlTheme } from './theme/theme';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={owlTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
