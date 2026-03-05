import React, { useRef, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import AudioVisualizerCanvas from '@/components/tools/AudioVisualizerCanvas.tsx';
import AudioVisualizerControls from '@/components/tools/AudioVisualizerControls.tsx';

/**
 * @description Main page component for the 3D Audio Visualizer tool.
 * Handles layout sizing, control overlays, and native Fullscreen API integration.
 */
const AudioVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Erreur lors du passage en plein écran: ${err.message}`);
      });
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: isFullscreen ? '100vh' : 'calc(100vh - 100px)',
        overflow: 'hidden',
        borderRadius: isFullscreen ? 0 : 2,
        boxShadow: isFullscreen ? 0 : 3,
      }}
    >
      <AudioVisualizerCanvas />

      {!isFullscreen && (
        <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16, zIndex: 10 }}>
          <AudioVisualizerControls onToggleFullscreen={toggleFullscreen} />
        </Box>
      )}
    </Box>
  );
};

export default AudioVisualizer;
