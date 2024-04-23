import Oscilloscope from "./components/Oscilloscope";
import Tuner from "./components/Tuner";
import useFloatTimeDomainData from "./hooks/useFloatTimeDomainData";
import usePitch from "./hooks/usePitch";
import InitOverlay from "./components/InitOverlay";

function App() {
  const floatTimeDomainData = useFloatTimeDomainData(100);
  const pitch = usePitch(100);

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
    </>
  );
}

export default App;
