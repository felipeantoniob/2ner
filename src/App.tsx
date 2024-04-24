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
      <div className="flex h-screen flex-col bg-slate-950">
        <div className="flex h-1/2 items-center justify-center">
          <Tuner pitch={pitch} />
        </div>
        <div className="h-1/2"></div>
      </div>
      <Oscilloscope floatTimeDomainData={floatTimeDomainData} />
      <InitOverlay />
      <div className="fixed left-0 top-0 z-40 h-full w-full">
        <svg
          preserveAspectRatio="none"
          className="opacity-25"
          height="100%"
          width="100%"
          viewBox="0 0 250 250"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="10.55"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        <div
          className={`absolute inset-0 mx-auto w-1/2 bg-gradient-to-r from-transparent via-teal-900 transition-all duration-700 ${note && note?.cents < 10 && note?.cents > -10 ? "opacity-25" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-0 w-1/4 bg-gradient-to-r from-rose-900 from-10% transition-all duration-700 ${note && note?.cents < -10 ? "opacity-25" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-0 ms-auto w-1/4 bg-gradient-to-l from-rose-900 from-10% transition-all duration-700 ${note && note?.cents > 10 ? "opacity-25" : "opacity-0"}`}
        />
      </div>
    </>
  );
}

export default App;
