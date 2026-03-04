import { useState, useEffect } from 'react';
import { Box, Tooltip, Typography, Stack, IconButton } from '@mui/material';
import { Info } from 'lucide-react';
import { percentToHex, getTimeProgress } from '@/utils/useless/timeUtils.ts';
import { useTranslation } from 'react-i18next';

const ProgressBar = ({ label, percent }: { label: string; percent: number }) => (
  <Tooltip title={`${label}: ${percent.toFixed(2)}%`} placement="left" arrow>
    <Box
      sx={{
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        cursor: 'default',
      }}
    >
      <Typography variant="caption" sx={{ fontSize: '0.6rem', opacity: 0.6, fontWeight: 700 }}>
        {label}
      </Typography>
      <Box
        sx={{
          flex: 1,
          width: '4px',
          backgroundColor: 'rgba(0,0,0,0.05)',
          borderRadius: '2px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: `${percent}%`,
            backgroundColor: percentToHex(percent),
            transition: 'height 1s linear, background-color 1s linear',
          }}
        />
      </Box>
    </Box>
  </Tooltip>
);

export const TimeProgressWidget = () => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(getTimeProgress());

  useEffect(() => {
    const timer = setInterval(() => setProgress(getTimeProgress()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Stack
      spacing={2}
      sx={{
        p: 2,
        height: '100%',
        borderLeft: '1px solid',
        borderColor: 'divider',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <Tooltip title={t('useless.hex-clock.tooltip')} arrow placement="left">
          <IconButton size="small" sx={{ opacity: 0.4 }}>
            <Info size={12} />
          </IconButton>
        </Tooltip>
      </Box>

      <ProgressBar label={t('useless.hex-clock.labels.year')} percent={progress.yearProgress} />
      <ProgressBar label={t('useless.hex-clock.labels.month')} percent={progress.monthProgress} />
      <ProgressBar label={t('useless.hex-clock.labels.day')} percent={progress.dayProgress} />
      <ProgressBar label={t('useless.hex-clock.labels.hour')} percent={progress.hourProgress} />
      <ProgressBar label={t('useless.hex-clock.labels.minute')} percent={progress.minProgress} />
    </Stack>
  );
};
