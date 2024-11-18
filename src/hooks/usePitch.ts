import { useState } from "react";

import type { Pitch } from "../types";
import { DEFAULT_PITCH } from "../constants";
import { useAudioInputContext } from "../context/AudioInput/useAudioInputContext";
import getPitchFromFloatTimeDomainData from "../utils/getPitchFromFloatTimeDomainData";
import useFloatTimeDomainData from "./useFloatTimeDomainData";
import useInterval from "./useInterval";

const usePitch = (interval: number) => {
  const { analyserNode, audioContext } = useAudioInputContext();
  const floatTimeDomainData = useFloatTimeDomainData(interval);
  const [pitch, setPitch] = useState<Pitch>(DEFAULT_PITCH);

  useInterval(async () => {
    if (!analyserNode || !audioContext) {
      setPitch(DEFAULT_PITCH);
      return;
    }

    if (audioContext.state === "suspended") {
      analyserNode?.getFloatTimeDomainData(floatTimeDomainData);
    }

    analyserNode.getFloatTimeDomainData(floatTimeDomainData);

    const pitch = getPitchFromFloatTimeDomainData(
      floatTimeDomainData,
      audioContext.sampleRate,
    );

    setPitch(pitch);
  }, interval);

  return pitch;
};

export default usePitch;
