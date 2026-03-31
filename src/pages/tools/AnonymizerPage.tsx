/**
 * @file AnonymizerPage.tsx
 * @description The main page for the Face Anonymizer tool, which allows users
 * to upload an image, detect faces, and apply a blur effect to them.
 */

import { type ChangeEvent, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
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
import { PageSEO } from '@/components/common/PageSEO.tsx';

/**
 * The main page component for the Face Anonymizer tool.
 *
 * This page orchestrates the entire user flow for the anonymizer:
 * 1.  **Image Upload**: Users can upload an image (JPEG, PNG, WebP).
 * 2.  **Face Detection**: The `detectFaces` service is called to find faces in the uploaded image.
 * 3.  **Display**: The image is rendered on an `AnonymizerCanvas`, and detected faces are listed in the config panel.
 * 4.  **Configuration**: Users can toggle the blur effect for each detected face individually.
 * 5.  **Download**: Users can download the final anonymized image.
 *
 * The component uses `ToolLayout` for its structure and manages its state through
 * the `useAnonymizerStore`.
 *
 * @component
 * @returns {React.ReactElement} The rendered Anonymizer page.
 */
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

  /**
   * Handles the image upload process.
   * When a user selects a file, this function reads it as a Data URL,
   * updates the global state, and then triggers the face detection service.
   * The component's processing state is managed to provide user feedback.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The file input change event.
   */
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

  /**
   * Triggers the download of the current canvas content.
   * It calls the `downloadImage` method exposed by the `AnonymizerCanvas` component's ref.
   */
  const handleDownload = () => {
    if (canvasRef.current) {
      canvasRef.current.downloadImage(`anonymized_${Date.now()}.jpg`);
    }
  };

  /**
   * The JSX content for the tool's configuration panel.
   * This includes the upload/reset buttons and the list of detected faces
   * with their corresponding blur toggles. This content is passed to the `ToolLayout`.
   * @constant
   */
  const configContent = (
    <Stack spacing={3} sx={{ height: { md: 'calc(100vh - 130px)' } }}>
      <PageSEO
        titleKey={'seo.tools_anonymizer.title'}
        descriptionKey={'seo.tools_anonimyzer.description'}
      />
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
