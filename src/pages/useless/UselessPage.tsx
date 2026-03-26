import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

import { SufferingButton } from '@/components/useless/SufferingButton';
import { FleeingElement } from '@/components/useless/FleeingElement';
import { InfiniteWaitWidget } from '@/components/useless/InfiniteWaitWidget';
import { TimeProgressWidget } from '@/components/useless/TimeProgressWidget.tsx';
import { PageHeader } from '@/components/common/PageHeader.tsx';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const swipeVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -50 : 50,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  }),
};

const a11yProps = (index: number) => {
  return {
    id: `lab-tab-${index}`,
    'aria-controls': `lab-tabpanel-${index}`,
  };
};

const UselessPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setDirection(newValue > activeTab ? 1 : -1);
    setActiveTab(newValue);
  };

  const tabComponents = [
    <SufferingButton key="suffering" />,
    <FleeingElement key="fleeing" />,
    <InfiniteWaitWidget key="infinite" />,
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
      {/* Left sidebar : Hex clock */}
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
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ px: 2 }}
            >
              <Tab
                iconPosition="start"
                label={t('useless.items.suffering.title')}
                {...a11yProps(0)}
              />
              <Tab
                iconPosition="start"
                label={t('useless.items.fleeing-mouse.title')}
                {...a11yProps(1)}
              />
              <Tab
                iconPosition="start"
                label={t('useless.items.wait-button.title')}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>

          {/* Widget zone */}
          <Box
            sx={{
              flexGrow: 1,
              position: 'relative',
              width: '100%',
              bgcolor: 'background.default',
              overflow: 'hidden',
            }}
          >
            {/* Waits for the end of the exit animation to start the next one */}
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
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {tabComponents[activeTab]}
              </Box>
            </AnimatePresence>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default UselessPage;
