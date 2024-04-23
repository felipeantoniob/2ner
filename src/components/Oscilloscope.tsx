import { useEffect, useRef } from "react";

const WIDTH = 300;
const HEIGHT = 300;

type WaveformProps = {
  floatTimeDomainData: Float32Array | null;
};

const Oscilloscope = ({ floatTimeDomainData }: WaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasCtx = canvasRef.current?.getContext("2d");

    if (!canvasCtx || !floatTimeDomainData) return;

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    const draw = () => {
      requestAnimationFrame(draw);

      canvasCtx.fillStyle = "#121212";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "#efefef";
      canvasCtx.beginPath();

      const sliceWidth = (WIDTH * 1.0) / 2048;
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

      canvasCtx.lineTo(WIDTH, HEIGHT / 2);
      canvasCtx.stroke();
    };

    draw();
  }, [floatTimeDomainData]);

  return (
    <div className="mx-auto w-[300px] bg-slate-800">
      <canvas
        ref={canvasRef}
        id="oscilloscope-canvas"
        width={WIDTH}
        height={HEIGHT}
      ></canvas>
    </div>
  );
};

export default Oscilloscope;
