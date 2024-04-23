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
            <div className="flex h-full w-full items-center justify-center text-8xl">
              {note?.name}
            </div>
            <div className="flex h-full w-8 flex-col">
              <div className="flex flex-1 items-center justify-center text-4xl">
                {note?.accidental}
              </div>

              <div className="flex flex-1 items-center justify-center text-4xl">
                {note?.octave}
              </div>
            </div>
          </div>
          <p className="text-end text-lg">{note?.cents} cents</p>
        </div>
      </div>
    </div>
  );
}

export default Tuner;
