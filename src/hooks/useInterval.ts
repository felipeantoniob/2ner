import { useEffect, useRef } from "react";

type CallbackFunction = () => void;

function useInterval(callback: CallbackFunction, delay: number) {
  const savedCallback = useRef<CallbackFunction>(null);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current!();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
