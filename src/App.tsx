import { useContext } from "react";

import Oscilloscope from "./components/Oscilloscope";
import Tuner from "./components/Tuner";
import { AudioInputContext } from "./hooks/useAudioInputContext";
import useFloatTimeDomainData from "./hooks/useFloatTimeDomainData";
import usePitch from "./hooks/usePitch";

function App() {
  const { initAudioInput, stopAudioInput } = useContext(AudioInputContext);
  const floatTimeDomainData = useFloatTimeDomainData(100);
  const tunerPitch = usePitch(100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Tuner
        handleStart={initAudioInput}
        handleStop={stopAudioInput}
        pitch={tunerPitch}
      />
      <Oscilloscope floatTimeDomainData={floatTimeDomainData} />
    </div>
  );
}

export default App;
