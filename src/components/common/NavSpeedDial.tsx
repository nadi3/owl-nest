import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ScienceIcon from '@mui/icons-material/Science';
import BuildIcon from '@mui/icons-material/Build';
import WorkIcon from '@mui/icons-material/Work';
import { MenuIcon } from 'lucide-react';

/**
 * A floating speed dial component for minimalist navigation.
 * It replaces a traditional sidebar and provides quick access to the main sections of the application.
 *
 * The component displays a main floating action button (FAB) that, when clicked, reveals a set of navigation actions.
 * Each action is represented by an icon and a tooltip, and navigates to a specific route upon being clicked.
 *
 * The navigation actions are:
 * - **Home**: Navigates to the homepage.
 * - **Lab**: Navigates to the "useless" or experimental section.
 * - **Tools**: Navigates to the tools page.
 * - **Portfolio**: Navigates to the portfolio page.
 *
 * The component is positioned at the bottom-right of the screen.
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
