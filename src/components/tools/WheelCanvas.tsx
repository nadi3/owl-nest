import React, { useRef, useEffect } from 'react';
import { useTheme } from '@mui/material';
import type { WheelChoice } from '@/types/tools/wheel.ts';

/**
 * @file WheelCanvas.tsx
 * @description A canvas-based component for rendering the spinning Wheel of Destiny.
 */

/**
 * Props for the WheelCanvas component.
 * @interface WheelCanvasProps
 */
interface WheelCanvasProps {
  /**
   * An array of choice objects to be displayed on the wheel.
   * Only choices with `isActive: true` will be rendered.
   * @type {WheelChoice[]}
   */
  choices: WheelChoice[];
  /**
   * The current rotation of the wheel in radians.
   * This value is updated continuously to create the spinning animation.
   * @type {number}
   */
  rotation: number;
}

/**
 * A component that renders a spinning wheel of choices on an HTML5 Canvas.
 *
 * This component is optimized for performance by using the Canvas API for drawing,
 * which is ideal for the continuous animations required by the spinning wheel.
 * It receives the list of choices and the current rotation angle as props and
 * re-renders the wheel whenever these props change.
 *
 * The drawing logic is contained within a `useEffect` hook. It calculates the
 * segments of the wheel based on the number of active choices and draws each
 * wedge with its corresponding color and text.
 *
 * @component
 * @param {WheelCanvasProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered canvas element.
 */
const WheelCanvas: React.FC<WheelCanvasProps> = ({
  choices,
  rotation,
}: WheelCanvasProps): React.ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  /**
   * `useEffect` hook to handle the drawing and re-drawing of the wheel on the canvas.
   *
   * This effect triggers whenever `choices`, `rotation`, or `theme` change.
   * It performs the following steps:
   * 1. Filters for active choices.
   *  * Clears the canvas.
   *  * Saves the canvas context and translates to the center to handle rotation.
   *  * Iterates through each active choice to draw its corresponding wedge:
   *    - Calculates the start and end angles for the arc.
   *    - Fills the wedge with the choice's color.
   *    - Saves the context again to rotate the text, making it radiate from the center.
   *    - Draws the choice's text.
   *    - Restores the context to undo the text rotation.
   * 5. Restores the main context to undo the wheel's rotation and translation.
   */
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
