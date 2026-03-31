/**
 * @file useWheelStore.ts
 * @description A Zustand store for managing the state of the "Wheel of Destiny" tool.
 */

import { create } from 'zustand';
import type { WheelChoice, WheelConfig } from '@/types/tools/wheel.ts';
import { v4 as uuidv4 } from 'uuid';
import { getOwlTheme } from '@/theme/theme.ts';
import i18n from '@/i18n/config.ts';

/**
 * Defines the state and actions for the Wheel of Destiny tool.
 * @interface WheelState
 * @extends {WheelConfig}
 */
interface WheelState extends WheelConfig {
  /**
   * A boolean flag indicating whether the wheel is currently spinning.
   * @type {boolean}
   */
  isSpinning: boolean;
  /**
   * Replaces the entire list of choices with a new one.
   * @param {WheelChoice[]} choices - The new array of choices.
   */
  setChoices: (choices: WheelChoice[]) => void;
  /**
   * Updates the title of the wheel.
   * @param {string} title - The new title.
   */
  updateTitle: (title: string) => void;
  /**
   * Toggles the `isActive` state of a specific choice by its ID.
   * @param {string} id - The ID of the choice to toggle.
   */
  toggleChoice: (id: string) => void;
  /**
   * Sets the spinning status of the wheel.
   * @param {boolean} spinning - The new spinning status.
   */
  setIsSpinning: (spinning: boolean) => void;
  /**
   * Adds a new choice to the list with a random color.
   * The action is ignored if the number of choices has reached the `maxChoices` limit.
   * @param {string} text - The text for the new choice.
   */
  addChoice: (text: string) => void;
  /**
   * Removes a choice from the list by its ID.
   * @param {string} id - The ID of the choice to remove.
   */
  removeChoice: (id: string) => void;
  /**
   * Updates one or more properties of a specific choice.
   * @param {string} id - The ID of the choice to update.
   * @param {Partial<WheelChoice>} updates - An object containing the properties to update.
   */
  updateChoice: (id: string, updates: Partial<WheelChoice>) => void;
}

const initialTheme = getOwlTheme('light');

/**
 * A Zustand store that holds the state for the "Wheel of Destiny" tool.
 *
 * This store manages the wheel's title, the list of choices (including their text,
 * color, and active status), and the spinning state. It provides a comprehensive
 * set of actions for adding, removing, updating, and toggling choices.
 *
 * @constant
 */
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
