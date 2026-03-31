/**
 * @file useKonamiCode.ts
 * @description A custom hook that listens for the Konami Code sequence and
 * triggers a callback when it's successfully entered.
 */

import { useEffect, useState } from 'react';

/**
 * The sequence of keys that make up the classic Konami Code.
 * @constant {string[]}
 */
const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/**
 * A custom hook that detects when the user enters the Konami Code.
 *
 * This hook sets up a global `keydown` event listener and tracks the most recent
 * key presses. When the sequence of keys matches the `KONAMI_CODE`, it invokes
 * the provided `callback` function.
 *
 * The hook is careful to manage its own state and cleans up the event listener
 * when the component unmounts.
 *
 * @param {() => void} callback - The function to be called when the Konami Code is successfully entered.
 */
export const useKonamiCode = (callback: () => void) => {
  const [input, setInput] = useState<string[]>([]);

  useEffect(() => {
    /**
     * Handles the `keydown` event.
     * It appends the new key to the input buffer, keeps the buffer at the
     * correct length, and checks if the current sequence matches the Konami Code.
     * @param {KeyboardEvent} e - The keyboard event.
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key].slice(-KONAMI_CODE.length);
      setInput(newInput);
      if (newInput.join('') === KONAMI_CODE.join('')) {
        callback();
      }
    };
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [input, callback]);
};
