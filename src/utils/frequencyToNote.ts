const NOTES = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
] as const;

type NoteName = (typeof NOTES)[number];

export interface Note {
  name: NoteName;
  octave: number;
  cents: number;
}

// https://newt.phys.unsw.edu.au/jw/notes.html

function frequencyToNote(frequency: number): Note {
  const A4Frequency = 440;
  const semitoneRatio = Math.pow(2, 1 / 12);

  const semitonesFromA4 = 12 * Math.log2(frequency / A4Frequency);
  const closestSemitone = Math.round(semitonesFromA4);

  const closestNoteFrequency =
    A4Frequency * Math.pow(semitoneRatio, closestSemitone);

  const octavesFromA4 = Math.log2(frequency / A4Frequency);
  const closestOctave = Math.round(octavesFromA4);

  const centsFromClosestNote =
    closestNoteFrequency === 0
      ? 0
      : 1200 * (Math.log(frequency / closestNoteFrequency) / Math.log(2));
  const cents = Math.round(centsFromClosestNote);

  const noteIndex = (closestSemitone + NOTES.length) % NOTES.length;

  const name = NOTES[noteIndex < 0 ? noteIndex + 12 : noteIndex];
  const octave = 4 + closestOctave;

  return { name, octave, cents };
}

export default frequencyToNote;

export function rotateArrayToStart(
  array: readonly NoteName[],
  startElement: NoteName,
): NoteName[] {
  const startIndex = array.indexOf(startElement);
  return [...array.slice(startIndex), ...array.slice(0, startIndex)];
}
