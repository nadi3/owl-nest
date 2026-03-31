import React from 'react';
import { Snackbar, Alert, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useImpatienceStore } from '@/store/useless/useImpatienceStore.ts';

/**
 * @file ImpatiencePopup.tsx
 * @description A "useless" component that displays a warning popup when user impatience is detected.
 */

/**
 * A component that renders a `Snackbar` with a warning message when user
 * impatience is detected by the `useImpatienceDetector` hook.
 *
 * This component subscribes to the `useImpatienceStore` to know when to show
 * itself. The popup is designed to be a humorous interruption, warning the user
 * about their "impatient" behavior (e.g., rapid clicking).
 *
 * The popup automatically hides after a long duration (60 seconds) or can be
 * dismissed by the user.
 *
 * @component
 * @returns {React.ReactElement} The rendered Snackbar component.
 */
export const ImpatiencePopup: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const { isImpatienceDetected, setImpatienceDetected } = useImpatienceStore();

  /**
   * Handles the closing of the Snackbar.
   * It sets the `isImpatienceDetected` state to false, hiding the popup.
   * The function prevents closing the Snackbar when the user clicks away.
   *
   * @param {React.SyntheticEvent | Event} [_] - The event that triggered the close (unused).
   * @param {string} [reason] - The reason for the close event.
   */
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
