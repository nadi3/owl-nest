import { createTheme, responsiveFontSizes, type Shadows, type PaletteMode } from '@mui/material';

const customShadows = new Array(25).fill('none') as Shadows;
customShadows[1] = '0 2px 4px rgba(0,0,0,0.05)';
customShadows[2] = '0 4px 12px rgba(0,0,0,0.08)';

export const getOwlTheme = (mode: PaletteMode) => {
  const isDark = mode === 'dark';

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#95c4da' : '#003A69',
        contrastText: isDark ? '#003A69' : '#FFFFFF',
        dark: isDark ? '#003A69' : '#002746',
        light: '#95c4da',
      },
      secondary: {
        main: '#FA8072',
        contrastText: '#FFFFFF',
        dark: '#D96C5F',
        light: isDark ? '#4a0e07' : '#fabfba',
      },
      background: {
        default: isDark ? '#101727' : '#F4F6F8',
        paper: isDark ? '#101F33' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#ECEFF1' : '#101727',
        secondary: isDark ? '#AFBDCC' : '#4D5F71',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.12)' : '#E0E4E8',
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontFamily: '"Rubik", sans-serif',
        fontWeight: 700,
        color: isDark ? '#95c4da' : '#003A69',
      },
      h2: {
        fontFamily: '"Rubik", sans-serif',
        fontWeight: 700,
        color: isDark ? '#95c4da' : '#003A69',
      },
      h3: {
        fontFamily: '"Rubik", sans-serif',
        fontWeight: 500,
        color: isDark ? '#95c4da' : '#003A69',
      },
      h4: {
        fontFamily: '"Rubik", sans-serif',
        fontWeight: 500,
        color: isDark ? '#95c4da' : '#003A69',
      },
      h5: {
        fontFamily: '"Rubik", sans-serif',
        fontWeight: 500,
        color: isDark ? '#95c4da' : '#003A69',
      },
      h6: {
        fontFamily: '"Rubik", sans-serif',
        fontWeight: 500,
        color: isDark ? '#95c4da' : '#003A69',
      },
      body1: { fontSize: '1rem', lineHeight: 1.5 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 8 },
    shadows: customShadows,
    components: {
      MuiDivider: {
        styleOverrides: {
          root: { borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#E0E4E8' },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDark ? '#95c4da' : '#001E3C',
            color: isDark ? '#001E3C' : '#FFFFFF',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
          rounded: { borderRadius: 12 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : '#E0E4E8'}`,
            boxShadow: isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.05)',
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
