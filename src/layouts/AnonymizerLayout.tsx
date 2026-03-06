import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader.tsx';

export const AnonymizerLayout = () => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default', pt: 4, pb: 8 }}>
      <Container maxWidth="lg">
        <PageHeader
          title={'Photo Anonymizer'}
          zone={'TOOLS'}
          description={
            'Floutez automatiquement les visages sur vos photos. Aucune donnée ne quitte votre navigateur.'
          }
        />
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
            overflow: 'hidden',
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};
