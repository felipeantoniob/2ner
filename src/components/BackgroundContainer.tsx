import type { ReactNode } from "react";

const NoiseBackground = () => (
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
);

const BackgroundContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed left-0 top-0 z-40 h-full w-full">
      <NoiseBackground />
      {children}
    </div>
  );
};

export default BackgroundContainer;
