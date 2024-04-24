import { useEffect, useRef } from "react";
import type { Pitch } from "../types";
import frequencyToNote, { Note } from "../utils/frequencyToNote";

type TunerProps = {
  pitch: Pitch;
};

function Tuner({ pitch }: TunerProps) {
  const displayNote = useRef<Note | null>(null);

  useEffect(() => {
    if (pitch.frequency === 0) {
      return;
    }

    displayNote.current = frequencyToNote(pitch.frequency);
  }, [pitch.frequency]);

  return (
    <div className="z-40 flex h-full w-full flex-1 flex-col items-center justify-center">
      <div
        className={`duration-50 transition-all ${pitch.frequency === 0 ? "text-slate-500" : "text-slate-100"}`}
      >
        <div>
          <div className="mx-auto flex h-24 w-24 flex-row">
            <p className="flex h-full w-full items-center justify-center font-display text-8xl font-medium">
              {displayNote.current?.name}
            </p>
            <div className="flex h-full w-8 flex-col">
              <p className="flex flex-1 items-center justify-center font-display text-4xl">
                {displayNote.current?.accidental}
              </p>
              <p className="flex flex-1 items-center justify-center font-display text-4xl">
                {displayNote.current?.octave}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-center font-display text-2xl">
              {displayNote.current?.cents}
            </p>
            <p className="text-center font-display text-base">
              {displayNote.current && "cents"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tuner;
