import {
  A0Frequency,
  A4Frequency,
  C4Frequency,
  C8Frequency,
} from "@/constants";
import {
  type Accidental,
  type BaseNote,
  MusicalNote,
} from "@/notes/MusicalNote";

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

export interface Note {
  base: BaseNote;
  accidental: Accidental;
  octave: number;
  cents: number;
}

const SEMITONES_IN_OCTAVE = 12;
const CENTS_IN_SEMITONE = 100;
const semitoneRatio = Math.pow(2, 1 / SEMITONES_IN_OCTAVE);

// https://newt.phys.unsw.edu.au/jw/notes.html

function frequencyToNote(
  frequency: number,
  transpose = 0,
  displayAsSharp: boolean,
): Note {
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

  const transposedFrequency =
    A4Frequency *
    Math.pow(2, (closestSemitone + transpose) / SEMITONES_IN_OCTAVE);

  const octavesFromC4 = Math.log2(transposedFrequency / C4Frequency);
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

  const noteIndex = (closestSemitone + NOTES.length + transpose) % NOTES.length;

  const noteName =
    NOTES[noteIndex < 0 ? noteIndex + SEMITONES_IN_OCTAVE : noteIndex];

  const note = new MusicalNote(noteName, displayAsSharp).getNoteName();

  return { base: note.base, accidental: note.accidental, octave, cents };
}

export default frequencyToNote;
