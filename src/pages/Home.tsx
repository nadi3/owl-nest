import { Box, Typography, Container } from '@mui/material';
import { Construction } from 'lucide-react';

export const Home = () => (
  <Container sx={{ py: 10, textAlign: 'center' }}>
    <Box sx={{ color: 'primary.main', mb: 3 }}>
      <Construction size={80} />
    </Box>
    <Typography variant="h2" gutterBottom>
      Site en construction
    </Typography>
    <Typography variant="body1" color="text.secondary">
      L'architecte peaufine les plans. Revenez bientôt pour découvrir le nid.
    </Typography>
  </Container>
);
