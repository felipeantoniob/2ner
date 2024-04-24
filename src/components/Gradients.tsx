import type { Note } from "../utils/frequencyToNote";

type GradientsProps = {
  note: Note | null;
};

const Gradients = ({ note }: GradientsProps) => {
  return (
    <div>
      <div className="fixed left-0 top-0 z-40 h-full w-full">
        <svg
          preserveAspectRatio="none"
          className="opacity-25"
          height="100%"
          width="100%"
          viewBox="0 0 250 250"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="10.55"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        <div
          className={`absolute inset-0 mx-auto w-2/5 bg-gradient-to-r from-transparent via-emerald-800 transition-all duration-500 ${note && note?.cents < 10 && note?.cents > -10 ? "opacity-25" : "opacity-0"}`}
        />
        <div className="absolute inset-0 w-3/5">
          <div
            className={`absolute inset-0 mx-auto w-full bg-gradient-to-r from-transparent from-5% via-amber-900 to-95% transition-all duration-1000 ${note && note?.cents < -10 && note?.cents > -30 ? "opacity-25" : "opacity-0"}`}
          />
        </div>
        <div className="absolute inset-0 ms-auto w-3/5">
          <div
            className={`absolute inset-0 mx-auto w-full bg-gradient-to-r from-transparent from-5% via-amber-900 to-95% transition-all duration-1000 ${note && note?.cents > 10 && note?.cents < 30 ? "opacity-25" : "opacity-0"}`}
          />
        </div>
        <div
          className={`absolute inset-0 w-1/5 bg-gradient-to-r from-rose-700 from-10% transition-all duration-1000 ${note && note?.cents < -30 ? "opacity-25" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-0 ms-auto w-1/5 bg-gradient-to-l from-rose-700 from-10% transition-all duration-1000 ${note && note?.cents > 30 ? "opacity-25" : "opacity-0"}`}
        />
      </div>
    </div>
  );
};

export default Gradients;
