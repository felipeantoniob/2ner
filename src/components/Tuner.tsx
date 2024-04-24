import type { Pitch } from "../types";
import frequencyToNote from "../utils/frequencyToNote";

type TunerProps = {
  pitch: Pitch;
};

function Tuner({ pitch }: TunerProps) {
  const note = pitch.frequency === 0 ? null : frequencyToNote(pitch.frequency);

  return (
    <div className="z-40 flex h-full w-full flex-1 flex-col items-center justify-center">
      <div
        className={`transition-all duration-200 ${pitch.clarity > 85 ? "text-slate-100" : "text-transparent"}`}
      >
        <div>
          <div className="mx-auto flex h-24 w-24 flex-row">
            <p className="flex h-full w-full items-center justify-center font-display text-8xl font-medium">
              {note?.name}
            </p>
            <div className="flex h-full w-8 flex-col">
              <p className="flex flex-1 items-center justify-center font-display text-4xl">
                {note?.accidental}
              </p>
              <p className="flex flex-1 items-center justify-center font-display text-4xl">
                {note?.octave}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-center font-display text-2xl">{note?.cents}</p>
            <p className="text-center font-display text-base">cents</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tuner;
