import { useState, useEffect } from "react";

function Todo() {

  // ✅ Load tasks
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [task, setTask] = useState("");

  const completedTasks = tasks.filter(t => t.done).length;
  const totalTasks = tasks.length;

  const progress =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  // ✅ Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ Sessions from timer


  // ➕ Add task
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  // ✅ Toggle
  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  // ❌ Delete
  const deleteTask = (indexToDelete) => {
    const newTasks = tasks.filter((_, i) => i !== indexToDelete);
    setTasks(newTasks);
  };

  return (
    <div className="bg-[#6b7f4e] p-6 rounded-2xl shadow-lg">

      <div className="bg-[#f5f3ef] p-6 rounded-2xl w-[350px]">

        {/* HEADER */}
        <h2 className="text-xl font-semibold mb-4">🌿 Todo</h2>

        {/* DATE + PROGRESS */}
        <div className="flex justify-between items-center mb-4">

          {/* DATE CARD */}
          <div className="bg-white p-3 rounded-xl shadow text-center w-24">
            <p className="font-semibold">Thursday</p>
            <div className="bg-green-700 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mt-2">
              13
            </div>
            <p className="text-sm mt-1">February</p>
          </div>

          {/* PROGRESS BAR */}
          <div className="bg-white p-3 rounded-xl shadow w-48">
            

            {/* Title + % */}
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>{Math.round(progress)}%</span>
            </div>

            {/* Bar */}
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
         {/* FINISH BUTTON */}
        <button
  onClick={() => setTasks([])}
  className="mt-6 w-full bg-[#6b7f4e] text-whitepy-2 rounded-lg"
>
  FINISH DAY
</button>

  

      </div>
    </div>
  );
}

export default Todo;