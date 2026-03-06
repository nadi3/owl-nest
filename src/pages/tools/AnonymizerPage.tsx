import type { ChangeEvent } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Switch,
  Avatar,
  Card,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAnonymizerStore } from '@/store/tools/useAnonymizerStore.ts';
import { detectFaces } from '@/services/tools/faceDetectionService.ts';
import { AnonymizerCanvas } from '@/components/tools/AnonymizerCanvas.tsx';

export const AnonymizerPage = () => {
  const { t } = useTranslation();
  const {
    imageSrc,
    faces,
    isProcessing,
    setImageSrc,
    setFaces,
    setIsProcessing,
    toggleFaceBlur,
    reset,
  } = useAnonymizerStore();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);

      // Create an offscreen image to feed to TensorFlow
      const img = new Image();
      img.src = src;
      img.onload = async () => {
        try {
          const detectedFaces = await detectFaces(img);
          setFaces(detectedFaces);
        } catch (error) {
          console.error('Face detection failed:', error);
        } finally {
          setIsProcessing(false);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  if (!imageSrc) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Button variant="contained" component="label" disabled={isProcessing}>
          {isProcessing ? <CircularProgress size={24} /> : t('tools.anonymizer.upload')}
          <input
            type="file"
            hidden
            accept="image/jpeg, image/png, image/webp"
            onChange={handleImageUpload}
          />
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12} md={8}>
        <Typography variant="h5" gutterBottom>
          {t('tools.anonymizer.preview')}
        </Typography>
        <AnonymizerCanvas />
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            {t('tools.anonymizer.facesDetected', { count: faces.length })}
          </Typography>
          <Button color="error" onClick={reset}>
            {t('common.reset')}
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faces.map((face) => (
            <Card
              key={face.id}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: 'background.paper',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={face.thumbnailDataUrl}
                  variant="rounded"
                  sx={{ width: 56, height: 56 }}
                />
                <Typography variant="body2">{t('tools.anonymizer.blurFace')}</Typography>
              </Box>
              <Switch
                checked={face.isBlurred}
                onChange={() => toggleFaceBlur(face.id)}
                color="primary"
              />
            </Card>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};
