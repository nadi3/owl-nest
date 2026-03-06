import type { TFunction } from 'i18next';

export const getWaitMessage = (time: number, t: TFunction): string => {
  const seconds = Math.floor(time);

  const milestone = t(`useless.wait-button.milestones.${seconds}`, { defaultValue: '' });
  if (milestone) return milestone;
  if (seconds % 4 === 0) {
    const pool = t('useless.wait-button.random_pool', { returnObjects: true }) as string[];
    if (Array.isArray(pool)) {
      const index = Math.floor((seconds / 4) % pool.length);
      return pool[index];
    }
  }

  return '';
};
