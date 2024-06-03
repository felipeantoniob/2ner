import { describe, expect, it } from "vitest";

import { MusicalNote } from "./MusicalNote";

describe("MusicalNote", () => {
  describe("Constructor", () => {
    it("should create a new MusicalNote instance with default values", () => {
      const note = new MusicalNote("C");
      expect(note.base).toBe("C");
      expect(note.accidental).toBeNull();
      expect(note.displayAsSharp).toBe(true);
    });

    it("should create a new MusicalNote instance with specified values", () => {
      const note = new MusicalNote("D#", false);
      expect(note.base).toBe("D");
      expect(note.accidental).toBe("#");
      expect(note.displayAsSharp).toBe(false);
    });
  });

  describe("getNoteName", () => {
    it("should return the note name without accidental", () => {
      const note = new MusicalNote("G#");
      expect(note.getNoteName()).toEqual({ base: "G", accidental: "#" });
    });

    it("should return the note name as is if accidental is null", () => {
      const note = new MusicalNote("F", false);
      expect(note.getNoteName()).toEqual({ base: "F", accidental: null });
    });

    it("should return the note name with specified accidental", () => {
      const note = new MusicalNote("Bb", false);
      expect(note.getNoteName()).toEqual({ base: "B", accidental: "b" });
    });

    it("should return the note name with displayAsSharp true", () => {
      const note = new MusicalNote("Eb");
      expect(note.getNoteName()).toEqual({ base: "D", accidental: "#" });
    });

    it("should return the note name with displayAsSharp true", () => {
      const note = new MusicalNote("Db", true);
      expect(note.getNoteName()).toEqual({ base: "C", accidental: "#" });
    });
  });
});
