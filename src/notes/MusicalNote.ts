export type BaseNote = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type Accidental = null | "#" | "b";

const NOTE_NAMES = [
  "C",
  "C#",
  "Db",
  "D",
  "D#",
  "Eb",
  "E",
  "F",
  "F#",
  "Gb",
  "G",
  "G#",
  "Ab",
  "A",
  "A#",
  "Bb",
  "B",
] as const;

type NoteName = (typeof NOTE_NAMES)[number];

interface IMusicalNote {
  base: BaseNote;
  accidental: Accidental;
  displayAsSharp: boolean;
  getNoteName(): { base: BaseNote; accidental: Accidental };
}

export class MusicalNote implements IMusicalNote {
  base: BaseNote;
  accidental: Accidental;
  displayAsSharp: boolean;

  private static sharpToFlatMap: {
    [key: string]: { base: BaseNote; accidental: Accidental };
  } = {
    "C#": { base: "D", accidental: "b" },
    "D#": { base: "E", accidental: "b" },
    "F#": { base: "G", accidental: "b" },
    "G#": { base: "A", accidental: "b" },
    "A#": { base: "B", accidental: "b" },
  };

  private static flatToSharpMap: {
    [key: string]: { base: BaseNote; accidental: Accidental };
  } = {
    Db: { base: "C", accidental: "#" },
    Eb: { base: "D", accidental: "#" },
    Gb: { base: "F", accidental: "#" },
    Ab: { base: "G", accidental: "#" },
    Bb: { base: "A", accidental: "#" },
  };

  constructor(noteName: NoteName, displayAsSharp: boolean = true) {
    this.base = noteName[0] as BaseNote;
    this.accidental = noteName.includes("#")
      ? "#"
      : noteName.includes("b")
        ? "b"
        : null;
    this.displayAsSharp = displayAsSharp;
  }

  getNoteName(): { base: BaseNote; accidental: Accidental } {
    if (this.accidental === null) {
      return { base: this.base, accidental: this.accidental };
    }

    const key = `${this.base}${this.accidental}`;
    const map = this.displayAsSharp
      ? MusicalNote.flatToSharpMap
      : MusicalNote.sharpToFlatMap;
    const mappedNote = map[key];
    return mappedNote || { base: this.base, accidental: this.accidental };
  }
}
