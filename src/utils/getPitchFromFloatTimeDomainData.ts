import calculateDecibels from "./calculateDecibels";
import { detector } from "../constants";
import type { Pitch } from "../types";

function getPitchFromFloatTimeDomainData(
  floatTimeDomainData: Float32Array,
  sampleRate: number,
): Pitch {
  const [frequency, clarity] = detector.findPitch(
    floatTimeDomainData,
    sampleRate,
  );

  const roundedFrequency = Math.round(frequency * 10) / 10;
  const roundedClarity = Math.round(clarity * 100);
  const decibels = calculateDecibels(floatTimeDomainData);

  return {
    frequency: roundedFrequency,
    clarity: roundedClarity,
    decibels,
  };
}

export default getPitchFromFloatTimeDomainData;
