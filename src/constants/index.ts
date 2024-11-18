import { PitchDetector } from "pitchy";

import type { Pitch } from "~/types";

export const BUFFER_SIZE = 2048;

const MINIMUM_VOLUME_DECIBELS = -20;

export const detector = PitchDetector.forFloat32Array(BUFFER_SIZE);
detector.minVolumeDecibels = MINIMUM_VOLUME_DECIBELS;
detector.clarityThreshold = 0.95;

export const DEFAULT_PITCH = {
  frequency: 0,
  clarity: 0,
  decibels: -96,
} as Pitch;

export const A0Frequency = 27.5; // Lowest note frequency
export const C4Frequency = 261.63; // Middle C frequency
export const A4Frequency = 440; // Concert pitch frequency
export const C8Frequency = 4186; // Highest note frequency
