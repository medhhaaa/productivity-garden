import { useState, useEffect } from "react";

function Timer() {

  // ✅ SINGLE SOURCE OF TRUTH
  const pet = sessionStorage.getItem("pet") || "dog";

  const [sessions, setSessions] = useState(() => {
    const saved = sessionStorage.getItem("sessions");
    return saved ? Number(saved) : 0;
  });

  // ✅ READ ONLY (NOT CONTROL)
  const [petStage, setPetStage] = useState(0);

  const [time, setTime] = useState(() => {
    const saved = sessionStorage.getItem("time");
    return saved ? Number(saved) : 1500;
  });

  const [isRunning, setIsRunning] = useState(() => {
    const saved = sessionStorage.getItem("isRunning");
    return saved === "true";
  });

  // ✅ SYNC petStage from sessionStorage (DO NOT MODIFY IT HERE)
  useEffect(() => {
    const interval = setInterval(() => {
      const stage = Number(sessionStorage.getItem("petStage")) || 0;
      setPetStage(stage);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // ✅ SAVE TIMER STATE ONLY
  useEffect(() => {
    sessionStorage.setItem("sessions", sessions);
  }, [sessions]);

  useEffect(() => {
    sessionStorage.setItem("time", time);
    sessionStorage.setItem("isRunning", isRunning);

    let timer;

    // ❌ REMOVED petStage update here (IMPORTANT)

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => {
          if (prev === 1) {
            setSessions((s) => s + 1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, time]);

  // ✅ FORMAT TIME
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // ✅ SAME LOGIC AS PETCARD
  const getPetDisplay = () => {
    if (pet === "dog") {
      if (petStage === 0) return "🐶";
      if (petStage === 1) return "🐕";
      if (petStage === 2) return "🐕‍🦺";
      if (petStage >= 3) return "🦮";
    }

    if (pet === "cat") {
      if (petStage === 0) return "🐱";
      if (petStage === 1) return "🐈";
      if (petStage === 2) return "🐈‍⬛";
      if (petStage >= 3) return "😼";
    }

    return "🐾";
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">

      <p className="text-4xl mt-4">{getPetDisplay()}</p>

      <h2 className="text-xl font-semibold">⏱️ Timer</h2>

      <p className="text-3xl mt-2">{formatTime()}</p>

      <div className="mt-3 flex gap-2 justify-center flex-wrap">
        <p>Sessions: {sessions}</p>

        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-green-400 text-white px-3 py-1 rounded text-sm"
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => {
            setTime(1500);
            setIsRunning(false);
          }}
          className="bg-red-400 text-white px-3 py-1 rounded text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;