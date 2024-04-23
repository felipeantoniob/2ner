const checkAudioInput = async () => {
  const mediaDeviceInfoArray = await navigator.mediaDevices.enumerateDevices();

  const hasAudioInput = mediaDeviceInfoArray.some(
    (info) => info.kind === "audioinput",
  );

  return hasAudioInput;
};

export default checkAudioInput;
