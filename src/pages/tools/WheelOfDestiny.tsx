import { Button, Box, Grid, TextField, Stack, Typography } from '@mui/material';
import { FullscreenIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Confetti from 'react-confetti';
import { NestButton } from '@/components/common/NestButton.tsx';
import { NestCard } from '@/components/common/NestCard.tsx';
import { PageHeader } from '@/components/common/PageHeader.tsx';
import ChoiceManager from '@/components/tools/ChoiceManager.tsx';
import WheelCanvas from '@/components/tools/WheelCanvas.tsx';
import { useWheelStore } from '@/store/tools/useWheelStore.ts';

const WheelOfDestiny: React.FC = () => {
  const { t } = useTranslation();
  const { title, choices, isSpinning, setIsSpinning, updateTitle } = useWheelStore();
  const [rotation, setRotation] = useState(0);
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (wheelContainerRef.current) {
      setContainerSize({
        width: wheelContainerRef.current.clientWidth,
        height: wheelContainerRef.current.clientHeight,
      });
    }
  }, [isFullscreen]);

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((e) => console.error(e));
    } else {
      wheelContainerRef.current?.requestFullscreen();
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (wheelContainerRef.current) {
        setTimeout(() => {
          setContainerSize({
            width: wheelContainerRef.current!.clientWidth,
            height: wheelContainerRef.current!.clientHeight,
          });
        }, 100);
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const [winner, setWinner] = useState<string | null>(null);
  const activeChoices = choices
    .map((choice) => ({
      ...choice,
      isActive: choice.isActive,
    }))
    .filter((choice) => choice.isActive);

  const handleSpin = () => {
    if (isSpinning || activeChoices.length < 2) return;

    setShowConfetti(false);
    setIsSpinning(true);
    setWinner(null);

    const extraDegrees = Math.floor(Math.random() * 360);
    const spins = 5 + Math.floor(Math.random() * 5);
    const newRotation = rotation + spins * 360 + extraDegrees;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);

      const segmentAngle = 360 / activeChoices.length;
      const normalizedRotation = newRotation % 360;
      const winnerIndex = Math.floor(((270 - normalizedRotation + 360) % 360) / segmentAngle);

      setWinner(activeChoices[winnerIndex].text);
      setShowConfetti(true);
    }, 4000);
  };

  return (
    <Box>
      <PageHeader
        title={t('tools.wheel.title')}
        zone={'02'}
        description={t('tools.wheel.subtitle')}
      />
      <Grid container spacing={3}>
        <Grid size={4}>
          <NestCard title={t('tools.wheel.config')}>
            <Stack spacing={2}>
              <TextField
                label={t('tools.wheel.wheel_name')}
                fullWidth
                value={title}
                onChange={(e) => updateTitle(e.target.value)}
              />
              <ChoiceManager />
              <NestButton
                nestColor="secondary"
                fullWidth
                startIcon={<FullscreenIcon />}
                onClick={toggleFullScreen}
              >
                {isFullscreen ? t('tools.wheel.exit_fullscreen') : t('tools.wheel.fullscreen')}
              </NestButton>
            </Stack>
          </NestCard>
        </Grid>
        <Grid
          size={6}
          ref={wheelContainerRef}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            '&:fullscreen': {
              backgroundColor: 'background.default',
              width: '100vw',
              height: '100vh',
              padding: 4,
            },
          }}
        >
          {showConfetti && (
            <Confetti
              width={containerSize.width}
              height={containerSize.height}
              recycle={false}
              numberOfPieces={600}
              gravity={0.7}
              onConfettiComplete={() => setShowConfetti(false)}
            />
          )}
          {(isFullscreen || title) && (
            <Typography
              variant={isFullscreen ? 'h1' : 'h3'}
              sx={{
                mb: 4,
                fontWeight: 'bold',
                textAlign: 'center',
                textTransform: 'none',
                letterSpacing: 'normal',
              }}
            >
              {title}
            </Typography>
          )}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isFullscreen ? '70vmin' : '100%',
              height: isFullscreen ? '70vmin' : 'auto',
              aspectRatio: '1 / 1',
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: (theme) => `25px solid ${theme.palette.primary.main}`,
                position: 'absolute',
                top: 0,
                zIndex: 10,
              }}
            />
            <Box
              sx={{
                transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0, 0, 1)' : 'none',
                transform: `rotate(${rotation}deg)`,
                width: '100%',
                height: '100%',
              }}
            >
              <WheelCanvas choices={choices} rotation={0} />
            </Box>

            {!isSpinning && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSpin}
                disabled={choices.filter((c) => c.isActive).length < 2}
                sx={{
                  position: 'absolute',
                  width: isFullscreen ? 160 : 120,
                  height: isFullscreen ? 160 : 120,
                  borderRadius: '50%',
                  fontSize: isFullscreen ? '1.5rem' : '1.2rem',
                  p: 0,
                  boxShadow: 6,
                  '&:hover': {
                    boxShadow: 8,
                  },
                }}
              >
                {t('tools.wheel.spin')}
              </Button>
            )}
          </Box>

          <Typography
            variant="h4"
            sx={{
              mt: 2,
              color: 'primary.main',
              fontWeight: 'bold',
              textAlign: 'center',
              minHeight: '2.5rem', // Reserve space
              visibility: winner && !isSpinning ? 'visible' : 'hidden',
            }}
          >
            {winner && `${winner} !`}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WheelOfDestiny;
