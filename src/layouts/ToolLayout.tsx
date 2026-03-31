import React, { useState } from 'react';
import { Box, Stack, Typography, IconButton, Tooltip, Paper } from '@mui/material';
import { Settings, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface ToolLayoutProps {
  infoTitle?: string;
  infoText?: string;
  configContent?: React.ReactNode;
  children: React.ReactNode;
  toolContainerRef?: React.RefObject<HTMLDivElement | null>;
  configPosition?: 'side' | 'bottom';
}

export const ToolLayout: React.FC<ToolLayoutProps & { configPosition?: 'side' | 'bottom' }> = ({
  infoTitle,
  infoText,
  configContent,
  children,
  toolContainerRef,
  configPosition = 'side',
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showConfig, setShowConfig] = useState(!!configContent);
  const { t } = useTranslation();
  const isBottom = configPosition === 'bottom';

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        pt: { xs: 8, md: 4 },
        pb: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: isBottom ? '1400px' : '1200px',
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ mb: 4 }}
          component={motion.div}
          variants={itemVariants}
        >
          {(infoTitle || infoText) && (
            <Tooltip title={t('tools.common.toggle_info')}>
              <IconButton
                onClick={() => setShowInfo(!showInfo)}
                color={showInfo ? 'primary' : 'default'}
                sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
              >
                <Info size={20} />
              </IconButton>
            </Tooltip>
          )}
          {configContent && (
            <Tooltip title={t('tools.common.toggle_config')}>
              <IconButton
                onClick={() => setShowConfig(!showConfig)}
                color={showConfig ? 'primary' : 'default'}
                sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
              >
                <Settings size={20} />
              </IconButton>
            </Tooltip>
          )}
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
                {infoTitle && (
                  <Typography variant="h6" color="primary.main" gutterBottom>
                    {infoTitle}
                  </Typography>
                )}
                <Typography variant="body1" color="text.secondary">
                  {infoText}
                </Typography>
              </Paper>
            </Box>
          )}
        </AnimatePresence>

        <Box
          sx={{
            display: 'flex',
            flexDirection: isBottom ? 'column' : { xs: 'column', md: 'row' },
            gap: 4,
            flexGrow: 1,
          }}
        >
          <Box
            ref={toolContainerRef}
            component={motion.div}
            layout
            sx={{
              flexGrow: 1,
              position: 'relative',
              height: isBottom ? '60vh' : 'auto',
              overflow: 'hidden',
              '&:fullscreen': {
                width: '100vw',
                height: '100vh',
              },
            }}
          >
            {children}
          </Box>

          <AnimatePresence>
            {showConfig && configContent && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                sx={{ width: '100%', maxWidth: isBottom ? '100%' : { md: '380px' } }}
              >
                {configContent}
              </Box>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};
