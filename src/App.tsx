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
