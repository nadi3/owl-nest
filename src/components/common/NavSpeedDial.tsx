import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SpeedDial, SpeedDialAction, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ScienceIcon from '@mui/icons-material/Science';
import BuildIcon from '@mui/icons-material/Build';
import WorkIcon from '@mui/icons-material/Work';
import { MenuIcon } from 'lucide-react';

/**
 * Floating Speed Dial for minimalist navigation.
 * Replaces the traditional Sidebar.
 */
const NavSpeedDial: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const actions = [
    { icon: <HomeIcon />, name: t('nav.home'), path: '/' },
    { icon: <ScienceIcon />, name: t('nav.lab'), path: '/useless' },
    { icon: <BuildIcon />, name: t('nav.tools'), path: '/tools' },
    { icon: <WorkIcon />, name: t('nav.portfolio'), path: '/portfolio' },
  ];

  return (
    <SpeedDial
      ariaLabel="Owl Nest Navigation"
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        '& .MuiFab-primary': {
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
      }}
      icon={<MenuIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          slotProps={{
            tooltip: {
              open: true,
              title: action.name,
            },
          }}
          onClick={() => navigate(action.path)}
        />
      ))}
    </SpeedDial>
  );
};

export default NavSpeedDial;
