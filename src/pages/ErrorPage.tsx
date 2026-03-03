import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NestButton } from '@/components/common/NestButton.tsx';
import { owlTheme } from '@/theme/theme.ts';

interface ErrorPageProps {
  code?: string;
}

const ErrorPage = ({ code = '404' }: ErrorPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', py: 10 }}>
      <AlertTriangle
        size={64}
        color={owlTheme.palette.secondary.main}
        style={{ marginBottom: '24px' }}
      />
      <PageHeader
        zone={`ERR_${code}`}
        title={t(`errors.${code}.title`)}
        description={t(`errors.${code}.message`)}
        center={true}
      />
      <NestButton nestVariant="ghost" nestColor={'secondary'} onClick={() => navigate('/')}>
        {t('errors.back')}
      </NestButton>
    </Box>
  );
};

export default ErrorPage;
