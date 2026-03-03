import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/common/Footer.tsx';
import Sidebar from '@/components/common/Sidebar.tsx';

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflowY: 'auto',
          backgroundColor: 'background.default',
        }}
      >
        <Box
          sx={{
            p: { xs: 2, md: 4 },
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
