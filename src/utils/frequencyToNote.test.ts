import { expect, it } from "vitest";
import frequencyToNote from "./frequencyToNote";

it("should return the correct name", () => {
  expect(frequencyToNote(440).name).toBe("A");

  expect(frequencyToNote(450).name).toBe("A");

  expect(frequencyToNote(430).name).toBe("A");

  expect(frequencyToNote(700).name).toBe("F");
});

it("should return the correct octave", () => {
  expect(frequencyToNote(440).octave).toBe(4);

  expect(frequencyToNote(880).octave).toBe(5);

  expect(frequencyToNote(220).octave).toBe(3);

  expect(frequencyToNote(200).octave).toBe(3);
});

it("should return the correct cents", () => {
  expect(frequencyToNote(440).cents).toBe(0);

  expect(frequencyToNote(445).cents).toBe(20);

  expect(frequencyToNote(205).cents).toBe(-22);
});
