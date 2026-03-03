import { createTheme, type ThemeOptions, type Shadows } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material';

const customShadows = new Array(25).fill('none') as Shadows;
customShadows[1] = '0 2px 4px rgba(0,0,0,0.05)';
customShadows[2] = '0 4px 12px rgba(0,0,0,0.08)';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#003A69',
      contrastText: '#FFFFFF',
      dark: '#002746',
      light: '#95c4da',
    },
    secondary: {
      main: '#FA8072',
      contrastText: '#FFFFFF',
      dark: '#D96C5F',
      light: '#fabfba',
    },
    success: {
      main: '#00B80C',
      contrastText: '#FFFFFF',
      dark: '#00930A',
      light: '#befac1',
    },
    error: {
      main: '#82001E',
      contrastText: '#FFFFFF',
      dark: '#680018',
      light: '#fbb9c7',
    },
    background: {
      default: '#F4F6F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#101727',
      secondary: '#4D5F71',
    },
    divider: '#E0E4E8',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Rubik", sans-serif', fontWeight: 700, color: '#003A69' },
    h2: { fontFamily: '"Rubik", sans-serif', fontWeight: 700, color: '#003A69' },
    h3: { fontFamily: '"Rubik", sans-serif', fontWeight: 500, color: '#003A69' },
    h4: { fontFamily: '"Rubik", sans-serif', fontWeight: 500, color: '#003A69' },
    h5: { fontFamily: '"Rubik", sans-serif', fontWeight: 500, color: '#003A69' },
    h6: { fontFamily: '"Rubik", sans-serif', fontWeight: 500, color: '#003A69' },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: customShadows,
  components: {
    MuiGrid: {
      defaultProps: {
        spacing: 2,
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#E0E4E8',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#001E3C',
          borderRadius: 4,
          fontSize: '0.75rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #E0E4E8',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
      },
    },
  },
};

let theme = createTheme(themeOptions);
theme = responsiveFontSizes(theme);

export const owlTheme = theme;
