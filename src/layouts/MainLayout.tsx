/**
 * @file MainLayout.tsx
 * @description The main layout component for the application, providing a consistent
 * structure with navigation, content area, and a footer.
 */

import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/common/Footer.tsx';
import i18n from 'i18next';
import { useKonamiCode } from '@/hooks/useKonamiCode.ts';
import NavSpeedDial from '@/components/common/NavSpeedDial.tsx';
import SettingsSpeedDial from '@/components/common/SettingsSpeedDial.tsx'; //

/**
 * The primary layout component for the application.
 *
 * This component establishes the main structure of most pages, including:
 * - A main content area that renders the current route's component via `<Outlet />`.
 * - A persistent `Footer` at the bottom of the page.
 * - Floating `NavSpeedDial` and `SettingsSpeedDial` components for global navigation and settings.
 * - A scroll-snapping container for a smooth, section-based scrolling experience.
 *
 * It also includes an Easter egg that activates a "glitched" visual mode when the
 * Konami Code is entered, which is handled by the `useKonamiCode` hook.
 *
 * @component
 * @returns {React.ReactElement} The rendered main layout structure.
 */
const MainLayout = (): React.ReactElement => {
  useKonamiCode(() => {
    i18n
      .changeLanguage('gl')
      .then((r) => console.log('Konami Code activated! Language switched to "gl".', r));
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
        <Box sx={{ scrollSnapAlign: 'start' }} />

        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>

        <Box sx={{ scrollSnapAlign: 'end' }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
