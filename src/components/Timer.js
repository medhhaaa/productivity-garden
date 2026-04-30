import { useState, useEffect } from "react";

function Timer({ view }) {

  const pet = sessionStorage.getItem("pet") || "dog";

  const [sessions, setSessions] = useState(() => {
    const saved = sessionStorage.getItem("sessions");
    return saved ? Number(saved) : 0;
  });

  const [petStage, setPetStage] = useState(0);

  const [time, setTime] = useState(() => {
    const saved = sessionStorage.getItem("time");
    return saved ? Number(saved) : 1500;
  });

  const [isRunning, setIsRunning] = useState(() => {
    const saved = sessionStorage.getItem("isRunning");
    return saved === "true";
  });

  // ✅ OPEN FEELING POPUP ON MILESTONES
  useEffect(() => {
    const milestones = [2, 5, 10, 15, 20];

    if (milestones.includes(sessions)) {
      window.dispatchEvent(new Event("openFeeling"));
    }
  }, [sessions]);

  // ✅ SYNC petStage
  useEffect(() => {
    const interval = setInterval(() => {
      const stage = Number(sessionStorage.getItem("petStage")) || 0;
      setPetStage(stage);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // ✅ SAVE sessions
  useEffect(() => {
    sessionStorage.setItem("sessions", sessions);
  }, [sessions]);

  // ✅ MAIN TIMER LOGIC + GLOBAL SYNC
  useEffect(() => {
    sessionStorage.setItem("time", time);
    sessionStorage.setItem("isRunning", isRunning);

    // 🔥 BROADCAST UPDATE (IMPORTANT FIX)
    window.dispatchEvent(new Event("timerUpdate"));

    let timer;

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

  // ✅ PET DISPLAY
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
  <>
    {view === "timer" && (
      <div className="bg-[#fbfaf7] p-8 rounded-3xl shadow-md border border-white/40 text-center">

        <p className="text-5xl mt-3">{getPetDisplay()}</p>

        <h2 className="text-xl font-semibold text-gray-600 mt-2">⏱️ Timer</h2>

        <p className="text-7xl md:text-8xl mt-4 font-bold tracking-tight text-gray-800">
          {formatTime()}
        </p>

        <div className="mt-6 flex gap-3 justify-center flex-wrap items-center">
          <p className="px-3 py-1 rounded-full bg-[#f1efe8] text-gray-600">
            Sessions: {sessions}
          </p>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="bg-[#6b7f4e] text-white px-4 py-2 rounded-xl text-sm shadow-md hover:scale-105 hover:shadow-lg transition"
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            onClick={() => {
              setTime(1500);
              setIsRunning(false);
            }}
            className="bg-[#c98f8f] text-white px-4 py-2 rounded-xl text-sm shadow-md hover:scale-105 hover:shadow-lg transition"
          >
            Reset
          </button>
        </div>
      </div>
    )}
  </>
);
}

export default Timer;