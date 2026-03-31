/**
 * @file App.tsx
 * @description The root component of the Owl Nest application.
 * It sets up the main providers and renders the router.
 */

import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getOwlTheme } from '@/theme/theme';
import { router } from './routes';
import { useImpatienceDetector } from '@/hooks/useImpatienceDetector.ts';
import { ImpatiencePopup } from '@/components/useless/ImpatiencePopup.tsx';
import { useMemo } from 'react';
import { useThemeStore } from '@/store/useThemeStore.ts';
import { HelmetProvider } from 'react-helmet-async';

/**
 * The root component of the application.
 *
 * This component is responsible for setting up the top-level providers that
 * are required for the rest of the application to function correctly. This includes:
 * - `HelmetProvider`: For managing the document head (e.g., for SEO).
 * - `ThemeProvider`: For applying the Material-UI theme, which is dynamically
 *   switched between light and dark modes based on the `useThemeStore`.
 * - `CssBaseline`: For applying a consistent baseline of CSS styles.
 *
 * It also initializes the `useImpatienceDetector` hook to monitor user behavior
 * globally and renders the main `RouterProvider` to handle all routing.
 *
 * @component
 * @returns {React.ReactElement} The rendered application.
 */
function App() {
  useImpatienceDetector();
  const mode = useThemeStore((state) => state.mode); // 1. On récupère le mode
  const theme = useMemo(() => getOwlTheme(mode), [mode]); // 2. On génère le thème
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <ImpatiencePopup />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
