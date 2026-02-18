import { createTheme, type ThemeOptions, type Shadows } from '@mui/material/styles';
import React from 'react';

// 1. Préparation des ombres (Exactement 25 éléments)
const customShadows = Array(25).fill('none') as Shadows;
customShadows[1] = '0 2px 4px rgba(0,0,0,0.05)'; // Notre ombre standard
customShadows[2] = '0 4px 12px rgba(0,0,0,0.08)'; // Pour les hovers

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#003A69',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2EFFFF',
      contrastText: '#003A69',
    },
    success: {
      main: '#00B80C',
    },
    error: {
      main: '#82001E',
    },
    background: {
      default: '#F4F6F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#001E3C',
      secondary: '#4D5F71',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Rubik", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Rubik", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Rubik", sans-serif', fontWeight: 500 },
    h4: { fontFamily: '"Rubik", sans-serif', fontWeight: 500 },
    h5: { fontFamily: '"Rubik", sans-serif', fontWeight: 500 },
    h6: { fontFamily: '"Rubik", sans-serif', fontWeight: 500 },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600 },
    // Ajout du variant personnalisé "code"
    code: {
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      fontSize: '0.9rem',
      backgroundColor: '#F0F2F5',
      padding: '2px 4px',
      borderRadius: '4px',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: customShadows,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: '#004A85', // Un bleu un peu plus clair
            boxShadow: '0 4px 12px rgba(0, 58, 105, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Supprime l'overlay MUI en mode sombre
        },
        rounded: {
          borderRadius: 12, // Plus doux pour les conteneurs principaux
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

export const owlTheme = createTheme(themeOptions);

/** * Extension des types pour TypeScript
 * Permet d'utiliser <Typography variant="code">
 */
declare module '@mui/material/styles' {
  interface TypographyVariants {
    code: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    code?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    code: true;
  }
}
