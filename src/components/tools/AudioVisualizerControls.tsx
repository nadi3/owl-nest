/**
 * @file AudioVisualizerControls.tsx
 * @description Control panel for the Audio Visualizer.
 * Allows users to upload an MP3 file, load a default demo, and adjust visual settings.
 */

import React from 'react';
import {
  Box,
  Stack,
  Typography,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Slider,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAudioVisualizerStore } from '@/store/tools/useAudioVisualizerStore.ts';
import type { VisualizerShape } from '@/types/tools/audioVisualizer.ts';
import { NestCard } from '@/components/common/NestCard.tsx';
import { NestButton } from '@/components/common/NestButton.tsx';

/**
 * Props for the AudioVisualizerControls component.
 * @interface AudioVisualizerControlsProps
 */
interface AudioVisualizerControlsProps {
  /**
   * A callback function to toggle the fullscreen mode of the visualizer.
   * @type {() => void}
   */
  onToggleFullscreen: () => void;
}

/**
 * A control panel component for the Audio Visualizer application.
 *
 * This component provides a user interface for:
 * - Uploading custom audio files (MP3, WAV).
 * - Loading a default demo audio file.
 * - Playing and pausing the audio visualization.
 * - Toggling fullscreen mode.
 * - Changing the visualizer's shape ('line' or 'circle').
 * - Adjusting the opacity of the visual elements.
 * - Showing/hiding and uploading a custom central image (for 'circle' shape).
 * - Picking colors for the background, bass, mids, and treble frequencies.
 *
 * It uses the `useAudioVisualizerStore` for state management.
 *
 * @component
 * @param {AudioVisualizerControlsProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered control panel.
 */
const AudioVisualizerControls: React.FC<AudioVisualizerControlsProps> = ({
  onToggleFullscreen,
}: AudioVisualizerControlsProps): React.ReactElement => {
  const { t } = useTranslation();
  const { isPlaying, settings, setAudioFile, setIsPlaying, updateSetting } =
    useAudioVisualizerStore();

  /**
   * Handles the user selecting a local audio file.
   * It takes the first file from the input event and sets it in the global store.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The file input change event.
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setAudioFile(file);
    }
  };

  /**
   * Handles the user selecting a local image file for the center of the visualizer.
   * It creates an object URL from the file and updates the `customImage` setting in the store.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The file input change event.
   */
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateSetting('customImage', imageUrl);
    }
  };

  /**
   * Fetches and loads the default demo MP3 file from the `/public` directory.
   * This allows users to quickly test the visualizer without needing their own audio file.
   */
  const handleLoadDemo = async () => {
    try {
      const response = await fetch('/demo.mp3');
      const blob = await response.blob();
      const file = new File([blob], 'demo.mp3', { type: 'audio/mpeg' });
      setAudioFile(file);
    } catch (error) {
      console.error('Failed to load demo audio:', error);
    }
  };

  /**
   * Handles changes to the visualizer shape dropdown.
   * It updates the `shape` setting in the global store.
   * @param {SelectChangeEvent<string>} event - The change event from the MUI Select component.
   */
  const handleShapeChange = (event: SelectChangeEvent<string>) => {
    updateSetting('shape', event.target.value as VisualizerShape);
  };

  /**
   * A small component that renders a label and a native HTML color input.
   * It's used for selecting the various colors of the visualizer.
   *
   * @param {{label: string, settingKey: keyof typeof settings}} props - The props for the component.
   * @returns {React.ReactElement} The rendered color picker input.
   */
  const ColorPicker = ({
    label,
    settingKey,
  }: {
    label: string;
    settingKey: keyof typeof settings;
  }): React.ReactElement => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <input
        type="color"
        value={settings[settingKey] as string}
        onChange={(e) => updateSetting(settingKey, e.target.value)}
        style={{
          width: '32px',
          height: '32px',
          padding: '0',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          backgroundColor: 'transparent',
        }}
      />
    </Box>
  );

  return (
    <NestCard title={t('tools.audioVisualizer.controls.title')}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <NestButton nestVariant="contained" component="label">
            {t('tools.audioVisualizer.controls.upload')}
            <input type="file" accept="audio/mp3, audio/wav" hidden onChange={handleFileUpload} />
          </NestButton>

          <NestButton nestVariant="ghost" onClick={handleLoadDemo}>
            {t('tools.audioVisualizer.controls.demo')}
          </NestButton>

          <NestButton nestVariant="ghost" onClick={() => setIsPlaying(!isPlaying)}>
            {t(
              isPlaying
                ? 'tools.audioVisualizer.controls.pause'
                : 'tools.audioVisualizer.controls.play'
            )}
          </NestButton>

          <NestButton nestVariant="ghost" onClick={onToggleFullscreen}>
            {t('tools.audioVisualizer.controls.fullscreen')}
          </NestButton>
        </Stack>

        <Stack direction="row" spacing={3} alignItems="center">
          <Box sx={{ minWidth: 100 }}>
            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
              {t('tools.audioVisualizer.controls.shape')}
            </Typography>
            <Select
              size="small"
              value={settings.shape}
              onChange={handleShapeChange}
              sx={{ backgroundColor: 'background.paper' }}
            >
              <MenuItem value="line">{t('tools.audioVisualizer.shapes.line')}</MenuItem>
              <MenuItem value="circle">{t('tools.audioVisualizer.shapes.circle')}</MenuItem>
            </Select>
          </Box>

          <Box sx={{ width: 120 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              {t('tools.audioVisualizer.controls.opacity')}
            </Typography>
            <Slider
              size="small"
              value={settings.opacity}
              min={0.1}
              max={1}
              step={0.05}
              onChange={(_, newValue) => updateSetting('opacity', newValue)}
              valueLabelDisplay="auto"
              valueLabelFormat={(val) => `${Math.round(val * 100)}%`}
            />

            {settings.shape === 'circle' && (
              <Stack direction="row" spacing={2} alignItems="center">
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={settings.showImage}
                      onChange={(e) => updateSetting('showImage', e.target.checked)}
                    />
                  }
                  label={t('tools.audioVisualizer.controls.showImage')}
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '0.75rem',
                      color: 'text.secondary',
                    },
                  }}
                />

                {settings.showImage && (
                  <NestButton nestVariant="contained" component="label" size="small">
                    {t('tools.audioVisualizer.controls.uploadImage')}
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      hidden
                      onChange={handleImageUpload}
                    />
                  </NestButton>
                )}
              </Stack>
            )}
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <ColorPicker
            label={t('tools.audioVisualizer.colors.background')}
            settingKey="backgroundColor"
          />
          <ColorPicker label={t('tools.audioVisualizer.colors.bass')} settingKey="bassColor" />
          <ColorPicker label={t('tools.audioVisualizer.colors.mids')} settingKey="midColor" />
          <ColorPicker label={t('tools.audioVisualizer.colors.treble')} settingKey="trebleColor" />
        </Stack>
      </Stack>
    </NestCard>
  );
};

export default AudioVisualizerControls;
