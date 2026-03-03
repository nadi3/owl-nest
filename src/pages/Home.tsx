import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NestCard } from '@/components/common/NestCard';
import { useTheme } from '@mui/material/styles';
import { PageHeader } from '@/components/common/PageHeader.tsx';

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sections = [
    { title: 'useless.title', desc: 'useless.desc', path: '/useless' },
    { title: 'services.title', desc: 'services.desc', path: '/services' },
    { title: 'portfolio.title', desc: 'portfolio.desc', path: '/portfolio' },
    { title: 'private.title', desc: 'private.desc', path: '/private' },
  ];

  return (
    <Box>
      <PageHeader title={t('title')} zone={'HOME'} description={t('home.subtitle')} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 4,
        }}
      >
        {sections.map((section) => (
          <Box
            key={section.title}
            onClick={() => navigate(section.path)}
            sx={{ cursor: 'pointer' }}
          >
            <NestCard title={t(section.title)} accentColor={theme.palette.secondary.main}>
              <Typography variant="body2" color="text.secondary">
                {t(section.desc)}
              </Typography>
            </NestCard>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
