/**
 * @file AudioVisualizerControls.tsx
 * @description Panneau de contrôle de l'Audio Visualizer avec mise à jour automatique du temps et icônes de lecture.
 */

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Maximize, Play, Pause, SkipBack, Upload, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAudioVisualizerStore } from '@/store/tools/useAudioVisualizerStore.ts';
import { audioVisualizerService } from '@/services/tools/audioVisualizerService.ts';
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
  const {
    isPlaying,
    settings,
    setAudioFile,
    setIsPlaying,
    updateSetting,
    audioFile,
    startExport,
    exportStatus,
    exportProgress,
    currentTime,
    duration,
    setCurrentTime,
    setDuration,
    seek,
  } = useAudioVisualizerStore();

  const isExporting = exportStatus !== 'idle';

  useEffect(() => {
    const audio = audioVisualizerService.getAudioElement();
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioFile, setCurrentTime, setDuration]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) setAudioFile(file);
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
        disabled={isExporting}
        style={{
          width: '32px',
          height: '32px',
          padding: '0',
          border: 'none',
          borderRadius: '4px',
          cursor: isExporting ? 'not-allowed' : 'pointer',
          backgroundColor: 'transparent',
        }}
      />
    </Box>
  );

  return (
    <NestCard title={t('tools.audioVisualizer.controls.title')}>
      <Stack spacing={2}>
        {/* LIGNE 1 : RÉGLAGES VISUELS */}
        <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <ColorPicker
              label={t('tools.audioVisualizer.colors.background')}
              settingKey="backgroundColor"
            />
            <ColorPicker
              label={t('tools.audioVisualizer.colors.bass', { range: '20-250Hz' })}
              settingKey="bassColor"
            />
            <ColorPicker
              label={t('tools.audioVisualizer.colors.mids', { range: '250Hz-4kHz' })}
              settingKey="midColor"
            />
            <ColorPicker
              label={t('tools.audioVisualizer.colors.treble', { range: '4-16kHz' })}
              settingKey="trebleColor"
            />
          </Stack>

          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{ flexGrow: 1, justifyContent: 'flex-end' }}
          >
            <Box sx={{ minWidth: 100 }}>
              <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                {t('tools.audioVisualizer.controls.shape')}
              </Typography>
              <Select
                size="small"
                value={settings.shape}
                onChange={handleShapeChange}
                disabled={isExporting}
                sx={{ backgroundColor: 'background.paper', height: 32 }}
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
                disabled={isExporting}
                onChange={(_, newValue) => updateSetting('opacity', newValue as number)}
                valueLabelDisplay="auto"
                valueLabelFormat={(val) => `${Math.round(val * 100)}%`}
              />
            </Box>

            {settings.shape === 'circle' && (
              <Stack direction="row" spacing={1} alignItems="center">
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={settings.showImage}
                      disabled={isExporting}
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
                  <NestButton
                    nestVariant="contained"
                    component="label"
                    size="small"
                    disabled={isExporting}
                  >
                    {t('tools.audioVisualizer.controls.uploadImage')}
                    <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                  </NestButton>
                )}
              </Stack>
            )}

            {settings.shape === 'line' && (
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={settings.mirrorHorizontal}
                      onChange={(e) => updateSetting('mirrorHorizontal', e.target.checked)}
                    />
                  }
                  label={t('tools.audioVisualizer.controls.mirrorHorizontal')}
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={settings.mirrorVertical}
                      onChange={(e) => updateSetting('mirrorVertical', e.target.checked)}
                    />
                  }
                  label={t('tools.audioVisualizer.controls.mirrorVertical')}
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={settings.showBaseLine}
                      onChange={(e) => updateSetting('showBaseLine', e.target.checked)}
                    />
                  }
                  label={t('tools.audioVisualizer.controls.showBaseLine')}
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
                />
              </Stack>
            )}

            <Tooltip title={t('tools.audioVisualizer.controls.fullscreen')}>
              <IconButton onClick={onToggleFullscreen} sx={{ color: 'text.primary' }}>
                <Maximize size={20} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Divider />

        <Stack direction="row" spacing={3} alignItems="center">
          <Stack direction="row" spacing={1}>
            <NestButton
              nestVariant="contained"
              component="label"
              disabled={isExporting}
              size="small"
              startIcon={<Upload size={16} />}
            >
              {t('tools.audioVisualizer.controls.upload')}
              <input type="file" accept="audio/mp3, audio/wav" hidden onChange={handleFileUpload} />
            </NestButton>
            <NestButton
              nestVariant="ghost"
              onClick={handleLoadDemo}
              disabled={isExporting}
              size="small"
            >
              {t('tools.audioVisualizer.controls.demo')}
            </NestButton>

            <NestButton
              nestVariant="ghost"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={isExporting || !audioFile}
              size="small"
              startIcon={isPlaying ? <Pause size={16} /> : <Play size={16} />}
            >
              {t(
                isPlaying
                  ? 'tools.audioVisualizer.controls.pause'
                  : 'tools.audioVisualizer.controls.play'
              )}
            </NestButton>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1, px: 2 }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', minWidth: 40 }}>
              {formatTime(currentTime)}
            </Typography>
            <Slider
              size="small"
              value={currentTime}
              max={duration || 100}
              disabled={!audioFile || isExporting}
              onChange={(_, value) => seek(value as number)}
              sx={{ color: 'primary.main' }}
            />
            <Typography variant="caption" sx={{ fontFamily: 'monospace', minWidth: 40 }}>
              {formatTime(duration)}
            </Typography>
            <IconButton size="small" onClick={() => seek(0)} disabled={!audioFile || isExporting}>
              <SkipBack size={16} />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            {audioFile && (
              <NestButton
                nestVariant="contained"
                nestColor="primary"
                onClick={startExport}
                disabled={isExporting}
                size="small"
                startIcon={<Download size={16} />}
              >
                Export MP4
              </NestButton>
            )}

            {isExporting && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress
                  variant={exportStatus === 'rendering' ? 'determinate' : 'indeterminate'}
                  value={exportStatus === 'rendering' ? exportProgress : undefined}
                  size={20}
                />
                <Typography variant="caption" color="text.secondary">
                  {exportStatus === 'analyzing'
                    ? 'Analyse...'
                    : exportStatus === 'rendering'
                      ? `${Math.round(exportProgress)}%`
                      : 'Finalisation...'}
                </Typography>
              </Box>
            )}
          </Stack>
        </Stack>
      </Stack>
    </NestCard>
  );
};

export default AudioVisualizerControls;
