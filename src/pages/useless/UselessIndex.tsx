import { Box, Typography } from '@mui/material';
import { PageHeader } from '@/components/common/PageHeader.tsx';
import { NestCard } from '@/components/common/NestCard.tsx';
import { NestButton } from '@/components/common/NestButton.tsx';
import { Clock, ChevronRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUselessWidgets } from '@/services/useless/uselessService.ts';
import { useTranslation } from 'react-i18next';

const UselessIndex = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const widgets = getUselessWidgets();

  return (
    <Box>
      <PageHeader zone="01" title={t('useless.title')} description={t('useless.desc')} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
        {widgets.map((widget) => {
          return (
            <Box key={widget.id}>
              <NestCard title={t(widget.titleKey)} subtitle={t(widget.subtitleKey)}>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  {t(widget.descriptionKey)}
                </Typography>
                <NestButton
                  nestVariant={widget.disabled ? 'ghost' : 'contained'}
                  startIcon={widget.disabled ? <Clock size={18} /> : <ChevronRightIcon size={18} />}
                  onClick={() => navigate(widget.path)}
                  disabled={widget.disabled}
                >
                  {widget.disabled ? t('useless.disabled') : t('useless.enabled')}
                </NestButton>
              </NestCard>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default UselessIndex;
