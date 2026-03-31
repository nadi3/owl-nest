import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField, Stack, Typography } from '@mui/material';
import { FullscreenIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

import { NestButton } from '@/components/common/NestButton.tsx';
import { NestCard } from '@/components/common/NestCard.tsx';
import ChoiceManager from '@/components/tools/ChoiceManager.tsx';
import WheelCanvas from '@/components/tools/WheelCanvas.tsx';
import { useWheelStore } from '@/store/tools/useWheelStore.ts';
import { ToolLayout } from '@/layouts/ToolLayout.tsx';
import { PageSEO } from '@/components/common/PageSEO.tsx';

const WheelOfDestiny: React.FC = () => {
  const { t } = useTranslation();
  const { title, choices, isSpinning, setIsSpinning, updateTitle } = useWheelStore();
  const [rotation, setRotation] = useState(0);
  const wheelContainerRef = useRef<HTMLDivElement>(null);

  // UI State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [winner, setWinner] = useState<string | null>(null);

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
      document.exitFullscreen().catch((e) => console.error(e));
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

  const activeChoices = choices
    .map((choice) => ({ ...choice, isActive: choice.isActive }))
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

  const configPanel = (
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
          startIcon={<FullscreenIcon size={20} />}
          onClick={toggleFullScreen}
        >
          {isFullscreen ? t('tools.wheel.exit_fullscreen') : t('tools.wheel.fullscreen')}
        </NestButton>
      </Stack>
    </NestCard>
  );

  return (
    <ToolLayout
      infoTitle={t('tools.wheel.info_title')}
      infoText={t('tools.wheel.info_text')}
      configContent={configPanel}
      toolContainerRef={wheelContainerRef}
    >
      <PageSEO titleKey={'seo.tools_wheel.title'} descriptionKey={'seo.tools_wheel.description'} />

      {showConfetti && (
        <Confetti
          width={containerSize.width}
          height={containerSize.height}
          recycle={false}
          numberOfPieces={600}
          gravity={0.7}
          onConfettiComplete={() => setShowConfetti(false)}
          style={{ position: isFullscreen ? 'fixed' : 'absolute', top: 0, left: 0 }}
        />
      )}

      {(isFullscreen || title) && (
        <Typography
          component={motion.h3}
          layout
          variant={isFullscreen ? 'h2' : 'h3'}
          sx={{
            mb: isFullscreen ? 2 : 4,
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'none',
            letterSpacing: 'normal',
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
      )}

      <Box
        component={motion.div}
        layout
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: isFullscreen ? '65vmin' : '500px',
          aspectRatio: '1 / 1',
          margin: '0 auto',
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
            top: -10,
            zIndex: 10,
            filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))',
          }}
        />

        <Box
          sx={{
            transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0, 0, 1)' : 'none',
            transform: `rotate(${rotation}deg)`,
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.15))',
          }}
        >
          <WheelCanvas choices={choices} rotation={0} />
        </Box>

        {!isSpinning && (
          <NestButton
            nestColor="primary"
            onClick={handleSpin}
            disabled={choices.filter((c) => c.isActive).length < 2}
            sx={{
              position: 'absolute',
              width: isFullscreen ? 140 : 100,
              height: isFullscreen ? 140 : 100,
              borderRadius: '50%',
              fontSize: isFullscreen ? '1.5rem' : '1.2rem',
              p: 0,
              boxShadow: 6,
              '&:hover': { boxShadow: 8, transform: 'scale(1.05)' },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {t('tools.wheel.spin')}
          </NestButton>
        )}
      </Box>

      <Typography
        component={motion.h4}
        layout
        variant="h4"
        sx={{
          mt: 4,
          color: 'primary.main',
          fontWeight: 'bold',
          textAlign: 'center',
          minHeight: '2.5rem',
          opacity: winner && !isSpinning ? 1 : 0,
          transform: winner && !isSpinning ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.3s ease',
        }}
      >
        {winner && `${winner} !`}
      </Typography>
    </ToolLayout>
  );
};

export default WheelOfDestiny;
