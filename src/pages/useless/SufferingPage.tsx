import React from 'react';
import { Box } from '@mui/material';
import { SufferingButton } from '../../components/useless/SufferingButton';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/PageHeader.tsx';

/**
 * Page dedicated to the "Suffering Button" experiment.
 * It provides a constrained playground for the button to move.
 */
const SufferingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <PageHeader
        title={t('useless.suffering.title')}
        zone={'LAB'}
        description={t('useless.suffering.description')}
      />

      <SufferingButton />
    </Box>
  );
};

export default SufferingPage;
