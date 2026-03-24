import { create } from 'zustand';
import type { WheelChoice, WheelConfig } from '@/types/tools/wheel.ts';
import { v4 as uuidv4 } from 'uuid';
import { getOwlTheme } from '@/theme/theme.ts';
import i18n from '@/i18n/config.ts';

interface WheelState extends WheelConfig {
  isSpinning: boolean;
  setChoices: (choices: WheelChoice[]) => void;
  updateTitle: (title: string) => void;
  toggleChoice: (id: string) => void;
  setIsSpinning: (spinning: boolean) => void;
  addChoice: (text: string) => void;
  removeChoice: (id: string) => void;
  updateChoice: (id: string, updates: Partial<WheelChoice>) => void;
}

const initialTheme = getOwlTheme('light');

export const useWheelStore = create<WheelState>((set) => ({
  title: i18n.t('tools.wheel.default_title'),
  choices: [
    {
      id: '1',
      text: i18n.t('tools.wheel.default_choice_1'),
      color: initialTheme.palette.primary.main,
      isActive: true,
    },
    {
      id: '2',
      text: i18n.t('tools.wheel.default_choice_2'),
      color: initialTheme.palette.secondary.main,
      isActive: true,
    },
    {
      id: '3',
      text: i18n.t('tools.wheel.default_choice_3'),
      color: initialTheme.palette.success.main,
      isActive: true,
    },
  ],
  maxChoices: 16,
  isSpinning: false,
  setChoices: (choices) => set({ choices }),
  updateTitle: (title) => set({ title }),
  toggleChoice: (id) =>
    set((state) => ({
      choices: state.choices.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)),
    })),
  setIsSpinning: (isSpinning) => set({ isSpinning }),
  addChoice: (text) =>
    set((state) => {
      if (state.choices.length >= 16) return state;
      const newChoice = {
        id: uuidv4(),
        text,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        isActive: true,
      };
      return { choices: [...state.choices, newChoice] };
    }),

  removeChoice: (id) =>
    set((state) => ({
      choices: state.choices.filter((c) => c.id !== id),
    })),

  updateChoice: (id, updates) =>
    set((state) => ({
      choices: state.choices.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),
}));
