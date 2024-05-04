type GradientsProps = {
  cents?: number;
};

const Gradients = ({ cents }: GradientsProps) => {
  const isInTune = cents && cents < 10 && cents > -10;
  const isSlightlyFlat = cents && cents < -10 && cents > -30;
  const isVeryFlat = cents && cents < -30;
  const isSlightlySharp = cents && cents > 10 && cents < 30;
  const isVerySharp = cents && cents > 30;

  return (
    <>
      <div
        className={`absolute inset-0 mx-auto w-2/5 bg-gradient-to-r from-transparent via-emerald-700 transition-all duration-500 ${isInTune ? "opacity-35" : "opacity-0"}`}
      />
      <div className="absolute inset-0 w-3/5">
        <div
          className={`absolute inset-0 mx-auto w-full bg-gradient-to-r from-transparent from-5% via-amber-700 to-95% transition-all duration-1000 ${isSlightlyFlat ? "opacity-35" : "opacity-0"}`}
        />
      </div>
      <div className="absolute inset-0 ms-auto w-3/5">
        <div
          className={`absolute inset-0 mx-auto w-full bg-gradient-to-r from-transparent from-5% via-amber-700 to-95% transition-all duration-1000 ${isSlightlySharp ? "opacity-35" : "opacity-0"}`}
        />
      </div>
      <div
        className={`absolute inset-0 w-1/5 bg-gradient-to-r from-rose-700 from-10% transition-all duration-1000 ${isVeryFlat ? "opacity-35" : "opacity-0"}`}
      />
      <div
        className={`absolute inset-0 ms-auto w-1/5 bg-gradient-to-l from-rose-700 from-10% transition-all duration-1000 ${isVerySharp ? "opacity-35" : "opacity-0"}`}
      />
    </>
  );
};

export default Gradients;
