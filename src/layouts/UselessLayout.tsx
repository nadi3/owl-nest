import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { TimeProgressWidget } from '@/components/useless/TimeProgressWidget';

const UselessLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1, height: '100%' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4 }}>
        <Outlet />
      </Box>
      <Box sx={{ width: '60px', flexShrink: 0 }}>
        <TimeProgressWidget />
      </Box>
    </Box>
  );
};

export default UselessLayout;
