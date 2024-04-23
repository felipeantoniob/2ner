import type { Pitch } from "../types";
import frequencyToNote from "../utils/frequencyToNote";

type TunerProps = {
  handleStart: () => void;
  handleStop: () => void;
  pitch: Pitch;
};

function Tuner({ handleStart, handleStop, pitch }: TunerProps) {
  const note = frequencyToNote(pitch.frequency);

  return (
    <div className="flex-col">
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
      <p className="text-end text-lg">{pitch.clarity}%</p>
      <p className="text-end text-lg">{Math.round(pitch.decibels)}dB</p>
      <div
        className="mx-auto h-16 w-16 rounded-full"
        style={{
          backgroundColor:
            pitch.clarity < 85
              ? "#787878"
              : Math.abs(note.cents) > 10
                ? "red"
                : "green",
        }}
      />
      <div className={pitch.clarity > 85 ? "text-slate-100" : "text-slate-500"}>
        <p className="text-center text-4xl">
          {note.name}
          {note.octave > 0 && note.octave}
        </p>
        <p className="text-end text-lg">{note.cents} cents</p>
      </div>
    </div>
  );
}

export default Tuner;
