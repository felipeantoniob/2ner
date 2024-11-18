import { useContext } from "react";

import { AudioInputContext } from "~/context/AudioInput/AudioInputContext";

export const useAudioInputContext = () => {
  const context = useContext(AudioInputContext);

  if (!context) {
    throw new Error(
      "useAudioInputContext must be used within a AudioInputContextProvider",
    );
  }

  return context;
};
