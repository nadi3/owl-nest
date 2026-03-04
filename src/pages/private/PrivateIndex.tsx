import { Box, Typography, Stack, Paper } from '@mui/material';
import { PageHeader } from '@/components/common/PageHeader.tsx';
import { NestCard } from '@/components/common/NestCard.tsx';
import { Lock, ShieldCheck, BarChart3 } from 'lucide-react';
import { getPrivateServices } from '@/services/private/privateService.ts';
import { useTranslation } from 'react-i18next';
import { owlTheme } from '@/theme/theme.ts';

const iconMap = {
  lock: Lock,
  barChart: BarChart3,
  shieldCheck: ShieldCheck,
};

const PrivateIndex = () => {
  const { t } = useTranslation();
  const services = getPrivateServices();

  return (
    <Box>
      <PageHeader zone="04" title={t('private.title')} description={t('private.desc')} />

      <Box
        sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}
      >
        {services.map((service) => {
          const IconComponent = iconMap[service.icon];
          return (
            <Box key={service.id}>
              <NestCard title={t(service.titleKey)} subtitle={t(service.subtitleKey)}>
                <Stack spacing={2}>
                  <Typography variant="body2">{t(service.descriptionKey)}</Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <IconComponent size={16} style={{ opacity: 0.5 }} />
                  </Stack>
                </Stack>
              </NestCard>
            </Box>
          );
        })}
      </Box>

      <Paper sx={{ p: 3, backgroundColor: 'primary.main', color: 'white', borderRadius: 2 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <ShieldCheck size={32} color={owlTheme.palette.secondary.main} />
          <Box>
            <Typography variant="h6" color={'secondary'}>
              {t('private.protected.title')}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {t('private.protected.desc')}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default PrivateIndex;
