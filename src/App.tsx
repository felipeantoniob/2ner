import "./App.css";
import usePitch from "./hooks/usePitch";
import useInterval from "./hooks/useInterval";

function App() {
  const {
    updatePitch,
    initPitchDetection,
    stopPitchDetection,
    pitch,
    clarity,
  } = usePitch();

  useInterval(async () => {
    await updatePitch();
  }, 100);

  return (
    <>
      <button onClick={initPitchDetection}>Init pitch detection</button>
      <button onClick={stopPitchDetection}>Stop pitch detection</button>
      <div>Pitch is {pitch} Hz</div>
      <div>Clarity is {clarity}%</div>
    </>
  );
}

export default App;
