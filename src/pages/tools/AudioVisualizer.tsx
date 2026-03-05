import React from 'react';
import { Box } from '@mui/material';
import AudioVisualizerCanvas from '@/components/tools/AudioVisualizerCanvas.tsx';
import AudioVisualizerControls from '@/components/tools/AudioVisualizerControls.tsx';

/**
 * @description Main page component for the 3D Audio Visualizer tool.
 * Assembles the fullscreen canvas and the floating/docked control panel.
 */
const AudioVisualizer: React.FC = () => {
  // TODO: Implement full-screen layout wrapping the Canvas and overlaying the Controls
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 100px)',
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <AudioVisualizerCanvas />

      <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16, zIndex: 10 }}>
        <AudioVisualizerControls />
      </Box>
    </Box>
  );
};

export default AudioVisualizer;
