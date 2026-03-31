import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ToolLayout } from '@/layouts/ToolLayout.tsx';
import AudioVisualizerCanvas from '@/components/tools/AudioVisualizerCanvas.tsx';
import AudioVisualizerControls from '@/components/tools/AudioVisualizerControls.tsx';

const AudioVisualizer: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Erreur plein écran: ${err.message}`);
      });
    }
  };

  return (
    <ToolLayout
      infoTitle={t('tools.audioVisualizer.info_title')}
      infoText={t('tools.audioVisualizer.info_text')}
      toolContainerRef={containerRef}
      configPosition="bottom"
      configContent={<AudioVisualizerControls onToggleFullscreen={toggleFullscreen} />}
    >
      <AudioVisualizerCanvas />
    </ToolLayout>
  );
};

export default AudioVisualizer;
