import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeStore } from '@/store/useThemeStore.ts';

/**
 * Interactive button to switch between light and dark modes.
 */
export const ThemeToggle: React.FC = () => {
  const theme = useTheme();
  const { toggleTheme } = useThemeStore();

  return (
    <IconButton onClick={toggleTheme} color="inherit" aria-label="Toggle theme">
      {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};
