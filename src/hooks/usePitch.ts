import { useContext, useState } from "react";

import { AudioInputContext } from "./useAudioInputContext";
import { DEFAULT_PITCH } from "../constants";
import useInterval from "./useInterval";
import type { Pitch } from "../types";
import getPitchFromFloatTimeDomainData from "../utils/getPitchFromFloatTimeDomainData";
import useFloatTimeDomainData from "./useFloatTimeDomainData";

const usePitch = (interval: number) => {
  const { analyserNode, audioContext } = useContext(AudioInputContext);
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
