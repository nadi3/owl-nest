import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper, useTheme, IconButton, Typography, Card } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReplayIcon from '@mui/icons-material/Replay';

import { SufferingButton } from '@/components/useless/SufferingButton';
import { FleeingElement } from '@/components/useless/FleeingElement';
import { InfiniteWaitWidget } from '@/components/useless/InfiniteWaitWidget';
import { TimeProgressWidget } from '@/components/useless/TimeProgressWidget.tsx';
import { PageHeader } from '@/components/common/PageHeader.tsx';
import { NestButton } from '@/components/common/NestButton.tsx';
import { PageSEO } from '@/components/common/PageSEO.tsx';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const swipeVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  }),
};

const flipVariants: Variants = {
  front: {
    rotateY: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const a11yProps = (index: number) => ({
  id: `lab-tab-${index}`,
  'aria-controls': `lab-tabpanel-${index}`,
});

interface UselessInfoBackProps {
  titleKey: string;
  descKey: string;
  onBack: () => void;
}

const UselessInfoBack: React.FC<UselessInfoBackProps> = ({ titleKey, descKey, onBack }) => {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        p: 4,
        textAlign: 'center',
      }}
    >
      <PageSEO titleKey={'seo.useless.title'} descriptionKey={'seo.useless.description'} />

      <InfoOutlinedIcon color="primary" sx={{ fontSize: 60, opacity: 0.5 }} />
      <Box>
        <Typography variant="h5" color="primary" gutterBottom>
          {t(titleKey)}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
          {t(descKey)}
        </Typography>
      </Box>
      <NestButton nestVariant="ghost" startIcon={<ReplayIcon />} onClick={onBack} sx={{ mt: 2 }}>
        {t('common.back')}
      </NestButton>
    </Card>
  );
};

const UselessPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setIsFlipped(false);
    setDirection(newValue > activeTab ? 1 : -1);
    setActiveTab(newValue);
  };

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const tabConfig = [
    { component: <SufferingButton key="suffering" />, key: 'suffering' },
    { component: <FleeingElement key="fleeing" />, key: 'fleeing-mouse' },
    { component: <InfiniteWaitWidget key="infinite" />, key: 'wait-button' },
  ];

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        display: 'flex',
        height: '100vh',
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      {/* Left sidebar: Hex clock */}
      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{
          width: '80px',
          flexShrink: 0,
          borderRight: `1px solid ${theme.palette.divider}`,
          bgcolor: 'background.paper',
          display: { xs: 'none', sm: 'block' },
          overflowY: 'auto',
        }}
      >
        <TimeProgressWidget />
      </Box>

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 1, md: 2 },
          gap: 2,
          overflow: 'hidden',
        }}
      >
        <Box component={motion.div} variants={itemVariants}>
          <PageHeader title={t('useless.title')} zone={'01'} />
        </Box>

        <Paper
          component={motion.div}
          variants={itemVariants}
          elevation={0}
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            overflow: 'hidden',
            bgcolor: 'background.paper',
          }}
        >
          {/* Tabs */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: 'background.default',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pr: 1,
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ px: 2 }}
            >
              <Tab label={t('useless.items.suffering.title')} {...a11yProps(0)} />
              <Tab label={t('useless.items.fleeing-mouse.title')} {...a11yProps(1)} />
              <Tab label={t('useless.items.wait-button.title')} {...a11yProps(2)} />
            </Tabs>

            <IconButton
              onClick={toggleFlip}
              color={isFlipped ? 'primary' : 'default'}
              title={t('useless.items.' + tabConfig[activeTab].key + '.title')}
              sx={{
                opacity: 0.7,
                transition: 'all 0.2s',
                '&:hover': { opacity: 1, bgcolor: 'action.hover' },
                transform: isFlipped ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              {isFlipped ? <ReplayIcon /> : <InfoOutlinedIcon />}
            </IconButton>
          </Box>

          {/* Widget zone */}
          <Box
            sx={{
              flexGrow: 1,
              position: 'relative',
              width: '100%',
              bgcolor: 'background.default',
              overflow: 'hidden',
              perspective: '1500px',
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <Box
                component={motion.div}
                key={activeTab}
                custom={direction}
                variants={swipeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                role="tabpanel"
                id={`lab-tabpanel-${activeTab}`}
                aria-labelledby={`lab-tab-${activeTab}`}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Flipping content */}
                <Box
                  component={motion.div}
                  animate={isFlipped ? 'back' : 'front'}
                  variants={flipVariants}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front face */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg)',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'background.default',
                    }}
                  >
                    {tabConfig[activeTab].component}
                  </Box>

                  {/* Back face */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      zIndex: 1,
                      bgcolor: 'background.default',
                    }}
                  >
                    <UselessInfoBack
                      titleKey={`useless.items.${tabConfig[activeTab].key}.title`}
                      descKey={`useless.items.${tabConfig[activeTab].key}.description`}
                      onBack={toggleFlip}
                    />
                  </Box>
                </Box>
              </Box>
            </AnimatePresence>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default UselessPage;
