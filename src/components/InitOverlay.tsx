import { useContext, useState } from "react";

import { AudioInputContext } from "../hooks/useAudioInputContext";
import checkAudioInput from "../utils/checkAudioInput";

const InitOverlay = () => {
  const { initAudioInput } = useContext(AudioInputContext);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      {isVisible && (
        <button
          onClick={async () => {
            await initAudioInput();
            const hasAudioInput = await checkAudioInput();
            if (hasAudioInput) {
              setIsVisible(false);
            }
          }}
          className="fixed left-0 top-0 z-30 h-screen w-screen backdrop-blur-md"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            Click to start tuning
          </div>
        </button>
      )}
    </div>
  );
};

export default InitOverlay;
