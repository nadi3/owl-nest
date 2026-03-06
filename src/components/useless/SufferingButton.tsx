import React, { useState, useEffect } from 'react';
import { Box, keyframes, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { SufferingMan } from './SufferingMan';
import { SpeechBubble } from './SpeechBubble';
import { getSufferingColor, getSufferingText } from '@/utils/useless/sufferingLogic.ts';

const shake = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(-3px, 3px); }
  50% { transform: translate(3px, -3px); }
  75% { transform: translate(-3px, -3px); }
  100% { transform: translate(0, 0); }
`;

const ViolentExplosion = () => {
  const stemParticles = Array.from({ length: 60 });
  const capParticles = Array.from({ length: 180 });
  const groundParticles = Array.from({ length: 80 });

  return (
    <Box sx={{ position: 'relative', width: 0, height: 0 }}>
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: [0, 40, 60],
          opacity: [1, 0.8, 0],
          backgroundColor: ['#FFFFFF', '#FFFBEB', '#FEF3C7'],
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          width: 100,
          height: 100,
          borderRadius: '50%',
          boxShadow: '0 0 200px 100px #FFFFFF',
          transform: 'translate(-50%, -50%)',
          zIndex: 120,
        }}
      />

      {stemParticles.map((_, i) => (
        <motion.div
          key={`stem-${i}`}
          initial={{ x: 0, y: 0, scale: 0.5, opacity: 1 }}
          animate={{
            x: (Math.random() - 0.5) * 60,
            y: [0, -300 - Math.random() * 100],
            scale: [1, 6, 10],
            opacity: [1, 0.9, 0],
            backgroundColor: ['#EA580C', '#4B5563', '#1F2937', '#000000'][
              Math.floor(Math.random() * 4)
            ],
          }}
          transition={{
            duration: 2.2,
            ease: 'easeOut',
            delay: Math.random() * 0.4,
          }}
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            borderRadius: '50%',
            filter: 'blur(6px)',
            zIndex: 100,
          }}
        />
      ))}

      {capParticles.map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 250 + Math.random() * 350;
        return (
          <motion.div
            key={`cap-${i}`}
            initial={{ x: 0, y: -300, scale: 0, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * radius,
              y: -350 + Math.sin(angle) * (radius * 0.35) - Math.random() * 100,
              scale: [1, 12, 16],
              opacity: [1, 0.8, 0],
              backgroundColor: ['#B91C1C', '#7F1D1D', '#374151', '#111827', '#000000'][
                Math.floor(Math.random() * 5)
              ],
            }}
            transition={{
              duration: 3.2,
              ease: 'circOut',
              delay: 0.5 + Math.random(),
            }}
            style={{
              position: 'absolute',
              width: 35,
              height: 35,
              borderRadius: '50%',
              filter: 'blur(15px)',
              zIndex: 105,
            }}
          />
        );
      })}

      {groundParticles.map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 400 + Math.random() * 500;
        return (
          <motion.div
            key={`ground-${i}`}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * (distance * 0.15), // Onde de choc plate au sol
              scale: [1, 10],
              opacity: [1, 0],
            }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 25,
              height: 25,
              borderRadius: '50%',
              backgroundColor: '#9CA3AF',
              filter: 'blur(10px)',
              zIndex: 90,
            }}
          />
        );
      })}
    </Box>
  );
};

export const SufferingButton = () => {
  const { t } = useTranslation();
  const [clicks, setClicks] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [exploded, setExploded] = useState(false);
  const [isDead, setIsDead] = useState(false);

  const phrases = t('useless.suffering.phrases', { returnObjects: true }) as string[];
  const finalMessage = t('useless.suffering.final_message');

  const level = Math.floor(clicks / 10);
  const isShaking = clicks > 60;
  const size = Math.max(50, 180 - clicks);

  useEffect(() => {
    if (exploded) {
      const timer = setTimeout(() => setIsDead(true), 1800);
      return () => clearTimeout(timer);
    }
  }, [exploded]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (exploded) return;

    if (clicks >= phrases.length) {
      setExploded(true);
      return;
    }
    setClicks((c) => c + 1);
    setPos({
      x: 10 + Math.random() * 70,
      y: 20 + Math.random() * 60,
    });
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: 'absolute',
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        cursor: exploded ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translate(-50%, -50%)',
        transition: exploded ? 'none' : 'all 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        zIndex: 100,
      }}
    >
      <AnimatePresence mode="wait">
        {exploded ? (
          isDead ? (
            <motion.div
              key="dead"
              initial={{ y: 50, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.2 }}
            >
              <Typography
                sx={{ fontSize: '5rem', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))' }}
              >
                🪦
              </Typography>
            </motion.div>
          ) : (
            <motion.div key="exploding" style={{ position: 'relative', zIndex: 101 }}>
              <ViolentExplosion />
            </motion.div>
          )
        ) : (
          <motion.div
            key="alive"
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.1 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <SpeechBubble text={getSufferingText(clicks, phrases, finalMessage)} />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: isShaking ? `${shake} ${0.2 - clicks / 600}s infinite` : 'none',
              }}
            >
              <SufferingMan level={level} color={getSufferingColor(clicks)} size={size} />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
