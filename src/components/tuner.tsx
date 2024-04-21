import useInterval from "../hooks/useInterval";
import usePitch from "../hooks/usePitch";
import frequencyToNote from "../utils/frequencyToNote";

function Tuner() {
  const {
    updatePitch,
    initPitchDetection,
    stopPitchDetection,
    pitch,
    clarity,
    decibels,
  } = usePitch();

  const note = frequencyToNote(pitch);

  useInterval(async () => {
    await updatePitch();
  }, 100);

  return (
    <div className="flex-col">
      <div className="flex justify-center gap-2">
        <button
          className="rounded-lg bg-green-800 px-4 py-2"
          onClick={initPitchDetection}
        >
          Start
        </button>
        <button
          className="rounded-lg bg-red-800 px-4 py-2"
          onClick={stopPitchDetection}
        >
          Stop
        </button>
      </div>
      <p className="text-end text-lg">{pitch} Hz</p>
      <p className="text-end text-lg">{clarity}%</p>
      <p className="text-end text-lg">{Math.round(decibels)}dB</p>
      <div
        className="mx-auto h-16 w-16 rounded-full"
        style={{
          backgroundColor:
            clarity < 85
              ? "#787878"
              : Math.abs(note.cents) > 10
                ? "red"
                : "green",
        }}
      />
      <div className={clarity > 85 ? "text-slate-100" : "text-slate-500"}>
        <p className="text-center text-4xl">
          {note.name}
          {note.octave}
        </p>
        <p className="text-end text-lg">{note.cents} cents</p>
      </div>
    </div>
  );
}

export default Tuner;
