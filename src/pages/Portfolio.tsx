import { Box, Typography, Stack } from '@mui/material';
import { PageHeader } from '@/components/common/PageHeader';
import { NestCard } from '@/components/common/NestCard';
import { getPortfolio } from '@/services/portfolioService';
import { useTranslation } from 'react-i18next';

const Portfolio = () => {
  const { t } = useTranslation();
  const projects = getPortfolio();

  return (
    <Box>
      <PageHeader zone="03" title={t('portfolio.title')} description={t('portfolio.desc')} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {projects.map((project) => (
          <Box
            key={project.id}
            sx={{ gridColumn: project.fullWidth ? { xs: 1, md: '1 / -1' } : 'auto' }}
          >
            <NestCard title={t(project.titleKey)} subtitle={t(project.subtitleKey)}>
              <Stack spacing={2}>
                <Typography variant="body2">{t(project.descriptionKey)}</Typography>
              </Stack>
            </NestCard>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Portfolio;
