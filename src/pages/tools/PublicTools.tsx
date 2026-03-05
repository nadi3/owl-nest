import { Box, Typography } from '@mui/material';
import { PageHeader } from '@/components/common/PageHeader.tsx';
import { NestCard } from '@/components/common/NestCard.tsx';
import { NestButton } from '@/components/common/NestButton.tsx';
import { getPublicTools } from '@/services/tools/toolsService.ts';
import { useTranslation } from 'react-i18next';
import { ChevronRightIcon, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PublicTools = () => {
  const { t } = useTranslation();
  const tools = getPublicTools();
  const navigate = useNavigate();

  return (
    <Box>
      <PageHeader zone="02" title={t('tools.title')} description={t('tools.desc')} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {tools.map((tool) => (
          <Box key={tool.id}>
            <NestCard title={t(tool.titleKey)} subtitle={t(tool.subtitleKey)}>
              <Typography variant="body2" sx={{ mb: 3 }}>
                {t(tool.descriptionKey)}
              </Typography>
              <NestButton
                nestVariant={tool.disabled ? 'ghost' : 'contained'}
                startIcon={tool.disabled ? <Clock size={18} /> : <ChevronRightIcon size={18} />}
                disabled={tool.disabled}
                onClick={() => !tool.disabled && navigate(tool.path)}
              >
                {tool.disabled ? t('tools.disabled') : t('tools.enabled')}
              </NestButton>
            </NestCard>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PublicTools;
