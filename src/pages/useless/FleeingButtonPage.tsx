import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/PageHeader';
import { FleeingElement } from '@/components/useless/FleeingElement.tsx';
import { useState } from 'react';

const FleeingButtonPage = () => {
  const { t } = useTranslation();
  const [score, setScore] = useState(0);

  return (
    <Box>
      <PageHeader
        zone="LAB"
        title={t('useless.items.fleeing-mouse.title')}
        description={t('useless.items.fleeing-mouse.description')}
      />

      <Paper
        variant="outlined"
        sx={{
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'background.paper',
          position: 'relative',
          cursor: 'crosshair',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            textAlign: 'right',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <Typography
            variant="caption"
            sx={{ display: 'block', fontWeight: 800, color: 'text.disabled' }}
          >
            {t('useless.fleeing-mouse.score')}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 900,
              color: 'secondary.main',
            }}
          >
            {score.toString().padStart(2, '0')}
          </Typography>
        </Box>
        <FleeingElement onCatch={() => setScore((prev) => prev + 1)} />
      </Paper>
    </Box>
  );
};

export default FleeingButtonPage;
