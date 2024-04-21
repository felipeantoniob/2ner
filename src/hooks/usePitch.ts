import { PitchDetector } from "pitchy";
import { useEffect, useState } from "react";

const mediaTrackConstraints: MediaTrackConstraints = {
  echoCancellation: false,
  autoGainControl: false,
  noiseSuppression: false,
};

const MINIMUM_VOLUME_DECIBELS = -30;

const usePitch = () => {
  const [hasAudioInput, setHasAudioInput] = useState(false);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [detector, setDetector] = useState<PitchDetector<Float32Array> | null>(
    null,
  );
  const [input, setInput] = useState<Float32Array | null>(null);

  const [pitch, setPitch] = useState<number>(0);
  const [clarity, setClarity] = useState<number>(0);
  const [decibels, setDecibels] = useState(-Infinity);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices.addEventListener("devicechange", initPitchDetection);

    return () =>
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        initPitchDetection,
      );
  }, []);

  async function updatePitch() {
    if (!audioContext || !analyserNode || !detector || !input) {
      setPitch(0);
      setClarity(0);
      return;
    }

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    analyserNode.getFloatTimeDomainData(input);
    const [pitch, clarity] = detector.findPitch(input, audioContext.sampleRate);

    let meanSquare = input.reduce((prev, curr) => prev + curr * curr);
    meanSquare = meanSquare < 0 ? 0.00001 : meanSquare;
    const rootMeanSquare = Math.sqrt(meanSquare / input.length);
    const decibels = 20 * (Math.log(rootMeanSquare) / Math.log(10));

    const roundedPitch = Math.round(pitch * 10) / 10;
    const roundedClarity = Math.round(clarity * 100);

    setPitch(roundedPitch);
    setClarity(roundedClarity);
    setDecibels(decibels);
  }

  const initPitchDetection = async () => {
    const mediaDevices = navigator.mediaDevices;
    const mediaDeviceInfoArray = await mediaDevices.enumerateDevices();

    const hasAudioInput = mediaDeviceInfoArray.some(
      (info) => info.kind === "audioinput",
    );

    if (!hasAudioInput) {
      setError("No audio input available");
      return;
    }

    setHasAudioInput(hasAudioInput);

    const audioContext = new AudioContext();
    const analyserNode = audioContext.createAnalyser();
    setAnalyserNode(analyserNode);

    const stream = await mediaDevices.getUserMedia({
      audio: mediaTrackConstraints,
    });
    audioContext.createMediaStreamSource(stream).connect(analyserNode);
    setAudioContext(audioContext);

    const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
    detector.minVolumeDecibels = MINIMUM_VOLUME_DECIBELS;
    setDetector(detector);

    const input = new Float32Array(detector.inputLength);
    setInput(input);
  };

  const stopPitchDetection = () => {
    setAnalyserNode(null);
    setAudioContext(null);
    setDetector(null);
    setInput(null);
    setDecibels(-Infinity);
  };

  return {
    initPitchDetection,
    hasAudioInput,
    pitch,
    clarity,
    updatePitch,
    stopPitchDetection,
    error,
    decibels,
  };
};
export default usePitch;
