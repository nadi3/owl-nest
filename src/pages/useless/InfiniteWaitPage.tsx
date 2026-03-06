import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Stack, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NestCard } from '@/components/common/NestCard';
import { NestButton } from '@/components/common/NestButton';
import { getWaitMessage } from '@/services/useless/waitMessageService';
import { getGlobalRecord, saveNewRecord } from '@/services/useless/infiniteWaitService.ts';

const InfiniteWaitPage = () => {
  const [currentMessage, setCurrentMessage] = useState('');

  const { t } = useTranslation();
  const [isPressing, setIsPressing] = useState(false);
  const [time, setTime] = useState(0);
  const [record, setRecord] = useState(getGlobalRecord());
  const timerRef = useRef<number | null>(null);

  const isNewRecord = time > record.seconds && record.seconds > 0;

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

  const progress = isPressing ? (1 - Math.exp(-time / 60)) * 100 : 0;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <NestCard
        title={t('useless.items.wait-button.title')}
        subtitle={t('useless.items.wait-button.subtitle')}
      >
        <Stack spacing={4} alignItems="center" sx={{ py: 4 }}>
          <Typography variant="body1" textAlign="center">
            {isNewRecord
              ? t('useless.wait-button.new_record_warning')
              : t('useless.wait-button.global_record', { time: record.seconds.toFixed(1) })}
          </Typography>

          <Box sx={{ width: '100%', position: 'relative' }}>
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
      </NestCard>
    </Box>
  );
};

export default InfiniteWaitPage;
