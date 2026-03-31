/**
 * @file waitMessageService.ts
 * @description A service for retrieving dynamic messages to display during the "Infinite Wait" game.
 */

import type { TFunction } from 'i18next';

/**
 * Retrieves a message to display based on the elapsed time in the Infinite Wait game.
 *
 * This function follows a specific logic to select a message:
 * 1.  It first checks if the current second corresponds to a specific, hardcoded
 *     "milestone" message in the translation files (e.g., for 1s, 5s, 10s).
 * 2.  If no milestone message is found, it checks if the current second is a multiple of 4.
 *     If it is, it selects a message from a "random pool" of generic phrases in a cyclical manner.
 * 3.  If neither of the above conditions is met, it returns an empty string, indicating
 *     that no new message should be displayed at this time.
 *
 * @param {number} time - The elapsed time in seconds.
 * @param {TFunction} t - The `i18next` translation function.
 * @returns {string} The selected message, or an empty string if no message is applicable.
 */
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
