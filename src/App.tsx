import Oscilloscope from "./components/Oscilloscope";
import Tuner from "./components/Tuner";
import useFloatTimeDomainData from "./hooks/useFloatTimeDomainData";
import usePitch from "./hooks/usePitch";
import InitOverlay from "./components/InitOverlay";
import frequencyToNote from "./utils/frequencyToNote";
import Gradients from "./components/Gradients";
import BackgroundContainer from "./components/BackgroundContainer";
import { useState } from "react";
import SettingsDialog from "./components/SettingsDialog";

function App() {
  const floatTimeDomainData = useFloatTimeDomainData(100);
  const pitch = usePitch(100);
  const [transposition, setTransposition] = useState(0);
  const [displayAsSharp, setDisplayAsSharp] = useState(true);

  const note =
    pitch.frequency === 0 ? null : frequencyToNote(pitch.frequency, 0, true);

  return (
    <>
      <div className="flex h-screen flex-col bg-slate-950">
        <div className="flex h-1/2 items-center justify-center">
          <SettingsDialog
            transposition={transposition}
            setTransposition={setTransposition}
            displayAsSharp={displayAsSharp}
            setDisplayAsSharp={setDisplayAsSharp}
          />
          <Tuner
            pitch={pitch}
            transposition={transposition}
            displayAsSharp={displayAsSharp}
          />
        </div>
        <div className="h-1/2" />
      </div>
      <Oscilloscope floatTimeDomainData={floatTimeDomainData} />
      <InitOverlay />
      <BackgroundContainer>
        <Gradients cents={note?.cents} />
      </BackgroundContainer>
    </>
  );
}

export default App;
