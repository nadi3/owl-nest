import { Typography, Container, Grid } from '@mui/material';
import { AcademicCard } from '../components/AcademicCard';
import { Sparkles } from 'lucide-react';

export const Useless = () => (
  <Container maxWidth="lg">
    <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
      Lab des Inutilités
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <AcademicCard title="Zone Expérimentale" severity="primary">
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            C'est ici que seront stockés les gadgets React et les animations sans but précis.{' '}
            <Sparkles size={18} />
          </Typography>
        </AcademicCard>
      </Grid>
    </Grid>
  </Container>
);
