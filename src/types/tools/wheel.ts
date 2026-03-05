/**
 * Represents a single choice on the wheel
 */
export interface WheelChoice {
  id: string;
  text: string;
  color: string;
  isActive: boolean;
}

/**
 * Global configuration for the Wheel of Destiny
 */
export interface WheelConfig {
  title: string;
  choices: WheelChoice[];
  maxChoices: number;
}
