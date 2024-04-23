import { useContext } from "react";

import Oscilloscope from "./components/Oscilloscope";
import Tuner from "./components/Tuner";
import { AudioInputContext } from "./hooks/useAudioInputContext";
import useFloatTimeDomainData from "./hooks/useFloatTimeDomainData";
import usePitch from "./hooks/usePitch";
import InitOverlay from "./components/InitOverlay";

function App() {
  const { initAudioInput, stopAudioInput } = useContext(AudioInputContext);
  const floatTimeDomainData = useFloatTimeDomainData(100);
  const pitch = usePitch(100);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-100">
        <Tuner
          handleStart={initAudioInput}
          handleStop={stopAudioInput}
          pitch={pitch}
        />
        <div className="mx-auto">
          <Oscilloscope floatTimeDomainData={floatTimeDomainData} />
        </div>
        <InitOverlay />
      </div>
    </>
  );
}

export default App;
