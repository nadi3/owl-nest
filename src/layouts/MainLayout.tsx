import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/common/Footer.tsx';
import i18n from 'i18next';
import { useKonamiCode } from '@/hooks/useKonamiCode.ts';
import NavSpeedDial from '@/components/common/NavSpeedDial.tsx';
import SettingsSpeedDial from '@/components/common/SettingsSpeedDial.tsx'; //

const MainLayout = () => {
  useKonamiCode(() => {
    i18n.changeLanguage('gl');
  });

  const isGlitched = i18n.language === 'gl';

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        filter: isGlitched ? 'contrast(1.2) hue-rotate(45deg)' : 'none',
        transition: 'filter 0.5s ease',
        '& *': {
          fontFamily: isGlitched ? '"Courier New", monospace !important' : 'inherit',
        },
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 24,
          right: 24,
          zIndex: 1100,
        }}
      >
        <SettingsSpeedDial />
      </Box>
      <NavSpeedDial />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          backgroundColor: 'background.default',
        }}
      >
        <Outlet />
        <Box sx={{ scrollSnapAlign: 'end' }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
