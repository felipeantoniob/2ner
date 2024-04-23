import type { Pitch } from "../types";
import frequencyToNote from "../utils/frequencyToNote";

type TunerProps = {
  handleStart: () => void;
  handleStop: () => void;
  pitch: Pitch;
};

function Tuner({ handleStart, handleStop, pitch }: TunerProps) {
  const note = pitch.frequency === 0 ? null : frequencyToNote(pitch.frequency);

  return (
    <div className="mx-auto w-full max-w-xl flex-col bg-slate-800">
      <div className="flex justify-center gap-2">
        <button
          className="rounded-lg bg-green-800 px-4 py-2"
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className="rounded-lg bg-red-800 px-4 py-2"
          onClick={handleStop}
        >
          Stop
        </button>
      </div>
      <p className="text-end text-lg">{pitch.frequency} Hz</p>
      <p className="text-end text-lg">{Math.round(pitch.decibels)}dB</p>
      <div
        className="mx-auto h-16 w-16 rounded-full"
        style={{
          backgroundColor:
            pitch.clarity < 85
              ? "#787878"
              : note && Math.abs(note.cents) > 10
                ? "red"
                : "green",
        }}
      />
      <div
        className={`mx-auto flex h-24 w-24 flex-row ${pitch.clarity > 85 ? "text-slate-100" : "text-transparent"}`}
      >
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
  );
}

export default Tuner;
