import React from 'react';
import { Snackbar, Alert, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useImpatienceStore } from '@/store/useless/useImpatienceStore.ts';

export const ImpatiencePopup: React.FC = () => {
  const { t } = useTranslation();
  const { isImpatienceDetected, setImpatienceDetected } = useImpatienceStore();

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setImpatienceDetected(false);
  };

  return (
    <Snackbar
      open={isImpatienceDetected}
      autoHideDuration={60000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity="warning"
        variant="filled"
        sx={{ width: '100%', bgcolor: 'warning.main', color: 'warning.contrastText' }}
      >
        <Typography variant="body1" fontWeight="bold">
          {t('useless.impatience.title')}
        </Typography>
        {t('useless.impatience.message')}
      </Alert>
    </Snackbar>
  );
};
