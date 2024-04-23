import { useContext } from "react";

import Oscilloscope from "./components/Oscilloscope";
import Tuner from "./components/Tuner";
import { AudioInputContext } from "./hooks/useAudioInputContext";
import useFloatTimeDomainData from "./hooks/useFloatTimeDomainData";
import usePitch from "./hooks/usePitch";

function App() {
  const { initAudioInput, stopAudioInput } = useContext(AudioInputContext);
  const floatTimeDomainData = useFloatTimeDomainData(100);
  const pitch = usePitch(100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Tuner
        handleStart={initAudioInput}
        handleStop={stopAudioInput}
        pitch={pitch}
      />
      <div className="mx-auto">
        <Oscilloscope floatTimeDomainData={floatTimeDomainData} />
      </div>
    </div>
  );
}

export default App;
