import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  const formattedTime = time.toLocaleTimeString("pt-BR");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-500 text-white text-3xl font-bold text-center py-4 shadow-md">
      {formattedTime}
    </div>
  );
};

export default Clock;
