import { useAudioInputContext } from "@/context/AudioInput/useAudioInputContext";
import { BUFFER_SIZE } from "../constants";
import useInterval from "./useInterval";

const floatTimeDomainData = new Float32Array(BUFFER_SIZE);

const useFloatTimeDomainData = (interval: number) => {
  const { analyserNode, audioContext } = useAudioInputContext();

  useInterval(async () => {
    if (!analyserNode || !audioContext) {
      floatTimeDomainData.fill(0);
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
