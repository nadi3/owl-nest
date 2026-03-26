import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, TextField, Stack, Typography, IconButton, Tooltip, Paper } from '@mui/material';
import { FullscreenIcon, Settings, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { NestButton } from '@/components/common/NestButton.tsx';
import { NestCard } from '@/components/common/NestCard.tsx';
import ChoiceManager from '@/components/tools/ChoiceManager.tsx';
import WheelCanvas from '@/components/tools/WheelCanvas.tsx';
import { useWheelStore } from '@/store/tools/useWheelStore.ts';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const WheelOfDestiny: React.FC = () => {
  const { t } = useTranslation();
  const { title, choices, isSpinning, setIsSpinning, updateTitle } = useWheelStore();
  const [rotation, setRotation] = useState(0);
  const wheelContainerRef = useRef<HTMLDivElement>(null);

  // UI State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showConfig, setShowConfig] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    if (wheelContainerRef.current) {
      setContainerSize({
        width: wheelContainerRef.current.clientWidth,
        height: wheelContainerRef.current.clientHeight,
      });
    }
  }, [isFullscreen, showConfig]);

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

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        width: '100%',
        minHeight: '100vh',
        pt: { xs: 8, md: 4 },
        pb: 8,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 3 } }}>
        {/* Toolbar */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ mb: 4 }}
          component={motion.div}
          variants={itemVariants}
        >
          <Tooltip title={t('tools.wheel.toggle_info')}>
            <IconButton
              onClick={() => setShowInfo(!showInfo)}
              color={showInfo ? 'primary' : 'default'}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
            >
              <Info size={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('tools.wheel.toggle_config')}>
            <IconButton
              onClick={() => setShowConfig(!showConfig)}
              color={showConfig ? 'primary' : 'default'}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
            >
              <Settings size={20} />
            </IconButton>
          </Tooltip>
        </Stack>

        <AnimatePresence>
          {showInfo && (
            <Box
              component={motion.div}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              sx={{ overflow: 'hidden', mb: 4 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" color="primary.main" gutterBottom>
                  {t('tools.wheel.info_title')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('tools.wheel.info_text')}
                </Typography>
              </Paper>
            </Box>
          )}
        </AnimatePresence>

        <Grid container spacing={4}>
          <AnimatePresence mode="popLayout">
            {showConfig && (
              <Grid
                size={{ xs: 12, md: 5 }}
                component={motion.div}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
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
                      {isFullscreen
                        ? t('tools.wheel.exit_fullscreen')
                        : t('tools.wheel.fullscreen')}
                    </NestButton>
                  </Stack>
                </NestCard>
              </Grid>
            )}
          </AnimatePresence>

          <Grid
            size={{ xs: 12, md: showConfig ? 7 : 12 }}
            ref={wheelContainerRef}
            component={motion.div}
            layout
            variants={itemVariants}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              minHeight: '60vh',
              borderRadius: 4,
              transition: 'background-color 0.3s ease',
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
                style={{ position: isFullscreen ? 'fixed' : 'absolute', top: 0, left: 0 }}
              />
            )}

            {(isFullscreen || title) && (
              <Typography
                component={motion.h3}
                layout
                variant={isFullscreen ? 'h1' : 'h3'}
                sx={{
                  mb: 4,
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
                width: isFullscreen ? '70vmin' : showConfig ? '100%' : '60vmin',
                maxWidth: '600px',
                height: isFullscreen ? '70vmin' : 'auto',
                aspectRatio: '1 / 1',
                transition: 'width 0.3s ease',
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
                    '&:hover': {
                      boxShadow: 8,
                      transform: 'scale(1.05)',
                    },
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WheelOfDestiny;
