import React from 'react';
import { SpeedDial, SpeedDialAction, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeStore } from '@/store/useThemeStore.ts';

/**
 * @file This file contains the SettingsSpeedDial component, which provides users
 * with quick access to global application settings like language and theme.
 */

/**
 * A floating speed dial component for managing global application settings.
 *
 * This component is positioned at the top-right of the screen and offers actions for:
 * - Toggling the application language between English and French.
 * - Switching the UI theme between light and dark modes.
 *
 * It uses `zustand` via `useThemeStore` for theme state management and `react-i18next` for internationalization.
 *
 * @component
 * @returns {React.ReactElement} The rendered `SettingsSpeedDial` component.
 */
const SettingsSpeedDial: React.FC = () => {
  const { i18n, t } = useTranslation();
  const theme = useTheme();

  /**
   * Toggles the application's language between French ('fr') and English ('en').
   * It reads the current language from `i18n` and sets the alternative one.
   */
  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const { toggleTheme } = useThemeStore();

  /**
   * Defines the actions available in the speed dial menu.
   * Each action is an object with an icon, a descriptive name (for the tooltip),
   * and an `onClick` handler.
   * @type {Array<{icon: React.ReactElement, name: string, onClick: () => void}>}
   */
  const actions = [
    {
      icon: <LanguageIcon />,
      name: i18n.language.toUpperCase(),
      onClick: toggleLanguage,
    },
    {
      icon: theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />,
      name: theme.palette.mode === 'dark' ? t('common.light_mode') : t('common.dark_mode'),
      onClick: () => {
        toggleTheme();
      },
    },
  ];

  return (
    <SpeedDial
      ariaLabel="Settings"
      sx={{
        position: 'fixed',
        top: 24,
        right: 24,
        '& .MuiFab-primary': {
          width: 45,
          height: 45,
          backgroundColor: 'transparent',
          color: theme.palette.primary.main,
          boxShadow: 'none',
          border: `1px solid ${theme.palette.divider}`,
          '&:hover': {
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.primary.main}`,
          },
        },
      }}
      icon={<SettingsIcon />}
      direction="down"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          slotProps={{
            tooltip: {
              title: action.name,
            },
          }}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default SettingsSpeedDial;
