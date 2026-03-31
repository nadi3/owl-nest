import React from 'react';
import { SpeedDial, SpeedDialAction, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeStore } from '@/store/useThemeStore.ts';

/**
 * Floating Speed Dial for global settings (Language, Theme mode).
 * Positioned top-right to balance the UI with NavSpeedDial.
 */
const SettingsSpeedDial: React.FC = () => {
  const { i18n, t } = useTranslation();
  const theme = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const { toggleTheme } = useThemeStore();

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
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default SettingsSpeedDial;
