import "./App.css";
import usePitch from "./hooks/usePitch";
import useInterval from "./hooks/useInterval";
import frequencyToNote from "./utils/frequencyToNote";

function App() {
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
    <>
      <button onClick={initPitchDetection}>Start</button>
      <button onClick={stopPitchDetection}>Stop</button>
      <div>Pitch is {pitch} Hz</div>
      <div>Clarity is {clarity}%</div>
      <div>{decibels.toFixed(2)}dB</div>
      <div
        style={{
          width: 50,
          height: 50,
          margin: "0 auto",
          borderRadius: 100,
          backgroundColor:
            clarity < 85
              ? "#787878"
              : Math.abs(note.cents) > 10
                ? "red"
                : "green",
        }}
      />
      {clarity > 85 && (
        <>
          <p style={{ fontSize: 32 }}>
            {pitch && note.name}
            {pitch && note.octave}
          </p>
          <div>{pitch && note.cents} cents</div>
        </>
      )}
    </>
  );
}

export default App;
