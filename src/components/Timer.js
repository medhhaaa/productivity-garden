import { useState, useEffect } from "react"; // importing React hooks

function Timer() {
const [sessions, setSessions] = useState(() => {
  const saved = localStorage.getItem("sessions");
  return saved ? Number(saved) : 0;
});
  // time → stores remaining seconds (1500 = 25 mins)
  // setTime → function to update time
  const [time, setTime] = useState(1500);

  // isRunning → whether timer is ON or OFF
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
  localStorage.setItem("sessions", sessions);
}, [sessions]);
  // useEffect runs whenever isRunning or time changes
  useEffect(() => {
    let timer; // will store interval ID

    // only run if timer is ON and time is not finished
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        // decrease time by 1 every second
        setTime((prev) => {
  if (prev === 1) {
    setSessions((s) => s + 1); // ✅ increase session
    return 0;
  }
  return prev - 1;
});
      }, 1000);
    }

    // cleanup function → stops previous interval
    // VERY important to avoid multiple timers running
    return () => clearInterval(timer);

  }, [isRunning, time]); // dependency array

  // function to convert seconds → mm:ss format
  const formatTime = () => {
    const minutes = Math.floor(time / 60); // get minutes
    const seconds = time % 60; // get remaining seconds

    // add 0 if seconds < 10 (e.g., 2:05 instead of 2:5)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">

      <h2 className="text-xl font-semibold">⏱️ Timer</h2>

      {/* display formatted time */}
      <p className="text-3xl mt-2">{formatTime()}</p>

      <div className="mt-3 flex gap-2 justify-center">
      <p>Sessions: {sessions}</p>
        {/* Start / Pause button */}
        <button
          onClick={() => setIsRunning(!isRunning)} // toggle state
          className="bg-green-400 text-white px-4 py-2 rounded"
        >
          {/* change text based on state */}
          {isRunning ? "Pause" : "Start"}
        </button>

        {/* Reset button */}
        <button
          onClick={() => {
            setTime(1500); // reset time
            setIsRunning(false); // stop timer
          }}
          className="bg-red-400 text-white px-4 py-2 rounded"
        >
          Reset
        </button>

      </div>
    </div>
  );
}

export default Timer; // makes this component usable in other files