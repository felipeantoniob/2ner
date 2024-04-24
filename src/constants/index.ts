import { PitchDetector } from "pitchy";
import type { Pitch } from "../types";

export const BUFFER_SIZE = 2048;

const MINIMUM_VOLUME_DECIBELS = -30;

export const detector = PitchDetector.forFloat32Array(BUFFER_SIZE);
detector.minVolumeDecibels = MINIMUM_VOLUME_DECIBELS;
detector.clarityThreshold = 0.95;

export const DEFAULT_PITCH = {
  frequency: 0,
  clarity: 0,
  decibels: -96,
} as Pitch;
