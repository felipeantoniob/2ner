import Oscilloscope from "./components/Oscilloscope";
import Tuner from "./components/Tuner";
import useFloatTimeDomainData from "./hooks/useFloatTimeDomainData";
import usePitch from "./hooks/usePitch";
import InitOverlay from "./components/InitOverlay";
import frequencyToNote from "./utils/frequencyToNote";

function App() {
  const floatTimeDomainData = useFloatTimeDomainData(100);
  const pitch = usePitch(100);

  const note = pitch.frequency === 0 ? null : frequencyToNote(pitch.frequency);

  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="flex h-1/2 items-center justify-center">
          <Tuner pitch={pitch} />
        </div>
        <div className="h-1/2"></div>
      </div>
      <Oscilloscope floatTimeDomainData={floatTimeDomainData} />
      <InitOverlay />
      <div className="fixed left-0 top-0 z-40 h-full w-full">
        <div
          className={`absolute inset-0 mx-auto w-1/2 bg-gradient-to-r from-transparent via-green-700 transition-all duration-700 ${note && note?.cents < 10 && note?.cents > -10 ? "opacity-15" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-0 w-1/4 bg-gradient-to-r from-red-700 from-10% transition-all duration-700 ${note && note?.cents < -10 ? "opacity-15" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-0 ms-auto w-1/4 bg-gradient-to-l from-red-700 from-10% transition-all duration-700 ${note && note?.cents > 10 ? "opacity-15" : "opacity-0"}`}
        />
      </div>
    </>
  );
}

export default App;
