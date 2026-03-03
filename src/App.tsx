import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { owlTheme } from '@/theme/theme';
import { router } from './routes';

function App() {
  return (
    <ThemeProvider theme={owlTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
