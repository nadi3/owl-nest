import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Box } from '@mui/material';
import { useAnonymizerStore } from '@/store/tools/useAnonymizerStore.ts';

/**
 * @file This file defines the AnonymizerCanvas component, which is responsible for
 * rendering an image on a canvas and applying a blur effect to detected faces.
 */

/**
 * Defines the methods exposed by the `AnonymizerCanvas` component's ref.
 * This allows parent components to interact with the canvas directly.
 * @interface AnonymizerCanvasRef
 */
export interface AnonymizerCanvasRef {
  /**
   * Triggers a download of the current canvas content as a JPEG image.
   * @param {string} [filename='anonymized-photo.jpg'] - The desired filename for the downloaded image.
   */
  downloadImage: (filename?: string) => void;
}

/**
 * A canvas component that draws an image and applies a blur effect to specified facial regions.
 *
 * This component uses the `useAnonymizerStore` to get the image source and the coordinates of faces to blur.
 * It renders the image on a `<canvas>` element and then draws a blurred version of the facial areas on top.
 *
 * The component is wrapped in `forwardRef` to expose a `downloadImage` method, allowing parent
 * components to trigger a download of the resulting anonymized image.
 *
 * @component
 * @param {object} props - The component props (currently empty).
 * @param {React.Ref<AnonymizerCanvasRef>} ref - The ref that will be populated with the component's imperative handles.
 * @returns {React.ReactElement} The rendered canvas component within a styled Box.
 */
export const AnonymizerCanvas = forwardRef<AnonymizerCanvasRef, {}>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { imageSrc, faces } = useAnonymizerStore();

  useImperativeHandle(ref, () => ({
    downloadImage: (filename = 'anonymized-photo.jpg') => {
      if (!canvasRef.current) return;

      const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.9);

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
    },
  }));

  /**
   * `useEffect` hook to handle the drawing logic on the canvas.
   *
   * This effect triggers whenever the `imageSrc` or the `faces` array changes.
   * It performs the following steps:
   * 1. Clears the canvas.
   * 2. Draws the original image.
   * 3. Iterates through the `faces` array.
   * 4. For each face marked as `isBlurred`, it saves the canvas context, applies a dynamic blur filter,
   *    and redraws that specific portion of the image, creating the anonymization effect.
   * 5. Restores the canvas context to remove the blur filter for subsequent operations.
   */
  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      faces.forEach((face) => {
        if (face.isBlurred) {
          ctx.save();
          const dynamicBlurRadius = Math.max(15, face.box.width * 0.1);

          ctx.filter = `blur(${dynamicBlurRadius}px)`;
          ctx.drawImage(
            img,
            face.box.x,
            face.box.y,
            face.box.width,
            face.box.height,
            face.box.x,
            face.box.y,
            face.box.width,
            face.box.height
          );
          ctx.restore();
        }
      });
    };
  }, [imageSrc, faces]);

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'background.default',
        borderRadius: 1,
      }}
    >
      <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
    </Box>
  );
});

AnonymizerCanvas.displayName = 'AnonymizerCanvas';
