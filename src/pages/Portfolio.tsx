import { Typography, Container, Stack } from '@mui/material';
import { AcademicCard } from '../components/AcademicCard';

export const Portfolio = () => (
  <Container sx={{ py: 6 }}>
    <Typography variant="h3" sx={{ mb: 4 }}>
      Mes Projets
    </Typography>
    <AcademicCard title="Concept Owl Nest" severity="primary">
      <Typography variant="body1">
        Owl Nest est conçu comme un hub personnel académique et technique. L'objectif est de
        centraliser mes services auto-hébergés tout en servant de vitrine technologique propre,
        rigoureuse et moderne.
      </Typography>
    </AcademicCard>
  </Container>
);
