import { useEffect, useState } from 'react';

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

export const useKonamiCode = (callback: () => void) => {
  const [input, setInput] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key].slice(-KONAMI_CODE.length);
      setInput(newInput);
      if (newInput.join('') === KONAMI_CODE.join('')) {
        callback();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, callback]);
};
