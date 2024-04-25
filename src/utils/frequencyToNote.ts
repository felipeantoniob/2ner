import {
  A0Frequency,
  A4Frequency,
  C4Frequency,
  C8Frequency,
} from "@/constants";

const NOTES = [
  {
    name: "A",
    baseNote: "A",
    accidental: null,
  },
  {
    name: "A#",
    baseNote: "A",
    accidental: "#",
  },
  {
    name: "B",
    baseNote: "B",
    accidental: null,
  },
  {
    name: "C",
    baseNote: "C",
    accidental: null,
  },
  {
    name: "C#",
    baseNote: "C",
    accidental: "#",
  },

  {
    name: "D",
    baseNote: "D",
    accidental: null,
  },
  {
    name: "D#",
    baseNote: "D",
    accidental: "#",
  },

  {
    name: "E",
    baseNote: "E",
    accidental: null,
  },
  {
    name: "F",
    baseNote: "F",
    accidental: null,
  },
  {
    name: "F#",
    baseNote: "F",
    accidental: "#",
  },
  {
    name: "G",
    baseNote: "G",
    accidental: null,
  },
  {
    name: "G#",
    baseNote: "G",
    accidental: "#",
  },
] as const;

type NoteName = (typeof NOTES)[number]["name"];

export interface Note {
  name: NoteName;
  octave: number;
  cents: number;
  accidental: "#" | null;
}

const SEMITONES_IN_OCTAVE = 12;
const CENTS_IN_SEMITONE = 100;
const semitoneRatio = Math.pow(2, 1 / SEMITONES_IN_OCTAVE);

// https://newt.phys.unsw.edu.au/jw/notes.html

function frequencyToNote(frequency: number): Note {
  const limitedFrequency = Math.min(
    Math.max(frequency, A0Frequency),
    C8Frequency,
  );
  frequency = limitedFrequency;

  const semitonesFromA4 =
    SEMITONES_IN_OCTAVE * Math.log2(frequency / A4Frequency);
  const closestSemitone = Math.round(semitonesFromA4);

  const closestNoteFrequency =
    A4Frequency * Math.pow(semitoneRatio, closestSemitone);

  const octavesFromC4 = Math.log2(frequency / C4Frequency);
  const roundedOctave = Math.round(octavesFromC4 * 100) / 100;
  const octave = Math.floor(roundedOctave) + 4;

  const centsFromClosestNote =
    closestNoteFrequency === 0
      ? 0
      : SEMITONES_IN_OCTAVE *
        CENTS_IN_SEMITONE *
        (Math.log(frequency / closestNoteFrequency) / Math.log(2));
  const roundedCents = Math.round(Math.round(centsFromClosestNote * 100) / 100);
  const cents = Object.is(roundedCents, -0) ? 0 : roundedCents;

  const noteIndex = (closestSemitone + NOTES.length) % NOTES.length;

  const note =
    NOTES[noteIndex < 0 ? noteIndex + SEMITONES_IN_OCTAVE : noteIndex];

  return { name: note.baseNote, octave, cents, accidental: note.accidental };
}

export default frequencyToNote;

export function rotateArrayToStart(
  array: readonly NoteName[],
  startElement: NoteName,
): NoteName[] {
  const startIndex = array.indexOf(startElement);
  return [...array.slice(startIndex), ...array.slice(0, startIndex)];
}
