/**
 * @file timeUtils.ts
 * @description A collection of utility functions for calculating and converting time-based progress.
 * Used by the "Time Progress" widget.
 */

/**
 * Converts a percentage value into an HSL color string.
 *
 * This function maps a percentage (0-100) to a hue value on the HSL color wheel (0-360).
 * It's used to create a color gradient for the progress bars, transitioning through
 * different colors as the percentage increases.
 *
 * @param {number} percent - The input percentage (0-100).
 * @returns {string} An HSL color string (e.g., "hsl(180, 35%, 70%)").
 */
export const percentToHex = (percent: number): string => {
  const hue = percent * 3.6;
  return `hsl(${hue}, 35%, 70%)`;
};

/**
 * Calculates the progress of the current time across different time units.
 *
 * This function determines the percentage completion for the current year, month,
 * day, hour, and minute. It's called repeatedly by the `TimeProgressWidget` to
 * provide a real-time display of time's passage.
 *
 * @returns {{
 *   yearProgress: number,
 *   monthProgress: number,
 *   dayProgress: number,
 *   hourProgress: number,
 *   minProgress: number
 * }} An object containing the progress percentages for each time unit.
 */
export const getTimeProgress = () => {
  const now = new Date();

  // Year
  const startYear = new Date(now.getFullYear(), 0, 1);
  const endYear = new Date(now.getFullYear() + 1, 0, 1);
  const yearProgress =
    ((now.getTime() - startYear.getTime()) / (endYear.getTime() - startYear.getTime())) * 100;

  // Month
  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const monthProgress =
    ((now.getTime() - startMonth.getTime()) / (endMonth.getTime() - startMonth.getTime())) * 100;

  // Day
  const dayProgress =
    ((now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400) * 100;

  // Hour
  const hourProgress = ((now.getMinutes() * 60 + now.getSeconds()) / 3600) * 100;

  // Minute
  const minProgress = (now.getSeconds() / 60) * 100;

  return { yearProgress, monthProgress, dayProgress, hourProgress, minProgress };
};
