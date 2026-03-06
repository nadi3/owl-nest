import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useAnonymizerStore } from '@/store/tools/useAnonymizerStore.ts';

export const AnonymizerCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { imageSrc, faces } = useAnonymizerStore();

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
};
