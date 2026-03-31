/**
 * @file infiniteWaitService.ts
 * @description A service for managing the global high score for the "Infinite Wait" widget.
 * This service uses `localStorage` to persist the record.
 */

import type { InfiniteWaitRecord } from '@/types/useless/infiniteWait';

/**
 * The key used to store the infinite wait record in `localStorage`.
 * @constant {string}
 */
const RECORD_KEY = 'owl_nest_infinite_wait_record';

/**
 * Retrieves the current global record for the Infinite Wait game from `localStorage`.
 * If no record is found, it returns a default record with 0 seconds.
 *
 * @returns {InfiniteWaitRecord} The current global record.
 */
export const getGlobalRecord = (): InfiniteWaitRecord => {
  const stored = localStorage.getItem(RECORD_KEY);
  return stored ? JSON.parse(stored) : { seconds: 0, timestamp: Date.now() };
};

/**
 * Saves a new global record if the provided time is greater than the current record.
 * The new record, including the time and a timestamp, is saved to `localStorage`.
 *
 * @param {number} seconds - The new time in seconds to potentially save as the record.
 */
export const saveNewRecord = (seconds: number): void => {
  const current = getGlobalRecord();
  if (seconds > current.seconds) {
    localStorage.setItem(
      RECORD_KEY,
      JSON.stringify({
        seconds,
        timestamp: Date.now(),
      })
    );
  }
};
