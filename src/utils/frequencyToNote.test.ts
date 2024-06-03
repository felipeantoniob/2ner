import { expect, it } from "vitest";

import type { Note } from "./frequencyToNote";
import frequencyToNote from "./frequencyToNote";

const NOTES_C3_TO_C6 = [
  {
    frequency: 130.81,
    note: { base: "C", octave: 3, cents: 0, accidental: null },
  },
  {
    frequency: 138.59,
    note: { base: "C", octave: 3, cents: 0, accidental: "#" },
  },
  {
    frequency: 146.83,
    note: { base: "D", octave: 3, cents: 0, accidental: null },
  },
  {
    frequency: 155.56,
    note: { base: "D", octave: 3, cents: 0, accidental: "#" },
  },
  {
    frequency: 164.81,
    note: { base: "E", octave: 3, cents: 0, accidental: null },
  },
  {
    frequency: 174.61,
    note: { base: "F", octave: 3, cents: 0, accidental: null },
  },
  {
    frequency: 185.0,
    note: { base: "F", octave: 3, cents: 0, accidental: "#" },
  },
  {
    frequency: 196.0,
    note: { base: "G", octave: 3, cents: 0, accidental: null },
  },
  {
    frequency: 207.65,
    note: { base: "G", octave: 3, cents: 0, accidental: "#" },
  },
  {
    frequency: 220.0,
    note: { base: "A", octave: 3, cents: 0, accidental: null },
  },
  {
    frequency: 233.08,
    note: { base: "A", octave: 3, cents: 0, accidental: "#" },
  },
  {
    frequency: 246.94,
    note: { base: "B", octave: 3, cents: 0, accidental: null },
  },
  {
    frequency: 261.63,
    note: { base: "C", octave: 4, cents: 0, accidental: null },
  },
  {
    frequency: 277.18,
    note: { base: "C", octave: 4, cents: 0, accidental: "#" },
  },
  {
    frequency: 293.67,
    note: { base: "D", octave: 4, cents: 0, accidental: null },
  },
  {
    frequency: 311.13,
    note: { base: "D", octave: 4, cents: 0, accidental: "#" },
  },
  {
    frequency: 329.63,
    note: { base: "E", octave: 4, cents: 0, accidental: null },
  },
  {
    frequency: 349.23,
    note: { base: "F", octave: 4, cents: 0, accidental: null },
  },
  {
    frequency: 369.99,
    note: { base: "F", octave: 4, cents: 0, accidental: "#" },
  },
  {
    frequency: 392.0,
    note: { base: "G", octave: 4, cents: 0, accidental: null },
  },
  {
    frequency: 415.3,
    note: { base: "G", octave: 4, cents: 0, accidental: "#" },
  },
  {
    frequency: 440.0,
    note: { base: "A", octave: 4, cents: 0, accidental: null },
  },
  {
    frequency: 466.16,
    note: { base: "A", octave: 4, cents: 0, accidental: "#" },
  },
  {
    frequency: 493.88,
    note: { base: "B", octave: 4, cents: 0, accidental: null },
  },
  {
    frequency: 523.25,
    note: { base: "C", octave: 5, cents: 0, accidental: null },
  },
  {
    frequency: 554.37,
    note: { base: "C", octave: 5, cents: 0, accidental: "#" },
  },
  {
    frequency: 587.33,
    note: { base: "D", octave: 5, cents: 0, accidental: null },
  },
  {
    frequency: 622.25,
    note: { base: "D", octave: 5, cents: 0, accidental: "#" },
  },
  {
    frequency: 659.25,
    note: { base: "E", octave: 5, cents: 0, accidental: null },
  },
  {
    frequency: 698.46,
    note: { base: "F", octave: 5, cents: 0, accidental: null },
  },
  {
    frequency: 739.99,
    note: { base: "F", octave: 5, cents: 0, accidental: "#" },
  },
  {
    frequency: 783.99,
    note: { base: "G", octave: 5, cents: 0, accidental: null },
  },
  {
    frequency: 830.61,
    note: { base: "G", octave: 5, cents: 0, accidental: "#" },
  },
  {
    frequency: 880.0,
    note: { base: "A", octave: 5, cents: 0, accidental: null },
  },
  {
    frequency: 932.33,
    note: { base: "A", octave: 5, cents: 0, accidental: "#" },
  },
  {
    frequency: 987.77,
    note: { base: "B", octave: 5, cents: 0, accidental: null },
  },
  {
    frequency: 1046.5,
    note: { base: "C", octave: 6, cents: 0, accidental: null },
  },
];

it("should return correct note for a given frequency", () => {
  NOTES_C3_TO_C6.map((note) => {
    expect(frequencyToNote(note.frequency)).toEqual(note.note);
  });

  const A0Frequency = 27.5; // A0 (lowest supported frequency)
  const A0ExpectedNote: Note = {
    base: "A",
    octave: 0,
    cents: 0,
    accidental: null,
  };
  expect(frequencyToNote(A0Frequency)).toEqual(A0ExpectedNote);

  const C8Frequency = 4186; // C8 (highest supported frequency)
  const C8ExpectedNote: Note = {
    base: "C",
    octave: 8,
    cents: 0,
    accidental: null,
  };
  expect(frequencyToNote(C8Frequency)).toEqual(C8ExpectedNote);
});

it("should return correct cents for frequencies that are not exact notes", () => {
  // Test case 1: A frequency close to C4 (261.63 Hz)
  const frequency1 = 263; // Close to C4
  const expectedNote1: Note = {
    base: "C",
    octave: 4,
    cents: 9,
    accidental: null,
  };
  expect(frequencyToNote(frequency1)).toEqual(expectedNote1);

  // Test case 2: A frequency close to D#5 (622.25 Hz)
  const frequency2 = 640; // Close to D#5
  const expectedNote2: Note = {
    base: "D",
    octave: 5,
    cents: 49,
    accidental: "#",
  };
  expect(frequencyToNote(frequency2)).toEqual(expectedNote2);

  // Test case 3: A frequency close to G6 (1567.98 Hz)
  const frequency3 = 1565; // Close to G6
  const expectedNote3: Note = {
    base: "G",
    octave: 6,
    cents: -3,
    accidental: null,
  };
  expect(frequencyToNote(frequency3)).toEqual(expectedNote3);
});

it(" should return transposed notes correctly ", () => {
  // Test case 1: Transpose up 2 semitones
  const frequency1 = 440; // A4
  const transpose1 = 2;
  const expectedNote1: Note = {
    base: "B",
    octave: 4,
    cents: 0,
    accidental: null,
  };
  expect(frequencyToNote(frequency1, transpose1)).toEqual(expectedNote1);

  // Test case 2: Transpose down 1 semitone
  const frequency2 = 493.88; // B4
  const transpose2 = -1;
  const expectedNote2: Note = {
    base: "A",
    octave: 4,
    cents: 0,
    accidental: "#",
  };
  expect(frequencyToNote(frequency2, transpose2)).toEqual(expectedNote2);

  // Test case 3: Transpose up 1 octave
  const frequency3 = 440; // A4
  const transpose3 = 12;
  const expectedNote3: Note = {
    base: "A",
    octave: 5,
    cents: 0,
    accidental: null,
  };
  expect(frequencyToNote(frequency3, transpose3)).toEqual(expectedNote3);
});

it("should return correct notes for frequencies with different concert pitches", () => {
  expect(frequencyToNote(432, 0, true, 432)).toEqual({
    base: "A",
    accidental: null,
    octave: 4,
    cents: 0,
  });

  expect(frequencyToNote(446, 0, true, 446)).toEqual({
    base: "A",
    accidental: null,
    octave: 4,
    cents: 0,
  });

  expect(frequencyToNote(256.87, 0, true, 432)).toEqual({
    base: "C",
    accidental: null,
    octave: 4,
    cents: 0,
  });

  expect(frequencyToNote(265.19, 0, true, 446)).toEqual({
    base: "C",
    accidental: null,
    octave: 4,
    cents: 0,
  });

  expect(frequencyToNote(484.9, 0, true, 432)).toEqual({
    base: "B",
    accidental: null,
    octave: 4,
    cents: 0,
  });

  expect(frequencyToNote(500.62, 0, true, 446)).toEqual({
    base: "B",
    accidental: null,
    octave: 4,
    cents: 0,
  });

  expect(frequencyToNote(1294.54, 0, true, 432)).toEqual({
    base: "E",
    accidental: null,
    octave: 6,
    cents: 0,
  });

  expect(frequencyToNote(1336.49, 0, true, 446)).toEqual({
    base: "E",
    accidental: null,
    octave: 6,
    cents: 0,
  });
});
