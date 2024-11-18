import { useState } from "react";

import { useAudioInputContext } from "@/context/AudioInput/useAudioInputContext";
import checkAudioInput from "../utils/checkAudioInput";

const InitOverlay = () => {
  const { initAudioInput } = useAudioInputContext();
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
          className="fixed left-0 top-0 z-50 h-screen w-screen backdrop-blur-md"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-xl text-slate-100">
            Click to start tuning
          </div>
        </button>
      )}
    </div>
  );
};

export default InitOverlay;
