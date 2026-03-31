import { type ChangeEvent, useRef } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Switch,
  Avatar,
  Stack,
  Divider,
  Card,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Upload, Download, RefreshCw, Image as ImageIcon } from 'lucide-react';

import { useAnonymizerStore } from '@/store/tools/useAnonymizerStore.ts';
import { detectFaces } from '@/services/tools/faceDetectionService.ts';
import { ToolLayout } from '@/layouts/ToolLayout.tsx';
import {
  AnonymizerCanvas,
  type AnonymizerCanvasRef,
} from '@/components/tools/AnonymizerCanvas.tsx';
import { NestButton } from '@/components/common/NestButton.tsx';

export const AnonymizerPage = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<AnonymizerCanvasRef>(null);

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

  const handleDownload = () => {
    if (canvasRef.current) {
      canvasRef.current.downloadImage(`anonymized_${Date.now()}.jpg`);
    }
  };

  const configContent = (
    <Stack spacing={3} sx={{ height: { md: 'calc(100vh - 130px)' } }}>
      <Box>
        <Typography variant="subtitle2" gutterBottom color="text.secondary">
          {t('tools.anonymizer.config.actions')}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            disabled={isProcessing}
            startIcon={isProcessing ? <CircularProgress size={16} /> : <Upload size={18} />}
          >
            {t('tools.anonymizer.upload')}
            <input
              type="file"
              hidden
              accept="image/jpeg, image/png, image/webp"
              onChange={handleImageUpload}
            />
          </Button>
          {imageSrc && (
            <NestButton nestColor="error" onClick={reset} sx={{ minWidth: 'auto', px: 2 }}>
              <RefreshCw size={18} />
            </NestButton>
          )}
        </Stack>
      </Box>

      {imageSrc && (
        <>
          <Divider />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                {t('tools.anonymizer.facesDetected', { count: faces.length })}
              </Typography>
              <NestButton size="small" onClick={handleDownload} startIcon={<Download size={16} />}>
                {t('common.download')}
              </NestButton>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                pr: 1, // Padding pour ne pas coller à la scrollbar
                '&::-webkit-scrollbar': { width: '5px' },
                '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: '10px' },
              }}
            >
              <Stack spacing={1.5}>
                {faces.map((face) => (
                  <Card
                    key={face.id}
                    sx={{
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        src={face.thumbnailDataUrl}
                        variant="rounded"
                        sx={{ width: 48, height: 48, border: '1px solid', borderColor: 'divider' }}
                      />
                      <Typography variant="body2">{t('tools.anonymizer.blurFace')}</Typography>
                    </Stack>
                    <Switch
                      size="small"
                      checked={face.isBlurred}
                      onChange={() => toggleFaceBlur(face.id)}
                      color="primary"
                    />
                  </Card>
                ))}
              </Stack>
            </Box>
          </Box>
        </>
      )}
    </Stack>
  );

  return (
    <ToolLayout
      infoTitle={t('tools.anonymizer.info_title')}
      infoText={t('tools.anonymizer.info_text')}
      configContent={configContent}
      configPosition="side"
    >
      <Box
        sx={{
          height: { xs: '50vh', md: 'calc(100vh - 130px)' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px dashed',
          borderColor: 'divider',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {imageSrc ? (
          <AnonymizerCanvas ref={canvasRef} />
        ) : (
          <Stack alignItems="center" spacing={2} sx={{ color: 'text.disabled' }}>
            <ImageIcon size={64} strokeWidth={1} />
            <Typography variant="h6">{t('tools.anonymizer.placeholder')}</Typography>
            <Typography variant="body2">{t('tools.anonymizer.placeholder_sub')}</Typography>
          </Stack>
        )}
      </Box>
    </ToolLayout>
  );
};
