/**
 * @file ToolLayout.tsx
 * @description A flexible layout component designed for tool pages, providing sections
 * for the tool itself, informational text, and configuration controls.
 */

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import { Settings, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/**
 * Animation variants for the main container, enabling a staggered animation for its children.
 * @constant {object}
 */
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

/**
 * Animation variants for individual items within the layout, creating a "fade in and slide up" effect.
 * @constant {object}
 */
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/**
 * Props for the ToolLayout component.
 * @interface ToolLayoutProps
 */
interface ToolLayoutProps {
  /**
   * The title for the collapsible information section.
   * @type {string}
   * @optional
   */
  infoTitle?: string;
  /**
   * The main text content for the collapsible information section.
   * @type {string}
   * @optional
   */
  infoText?: string;
  /**
   * The React node containing the configuration controls for the tool.
   * If provided, a settings toggle button will be displayed.
   * @type {React.ReactNode}
   * @optional
   */
  configContent?: React.ReactNode;
  /**
   * The main content of the tool page, typically the tool's interactive component.
   * @type {React.ReactNode}
   */
  children: React.ReactNode;
  /**
   * A ref to the main tool container, which can be used by parent components
   * to manage things like fullscreen mode.
   * @type {React.RefObject<HTMLDivElement | null>}
   * @optional
   */
  toolContainerRef?: React.RefObject<HTMLDivElement | null>;
  /**
   * Determines the layout of the configuration panel relative to the tool.
   * - `side`: The configuration panel appears to the side of the tool (default on larger screens).
   * - `bottom`: The configuration panel appears below the tool.
   * @type {'side' | 'bottom'}
   * @default 'side'
   * @optional
   */
  configPosition?: 'side' | 'bottom';
}

/**
 * A standardized layout for tool pages, providing a consistent structure for
 * displaying a tool, its description, and its configuration options.
 *
 * This component arranges three main sections:
 * 1.  **Tool Area**: The primary content where the interactive tool is rendered.
 * 2.  **Info Section**: A collapsible area for displaying instructions or information about the tool.
 * 3.  **Config Section**: A collapsible area for tool-specific settings and controls.
 *
 * The layout is responsive and can be configured to place the settings panel
 * either to the side or at the bottom. It uses `framer-motion` for smooth
 * animations when sections are toggled.
 *
 * @component
 * @param {ToolLayoutProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered tool layout.
 */
export const ToolLayout: React.FC<ToolLayoutProps & { configPosition?: 'side' | 'bottom' }> = ({
  infoTitle,
  infoText,
  configContent,
  children,
  toolContainerRef,
  configPosition = 'side',
}: ToolLayoutProps): React.ReactElement => {
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
