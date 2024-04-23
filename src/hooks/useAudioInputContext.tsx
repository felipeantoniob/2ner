import { type ReactNode, createContext, useEffect, useState } from "react";
import { BUFFER_SIZE } from "../constants";
import checkAudioInput from "../utils/checkAudioInput";

const mediaTrackConstraints: MediaTrackConstraints = {
  echoCancellation: false,
  autoGainControl: false,
  noiseSuppression: false,
};

const mediaDevices = navigator.mediaDevices;

interface AudioInputContextType {
  audioContext: AudioContext | null;
  analyserNode: AnalyserNode | null;
  initAudioInput: () => Promise<void>;
  stopAudioInput: () => void;
  error: string | null;
}

export const AudioInputContext = createContext<AudioInputContextType>({
  audioContext: null,
  analyserNode: null,
  initAudioInput: async () => {},
  stopAudioInput: () => {},
  error: null,
});

export const AudioInputContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mediaDevices.addEventListener("devicechange", initAudioInput);

    return () =>
      mediaDevices.removeEventListener("devicechange", initAudioInput);
  }, []);

  const initAudioInput = async () => {
    const hasAudioInput = await checkAudioInput();

    if (!hasAudioInput) {
      setError("No audio input available");
      return;
    } else {
      setError(null);
    }

    const audioContext = new AudioContext();

    const analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = BUFFER_SIZE;
    setAnalyserNode(analyserNode);

    const mediaStream = await mediaDevices.getUserMedia({
      audio: mediaTrackConstraints,
    });
    audioContext.createMediaStreamSource(mediaStream).connect(analyserNode);
    setAudioContext(audioContext);
  };

  const stopAudioInput = () => {
    setAnalyserNode(null);
    setAudioContext(null);
  };

  return (
    <AudioInputContext.Provider
      value={{
        audioContext,
        analyserNode,
        error,
        initAudioInput,
        stopAudioInput,
      }}
    >
      {children}
    </AudioInputContext.Provider>
  );
};
