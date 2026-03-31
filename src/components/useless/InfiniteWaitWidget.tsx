import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Stack, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NestButton } from '@/components/common/NestButton';
import { getWaitMessage } from '@/services/useless/waitMessageService';
import { getGlobalRecord, saveNewRecord } from '@/services/useless/infiniteWaitService.ts';

/**
 * @file InfiniteWaitWidget.tsx
 * @description A "useless" component that challenges users to hold a button for as long as possible.
 */

/**
 * A component that implements a "hold the button" game.
 *
 * This widget challenges users to press and hold a button for as long as they can.
 * It tracks the elapsed time, displays encouraging (or discouraging) messages,
 * and saves the user's time as a new global record if they beat the previous one.
 *
 * The component features:
 * - A large, circular button to press and hold.
 * - A timer that displays the current hold time.
 * - A progress bar that fills up asymptotically, representing "infinite" progress.
 * - A message area that shows different phrases based on the hold duration.
 * - A display for the current global record.
 *
 * State is managed locally using `useState` and `useRef`, and the global record
 * is handled via services that interact with `localStorage`.
 *
 * @component
 * @returns {React.ReactElement} The rendered infinite wait widget.
 */
export const InfiniteWaitWidget: React.FC = (): React.ReactElement => {
  const [currentMessage, setCurrentMessage] = useState('');

  const { t } = useTranslation();
  const [isPressing, setIsPressing] = useState(false);
  const [time, setTime] = useState(0);
  const [record, setRecord] = useState(getGlobalRecord());
  const timerRef = useRef<number | null>(null);

  const isNewRecord = time > record.seconds && record.seconds > 0;

  /**
   * `useEffect` hook to manage the timer and record-saving logic.
   *
   * When the `isPressing` state becomes true, it starts an interval timer that:
   * - Increments the `time` state every 100ms.
   * - Fetches and displays a new message based on the elapsed time.
   *
   * When `isPressing` becomes false (on mouse up/leave), it:
   * - Clears the interval.
   * - Saves the current time as a new record if it's higher than the existing one.
   * - Resets the timer and message.
   *
   * The cleanup function ensures the timer is cleared if the component unmounts.
   */
  useEffect(() => {
    if (isPressing) {
      timerRef.current = globalThis.setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 0.1;
          const msg = getWaitMessage(newTime, t);
          if (msg) setCurrentMessage(msg);
          return newTime;
        });
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        saveNewRecord(time);
        setRecord(getGlobalRecord());
      }
      setTime(0);
      setCurrentMessage('');
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPressing, t]);

  /**
   * Calculates the progress for the `LinearProgress` bar.
   * The progress is calculated using an asymptotic function `(1 - e^(-t/60)) * 100`,
   * which means it will approach 100% but never quite reach it, reinforcing the
   * "infinite" nature of the wait.
   * @type {number}
   */
  const progress: number = isPressing ? (1 - Math.exp(-time / 60)) * 100 : 0;

  return (
    <Stack spacing={4} alignItems="center" sx={{ py: 4 }}>
      <Typography variant="body1" textAlign="center">
        {isNewRecord
          ? t('useless.wait-button.new_record_warning')
          : t('useless.wait-button.global_record', { time: record.seconds.toFixed(1) })}
      </Typography>

      <Box sx={{ width: '80%', position: 'relative' }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 20, borderRadius: 10 }}
        />
        <Typography variant="caption" sx={{ position: 'absolute', right: 0, mt: 1 }}>
          {t('useless.wait-button.infinite_progress')}
        </Typography>
      </Box>
      <Typography
        variant="h6"
        color="secondary"
        textAlign="center"
        sx={{
          minHeight: '4em',
          fontWeight: 500,
          fontStyle: 'italic',
          transition: 'opacity 0.3s ease',
        }}
      >
        {isPressing ? `"${currentMessage}"` : t('useless.wait-button.ready')}
      </Typography>

      <Typography variant="h2" sx={{ fontWeight: 800, color: 'primary.main' }}>
        {time.toFixed(1)}s
      </Typography>

      <NestButton
        nestVariant="contained"
        onMouseDown={() => setIsPressing(true)}
        onMouseUp={() => setIsPressing(false)}
        onMouseLeave={() => setIsPressing(false)}
        onTouchStart={() => setIsPressing(true)}
        onTouchEnd={() => setIsPressing(false)}
        sx={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          fontSize: '1.2rem',
          userSelect: 'none',
        }}
      >
        {isPressing ? t('useless.wait-button.hold') : t('useless.wait-button.start')}
      </NestButton>
    </Stack>
  );
};
