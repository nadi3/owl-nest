/**
 * @file UselessPage.tsx
 * @description The main page for the "Useless Lab," a collection of interactive,
 * experimental, and humorous web widgets.
 */

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
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

/**
 * Animation variants for the main page container, enabling a staggered animation for its children.
 * @constant {Variants}
 */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1 },
  },
};

/**
 * Animation variants for individual items within the page, creating a "fade in and slide up" effect.
 * @constant {Variants}
 */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/**
 * Animation variants for the tab content, creating a horizontal swipe effect when changing tabs.
 * @constant {Variants}
 */
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

/**
 * Animation variants for the card flipping effect, used to show the back side with information.
 * @constant {Variants}
 */
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

/**
 * Generates accessibility props for a tab.
 * @param {number} index - The index of the tab.
 * @returns {object} An object containing `id` and `aria-controls` props.
 */
const a11yProps = (index: number): object => ({
  id: `lab-tab-${index}`,
  'aria-controls': `lab-tabpanel-${index}`,
});

/**
 * Props for the UselessInfoBack component.
 * @interface UselessInfoBackProps
 */
interface UselessInfoBackProps {
  /**
   * The translation key for the title of the widget.
   * @type {string}
   */
  titleKey: string;
  /**
   * The translation key for the description of the widget.
   * @type {string}
   */
  descKey: string;
  /**
   * A callback function to trigger the flip back to the front face.
   * @type {() => void}
   */
  onBack: () => void;
}

/**
 * A component that renders the "back" face of a flippable card, displaying
 * information about a "useless" widget.
 *
 * @component
 * @param {UselessInfoBackProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered info card.
 */
const UselessInfoBack: React.FC<UselessInfoBackProps> = ({
  titleKey,
  descKey,
  onBack,
}: UselessInfoBackProps): React.ReactElement => {
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

/**
 * The main page for the "Useless Lab," a showcase of interactive and experimental widgets.
 *
 * This page features a tab-based interface to switch between different "useless" components.
 * Each tab's content is displayed on a flippable card, allowing users to view either
 * the widget itself or an informational description on the back.
 *
 * The layout includes:
 * - A sidebar with a `TimeProgressWidget`.
 * - A main content area with a `PageHeader`.
 * - A tabbed container for the widgets.
 * - A flip button to toggle between the widget and its description.
 *
 * The component uses `framer-motion` extensively for tab transitions and card flipping animations.
 *
 * @component
 * @returns {React.ReactElement} The rendered Useless Lab page.
 */
const UselessPage = (): React.ReactElement => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);

  /**
   * Handles the change of the active tab.
   * It sets the direction for the swipe animation and updates the active tab index.
   * @param {React.SyntheticEvent} _event - The event that triggered the change (unused).
   * @param {number} newValue - The index of the new active tab.
   */
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setIsFlipped(false);
    setDirection(newValue > activeTab ? 1 : -1);
    setActiveTab(newValue);
  };

  /**
   * Toggles the flipped state of the content card.
   */
  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  /**
   * Configuration array for the tabs. Each object defines the component to render
   * and a key for its associated translations.
   * @constant
   */
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
