export const getSufferingColor = (step: number): string => {
  const intensity = step / 100;
  const r = Math.floor(intensity * 139);
  const g = Math.floor((1 - intensity) * 180);
  const b = Math.floor((1 - intensity) * 200);
  return `rgb(${r}, ${g}, ${b})`;
};

export const getSufferingText = (step: number, phrases: string[], finalMessage: string): string => {
  if (step >= phrases.length) return finalMessage;
  return phrases[step];
};
