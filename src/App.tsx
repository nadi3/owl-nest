import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { owlTheme } from '@/theme/theme';
import { router } from './routes';
import { useImpatienceDetector } from '@/hooks/useImpatienceDetector.ts';
import { ImpatiencePopup } from '@/components/useless/ImpatiencePopup.tsx';

function App() {
  useImpatienceDetector();
  return (
    <ThemeProvider theme={owlTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <ImpatiencePopup />
    </ThemeProvider>
  );
}

export default App;
