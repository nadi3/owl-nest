import { Button, Typography, Container, Stack } from '@mui/material';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { AcademicCard } from '../components/AcademicCard';

export const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <AcademicCard title="Accès Privé" severity="primary">
        <Stack spacing={3} sx={{ py: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Cette zone nécessite une authentification. Appuyez sur le bouton pour simuler une
            connexion.
          </Typography>
          <Button variant="contained" size="large" onClick={handleLogin} fullWidth>
            Se connecter
          </Button>
        </Stack>
      </AcademicCard>
    </Container>
  );
};
