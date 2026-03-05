/**
 * @file AudioVisualizerControls.tsx
 * @description Control panel for the Audio Visualizer.
 * Allows users to upload an MP3 file, toggle playback, and adjust shapes/colors.
 */

import React from 'react';
import { Box, Stack, Typography, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAudioVisualizerStore } from '@/store/tools/useAudioVisualizerStore.ts';
import type { VisualizerShape } from '@/types/tools/audioVisualizer.ts';
import { NestCard } from '@/components/common/NestCard.tsx';
import { NestButton } from '@/components/common/NestButton.tsx';

const AudioVisualizerControls: React.FC = () => {
  const { t } = useTranslation();
  const { isPlaying, settings, setAudioFile, setIsPlaying, updateSetting } =
    useAudioVisualizerStore();

  // Handle file selection
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setAudioFile(file);
      // TODO : handle the actual audio loading in the service later
      console.log('File uploaded:', file.name);
    }
  };

  // Handle shape change from Select
  const handleShapeChange = (event: SelectChangeEvent<string>) => {
    updateSetting('shape', event.target.value as VisualizerShape);
  };

  // Helper component to render a color picker block
  const ColorPicker = ({
    label,
    settingKey,
  }: {
    label: string;
    settingKey: keyof typeof settings;
  }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <input
        type="color"
        value={settings[settingKey]}
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
    <NestCard title={'Contrôles'}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <NestButton nestVariant="contained" component="label">
            {t('tools.audioVisualizer.controls.upload', 'Upload MP3')}
            <input type="file" accept="audio/mp3, audio/wav" hidden onChange={handleFileUpload} />
          </NestButton>

          <NestButton nestVariant="ghost" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? 'Pause' : 'Play'}
          </NestButton>
        </Stack>

        <Box sx={{ minWidth: 120 }}>
          <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
            {t('tools.audioVisualizer.controls.shape', 'Shape')}
          </Typography>
          <Select
            size="small"
            value={settings.shape}
            onChange={handleShapeChange}
            sx={{ backgroundColor: 'background.paper' }}
          >
            <MenuItem value="line">Line</MenuItem>
            <MenuItem value="circle">Circle</MenuItem>
          </Select>
        </Box>

        <Stack direction="row" spacing={2}>
          <ColorPicker label="Background" settingKey="backgroundColor" />
          <ColorPicker label="Bass" settingKey="bassColor" />
          <ColorPicker label="Mids" settingKey="midColor" />
          <ColorPicker label="Treble" settingKey="trebleColor" />
        </Stack>
      </Stack>
    </NestCard>
  );
};

export default AudioVisualizerControls;
