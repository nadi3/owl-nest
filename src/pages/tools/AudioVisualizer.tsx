/**
 * @file AudioVisualizer.tsx
 * @description The main page for the 3D Audio Visualizer tool.
 */

import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ToolLayout } from '@/layouts/ToolLayout.tsx';
import AudioVisualizerCanvas from '@/components/tools/AudioVisualizerCanvas.tsx';
import AudioVisualizerControls from '@/components/tools/AudioVisualizerControls.tsx';
import { PageSEO } from '@/components/common/PageSEO.tsx';

/**
 * The main page component for the 3D Audio Visualizer.
 *
 * This component integrates the main parts of the audio visualizer tool:
 * - `ToolLayout`: Provides the overall page structure.
 * - `AudioVisualizerCanvas`: Renders the 3D visualization itself.
 * - `AudioVisualizerControls`: Provides the UI for controlling the visualizer.
 *
 * It also manages the fullscreen functionality, passing a `toggleFullscreen`
 * function down to the controls.
 *
 * @component
 * @returns {React.ReactElement} The rendered Audio Visualizer page.
 */
const AudioVisualizer: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Toggles fullscreen mode for the visualizer canvas container.
   * It checks if the document is currently in fullscreen mode and either requests
   * to enter or exit fullscreen accordingly.
   */
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
      <PageSEO
        titleKey={'seo.tools_audioVisualizer.title'}
        descriptionKey={'seo.tools_audioVisualizer.description'}
      />
      <AudioVisualizerCanvas />
    </ToolLayout>
  );
};

export default AudioVisualizer;
