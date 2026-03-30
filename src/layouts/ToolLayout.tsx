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
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({
  infoTitle,
  infoText,
  configContent,
  children,
  toolContainerRef,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showConfig, setShowConfig] = useState(!!configContent);
  const { t } = useTranslation();

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ width: '100%', minHeight: '100vh', pt: { xs: 8, md: 4 }, pb: 8 }}
    >
      <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 3 } }}>
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
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 0 },
            minHeight: { xs: 'auto', md: '70vh' },
          }}
        >
          <AnimatePresence initial={false}>
            {showConfig && configContent && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                sx={{ overflow: 'hidden', flexShrink: 0 }}
              >
                <Box
                  sx={{ width: { xs: '100%', md: '380px' }, pr: { md: 4 }, pb: { xs: 2, md: 0 } }}
                >
                  {configContent}
                </Box>
              </Box>
            )}
          </AnimatePresence>

          <Box
            ref={toolContainerRef}
            component={motion.div}
            layout
            variants={itemVariants}
            sx={{
              flexGrow: 1,
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
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
