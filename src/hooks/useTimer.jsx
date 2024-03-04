import { useEffect, useState } from "react";

export const useTimer = () => {
  const getCurrentTime = () => new Date().toLocaleTimeString();
  const [time, setTime] = useState(getCurrentTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    };

  }, []);

  return { time };

}

