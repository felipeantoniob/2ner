const NOTE_OBJECTS = [
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

type NoteName = (typeof NOTE_OBJECTS)[number]["name"];

export interface Note {
  name: NoteName;
  octave: number;
  cents: number;
  accidental: "#" | null;
}

// https://newt.phys.unsw.edu.au/jw/notes.html

function frequencyToNote(frequency: number): Note {
  const limitedFrequency = Math.min(Math.max(frequency, 27.5), 4186);
  frequency = limitedFrequency;

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

  const noteIndex =
    (closestSemitone + NOTE_OBJECTS.length) % NOTE_OBJECTS.length;

  const note = NOTE_OBJECTS[noteIndex < 0 ? noteIndex + 12 : noteIndex];
  const octave = 4 + closestOctave;

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
