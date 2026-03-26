import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SufferingButton } from '@/components/useless/SufferingButton';
import { FleeingElement } from '@/components/useless/FleeingElement';
import { InfiniteWaitWidget } from '@/components/useless/InfiniteWaitWidget';
import { TimeProgressWidget } from '@/components/useless/TimeProgressWidget.tsx';
import { PageHeader } from '@/components/common/PageHeader.tsx';
import { motion, type Variants } from 'framer-motion';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`lab-tabpanel-${index}`}
      aria-labelledby={`lab-tab-${index}`}
      sx={{
        flexGrow: 1,
        display: value === index ? 'flex' : 'none',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      {...other}
    >
      {value === index && (
        <Box sx={{ flexGrow: 1, position: 'relative', width: '100%', height: '100%' }}>
          {children}
        </Box>
      )}
    </Box>
  );
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }, // Maintenant TS sait que c'est valide !
  },
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

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      component={motion.div} // Devient un composant motion
      initial="hidden"
      animate="visible"
      variants={containerVariants} // Orchestre les enfants
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
            }}
          >
            {/* Suffering Button */}
            <CustomTabPanel value={activeTab} index={0}>
              <SufferingButton />
            </CustomTabPanel>

            {/* Mouse Chase */}
            <CustomTabPanel value={activeTab} index={1}>
              <FleeingElement />
            </CustomTabPanel>

            {/* Infinite Wait */}
            <CustomTabPanel value={activeTab} index={2}>
              <InfiniteWaitWidget />
            </CustomTabPanel>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default UselessPage;
