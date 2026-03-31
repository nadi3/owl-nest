/**
 * @file sufferingLogic.ts
 * @description Utility functions that determine the visual and textual feedback
 * for the "Suffering Button" component based on the number of clicks.
 */

/**
 * Calculates a color that transitions from blue to red based on a step count.
 *
 * This function takes a step number (representing the number of clicks) and
 * calculates an RGB color. As the step count increases, the color shifts from a
 * calm blue/cyan towards a more intense red, visually representing increasing "suffering."
 *
 * @param {number} step - The current step count (e.g., number of clicks).
 * @returns {string} An RGB color string (e.g., "rgb(139, 0, 0)").
 */
export const getSufferingColor = (step: number): string => {
  const intensity = step / 100;
  const r = Math.floor(intensity * 139);
  const g = Math.floor((1 - intensity) * 180);
  const b = Math.floor((1 - intensity) * 200);
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Selects a text phrase to display based on the current step count.
 *
 * This function retrieves a specific phrase from an array based on the `step` index.
 * If the step count exceeds the number of available phrases, it returns a final,
 * conclusive message. This is used to show the "Suffering Button's" thoughts.
 *
 * @param {number} step - The current step count, used as an index.
 * @param {string[]} phrases - An array of phrases to choose from.
 * @param {string} finalMessage - The message to display when the step count exceeds the available phrases.
 * @returns {string} The selected phrase or the final message.
 */
export const getSufferingText = (step: number, phrases: string[], finalMessage: string): string => {
  if (step >= phrases.length) return finalMessage;
  return phrases[step];
};
