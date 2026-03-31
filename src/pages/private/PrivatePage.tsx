import { Box, Typography, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const PrivatePage = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Stack spacing={4} alignItems="center" sx={{ textAlign: 'center' }}>
        <Box
          component="img"
          src="/storyset/Work-in-progress-amico.svg"
          sx={{ width: '100%', maxWidth: 600, height: 'auto', filter: 'grayscale(0.5)' }}
        />
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {t('private.wip.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('private.wip.subtitle')}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};
