import { useContext } from "react";

import { AudioInputContext } from "./useAudioInputContext";
import { BUFFER_SIZE } from "../constants";
import useInterval from "./useInterval";

const floatTimeDomainData = new Float32Array(BUFFER_SIZE);

const useFloatTimeDomainData = (interval: number) => {
  const { analyserNode, audioContext } = useContext(AudioInputContext);

  useInterval(async () => {
    if (!analyserNode || !audioContext) {
      return;
    }

    if (audioContext.state === "suspended") {
      analyserNode?.getFloatTimeDomainData(floatTimeDomainData);
    }

    analyserNode.getFloatTimeDomainData(floatTimeDomainData);
  }, interval);

  return floatTimeDomainData;
};

export default useFloatTimeDomainData;
