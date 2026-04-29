import { useState, useEffect } from "react";

function Todo() {
  const [tasks, setTasks] = useState(() => {
    const saved = sessionStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const today = new Date();
  const day = today.toLocaleString("en-US", { weekday: "long" });
  const date = today.getDate();
  const month = today.toLocaleString("en-US", { month: "long" });

  const [task, setTask] = useState("");

  // ✅ LIVE TIMER + SESSIONS
  const [liveTime, setLiveTime] = useState(
    Number(sessionStorage.getItem("time")) || 1500
  );

  const [sessions, setSessions] = useState(
    Number(sessionStorage.getItem("sessions")) || 0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTime(Number(sessionStorage.getItem("time")) || 1500);
      setSessions(Number(sessionStorage.getItem("sessions")) || 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const completedTasks = tasks.filter((t) => t.done).length;
  const totalTasks = tasks.length;

  const progress =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];

    newTasks[index].done = !newTasks[index].done;

    const completed = newTasks.filter(t => t.done).length;
    const total = newTasks.length;

    const progress = total === 0 ? 0 : (completed / total) * 100;

    const stage = Math.floor(progress / 25);

    sessionStorage.setItem("petStage", stage);

    setTasks(newTasks);
  };

  const deleteTask = (indexToDelete) => {
    const newTasks = tasks.filter((_, i) => i !== indexToDelete);
    setTasks(newTasks);
  };

  return (
    <div className="bg-[#6b7f4e] p-6 rounded-2xl shadow-lg">
      <div className="bg-[#f5f3ef] p-6 rounded-2xl w-full max-w-[800px]">
        <h2 className="text-xl font-semibold mb-4">YOUR TODO LIST </h2>

        {/* ✅ TOP 3 BOXES */}
        <div className="flex items-center gap-4 mb-6">

          {/* DATE */}
          <div className="bg-white p-4 rounded-2xl shadow w-28 text-center">
            <p className="font-semibold">{day}</p>
            <div className="bg-green-700 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mt-2">
              {date}
            </div>
            <p className="text-sm mt-1">{month}</p>
          </div>

          {/* TIMER + SESSIONS */}
          <div className="flex-1 bg-white p-4 rounded-2xl shadow flex items-center justify-between">

            <div className="flex items-center gap-3">
              <p className="text-2xl">
                {sessionStorage.getItem("pet") === "cat" ? "🐱" : "🐶"}
              </p>

              <div>
                <p className="text-sm text-gray-500">Focus</p>
                <p className="text-lg font-semibold">
                  {formatTime(liveTime)}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Sessions</p>
              <p className="font-semibold">{sessions}</p>
            </div>

          </div>

          {/* PROGRESS */}
          <div className="bg-white p-4 rounded-2xl shadow w-52">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="bg-gray-300 h-3 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-green-700 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

        </div>

        {/* INPUT */}
        <div className="flex gap-2 mt-2">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 p-3 rounded-full bg-white outline-none"
            placeholder="Write your task here..."
          />

          <button
            onClick={addTask}
            className="bg-green-700 text-white w-10 h-10 rounded-full text-xl"
          >
            +
          </button>
        </div>

        {/* TASK LIST */}
        <ul className="mt-4 space-y-2">
          {tasks.map((t, index) => (
            <li key={index} className="flex items-center gap-2">
              <span>🌿</span>

              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTask(index)}
              />

              <span className={t.done ? "line-through text-gray-400" : ""}>
                {t.text}
              </span>

              <button
                onClick={() => deleteTask(index)}
                className="ml-auto text-red-500"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        {/* FINISH */}
        <button
          onClick={() => setTasks([])}
          className="mt-6 w-full bg-green-300 py-2 rounded-lg"
        >
          FINISH DAY
        </button>
      </div>
    </div>
  );
}

export default Todo;