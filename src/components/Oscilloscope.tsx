import { useEffect, useRef } from "react";

import useWindowSize from "~/hooks/useWindowSize";

type WaveformProps = {
  floatTimeDomainData: Float32Array | null;
};

const Oscilloscope = ({ floatTimeDomainData }: WaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useWindowSize();

  const HEIGHT = height;

  useEffect(() => {
    const canvasCtx = canvasRef.current?.getContext("2d");

    if (!canvasCtx || !floatTimeDomainData) return;

    canvasCtx.clearRect(0, 0, width, HEIGHT);

    const draw = () => {
      requestAnimationFrame(draw);

      canvasCtx.clearRect(0, 0, width, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "#f9a8d4";
      canvasCtx.beginPath();

      const sliceWidth = (width * 1.0) / 2048;
      let x = 0;

      for (let i = 0; i < 2048; i++) {
        const v = floatTimeDomainData[i] * 200.0;
        const y = HEIGHT / 2 + v;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      canvasCtx.lineTo(width, HEIGHT / 2);
      canvasCtx.stroke();
    };

    draw();
  }, [floatTimeDomainData, width, HEIGHT]);

  return (
    <div className="fixed left-0 top-0 z-30">
      <canvas
        ref={canvasRef}
        id="oscilloscope-canvas"
        width={width}
        height={HEIGHT}
      ></canvas>
    </div>
  );
};

export default Oscilloscope;
