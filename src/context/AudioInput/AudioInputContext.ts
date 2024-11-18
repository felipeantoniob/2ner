import { createContext } from "react";

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
