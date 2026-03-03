import { Box, Typography } from '@mui/material';
import { PageHeader } from '@/components/common/PageHeader';
import { NestCard } from '@/components/common/NestCard';
import { NestButton } from '@/components/common/NestButton';
import { getPublicServices } from '@/services/publicService';
import { useTranslation } from 'react-i18next';
import { ChevronRightIcon, Clock } from 'lucide-react';

const PublicServices = () => {
  const { t } = useTranslation();
  const services = getPublicServices();

  return (
    <Box>
      <PageHeader zone="02" title={t('services.title')} description={t('services.desc')} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {services.map((service) => (
          <Box key={service.id}>
            <NestCard title={t(service.titleKey)} subtitle={t(service.subtitleKey)}>
              <Typography variant="body2" sx={{ mb: 3 }}>
                {t(service.descriptionKey)}
              </Typography>
              <NestButton
                nestVariant={service.disabled ? 'ghost' : 'contained'}
                startIcon={service.disabled ? <Clock size={18} /> : <ChevronRightIcon size={18} />}
                disabled={service.disabled}
              >
                {service.disabled ? t('services.disabled') : t('services.enabled')}
              </NestButton>
            </NestCard>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PublicServices;
