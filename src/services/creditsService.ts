/**
 * @file creditsService.ts
 * @description A service for retrieving the list of third-party credits.
 */

import { CREDITS_DATA } from '@/constants/credits';
import type { Credit } from '@/types/credits';

/**
 * Retrieves the complete list of third-party credits for the application.
 *
 * This function acts as a simple data accessor, returning the static array
 * of credit information defined in `CREDITS_DATA`.
 *
 * @returns {Credit[]} An array of credit objects.
 */
export const getCredits = (): Credit[] => {
  return CREDITS_DATA;
};
