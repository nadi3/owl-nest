import type { InfiniteWaitRecord } from '@/types/useless/infiniteWait';

const RECORD_KEY = 'owl_nest_infinite_wait_record';

export const getGlobalRecord = (): InfiniteWaitRecord => {
  const stored = localStorage.getItem(RECORD_KEY);
  return stored ? JSON.parse(stored) : { seconds: 0, timestamp: Date.now() };
};

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
