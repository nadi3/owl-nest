import React, { useState, useEffect } from 'react';
import { Box, Tooltip, Typography, Stack, IconButton } from '@mui/material';
import { Info } from 'lucide-react';
import { percentToHex, getTimeProgress } from '@/utils/useless/timeUtils.ts';
import { useTranslation } from 'react-i18next';

/**
 * @file TimeProgressWidget.tsx
 * @description A "useless" widget that displays the progress of various time units (year, month, day, etc.)
 * as vertical progress bars.
 */

/**
 * A component that renders a single vertical progress bar with a label.
 *
 * This component is used by `TimeProgressWidget` to display the progress of a
 * specific time unit. It includes a `Tooltip` to show the exact percentage on hover.
 * The color of the progress bar changes dynamically from green to red as it fills up.
 *
 * @component
 * @param {{label: string, percent: number}} props - The props for the component.
 * @param {string} props.label - The label to display above the progress bar.
 * @param {number} props.percent - The progress percentage (0-100).
 * @returns {React.ReactElement} The rendered progress bar component.
 */
const ProgressBar = ({
  label,
  percent,
}: {
  label: string;
  percent: number;
}): React.ReactElement => (
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

/**
 * A widget that displays the passage of time through a series of vertical progress bars.
 *
 * This component visualizes the progress of the current year, month, day, hour, and minute.
 * Each time unit is represented by a `ProgressBar` component. The data is updated every
 * second to provide a real-time (and somewhat existential) view of time passing.
 *
 * The component uses a `useEffect` hook to set up an interval that calls `getTimeProgress`
 * to refresh the data.
 *
 * @component
 * @returns {React.ReactElement} The rendered time progress widget.
 */
export const TimeProgressWidget = (): React.ReactElement => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(getTimeProgress());

  /**
   * `useEffect` hook to set up a timer that updates the time progress every second.
   * The cleanup function clears the interval when the component unmounts to prevent memory leaks.
   */
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
