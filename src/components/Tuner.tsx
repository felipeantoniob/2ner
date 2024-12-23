import { useEffect, useRef } from "react";

import type { Pitch } from "~/types";
import type { Note } from "~/utils/frequencyToNote";
import { A0Frequency, C8Frequency } from "~/constants";
import frequencyToNote from "~/utils/frequencyToNote";

type TunerProps = {
  pitch: Pitch;
  transposition: number;
  displayAsSharp: boolean;
};

function Tuner({ pitch, transposition, displayAsSharp }: TunerProps) {
  const displayNote = useRef<Note | null>(null);

  useEffect(() => {
    if (pitch.frequency < A0Frequency || pitch.frequency > C8Frequency) {
      return;
    }

    displayNote.current = frequencyToNote(
      pitch.frequency,
      transposition,
      displayAsSharp,
    );
  }, [pitch.frequency, transposition, displayAsSharp]);

  return (
    <div className="z-40 flex h-full w-full flex-1 flex-col items-center justify-center">
      <div
        className={`duration-50 transition-all ${pitch.frequency === 0 ? "text-slate-500" : "text-slate-100"}`}
      >
        <div>
          <div className="mx-auto flex h-32 w-32 flex-row">
            <p className="flex h-full w-full items-center justify-center font-display text-9xl font-medium">
              {displayNote.current?.base}
            </p>
            <div className="flex h-full w-8 flex-col">
              <p className="flex flex-1 items-center justify-center font-display text-5xl">
                {displayNote.current?.accidental === "#" && "♯"}
                {displayNote.current?.accidental === "b" && "♭"}
              </p>
              <p className="flex flex-1 items-center justify-center font-display text-5xl">
                {displayNote.current?.octave}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-center font-display text-3xl">
              {displayNote.current?.cents}
            </p>
            <p className="text-center font-display text-xl">
              {displayNote.current && "cents"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tuner;
