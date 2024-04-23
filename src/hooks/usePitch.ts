import { PitchDetector } from "pitchy";
import { useEffect, useState } from "react";
import useInterval from "./useInterval";

const mediaTrackConstraints: MediaTrackConstraints = {
  echoCancellation: false,
  autoGainControl: false,
  noiseSuppression: false,
};

const MINIMUM_VOLUME_DECIBELS = -30;
const BUFFER_SIZE = 2048;

const detector = PitchDetector.forFloat32Array(BUFFER_SIZE);
detector.minVolumeDecibels = MINIMUM_VOLUME_DECIBELS;

const mediaDevices = navigator.mediaDevices;

const checkAudioInput = async () => {
  const mediaDeviceInfoArray = await mediaDevices.enumerateDevices();

  const hasAudioInput = mediaDeviceInfoArray.some(
    (info) => info.kind === "audioinput",
  );

  return hasAudioInput;
};

function calculateDecibels(input: Float32Array): number {
  const meanSquare = input.reduce((sum, value) => sum + value ** 2, 0);
  const rootMeanSquare = Math.sqrt(meanSquare / input.length);
  const decibels = 20 * Math.log10(rootMeanSquare);
  return decibels;
}

const usePitch = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [input, setInput] = useState<Float32Array | null>(null);

  const [pitch, setPitch] = useState<number>(0);
  const [clarity, setClarity] = useState<number>(0);
  const [decibels, setDecibels] = useState(-Infinity);
  const [error, setError] = useState<string | null>(null);

  useInterval(async () => {
    await updatePitch();
  }, 100);

  useEffect(() => {
    mediaDevices.addEventListener("devicechange", initPitchDetection);

    return () =>
      mediaDevices.removeEventListener("devicechange", initPitchDetection);
  }, []);

  const initPitchDetection = async () => {
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

    const stream = await mediaDevices.getUserMedia({
      audio: mediaTrackConstraints,
    });
    audioContext.createMediaStreamSource(stream).connect(analyserNode);
    setAudioContext(audioContext);

    const input = new Float32Array(detector.inputLength);
    setInput(input);
  };

  async function updatePitch() {
    if (!analyserNode || !input || !audioContext) {
      setPitch(0);
      setClarity(0);
      return;
    }

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    analyserNode.getFloatTimeDomainData(input);
    analyserNode.maxDecibels;
    const [pitch, clarity] = detector.findPitch(input, audioContext.sampleRate);

    const roundedPitch = Math.round(pitch * 10) / 10;
    const roundedClarity = Math.round(clarity * 100);
    const decibels = calculateDecibels(input);

    setPitch(roundedPitch);
    setClarity(roundedClarity);
    setDecibels(decibels);
  }

  const stopPitchDetection = () => {
    setAnalyserNode(null);
    setAudioContext(null);
    setInput(null);
    setDecibels(-Infinity);
  };

  return {
    initPitchDetection,
    pitch,
    clarity,
    updatePitch,
    stopPitchDetection,
    error,
    decibels,
    input,
  };
};
export default usePitch;
