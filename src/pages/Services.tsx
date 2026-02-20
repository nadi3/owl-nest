import { Typography, Container, Grid } from '@mui/material';
import { AcademicCard } from '../components/AcademicCard';
import { Globe } from 'lucide-react';

export const Services = () => (
  <Container maxWidth="lg">
    <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
      Services Publics
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <AcademicCard title="Services Online" severity="success">
          <Typography variant="body1">
            Répertoire des outils et services hébergés sur le nid, accessibles sans
            authentification.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
            Aucun service actif pour le moment.
          </Typography>
        </AcademicCard>
      </Grid>
    </Grid>
  </Container>
);
