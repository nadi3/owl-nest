/**
 * Converts a percentage value to a hex color code.
 */
export const percentToHex = (percent: number): string => {
  const hue = percent * 3.6;
  return `hsl(${hue}, 35%, 70%)`;
};

/**
 * Compute the progress of the current time in years, months, days, hours, and minutes.
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
