import React, { useRef, useEffect } from 'react';
import { useTheme } from '@mui/material';
import type { WheelChoice } from '@/types/tools/wheel.ts';

interface WheelCanvasProps {
  choices: WheelChoice[];
  rotation: number;
}

/**
 * Canvas-based wheel renderer.
 * Optimized for high-performance animations and theme integration.
 */
const WheelCanvas: React.FC<WheelCanvasProps> = ({ choices, rotation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const activeChoices = choices.filter((c) => c.isActive);
    const size = canvas.width;
    const center = size / 2;
    const radius = center - 10;
    const angleStep = (2 * Math.PI) / activeChoices.length;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(rotation);

    activeChoices.forEach((choice, i) => {
      const startAngle = i * angleStep;
      const endAngle = startAngle + angleStep;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.fillStyle = choice.color;
      ctx.fill();

      ctx.save();
      ctx.rotate(startAngle + angleStep / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = theme.palette.common.white;
      ctx.font = `bold 16px ${theme.typography.fontFamily}`;
      ctx.fillText(choice.text, radius - 20, 5);
      ctx.restore();
    });

    ctx.restore();
  }, [choices, rotation, theme]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ width: '100%', height: '100%', maxWidth: '100%' }}
    />
  );
};

export default WheelCanvas;
