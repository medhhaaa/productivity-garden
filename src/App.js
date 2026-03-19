import { useState } from "react";
import Timer from "./components/Timer";
import Todo from "./components/Todo";

function App() {
  const [view, setView] = useState("");

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-center pt-10">

      <h1 className="text-3xl font-bold">🌸 Productivity Garden</h1>

      {!view && (
        <>
          <p className="mt-4">Select an option</p>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setView("timer")}
              className="bg-purple-400 text-white px-6 py-2 rounded"
            >
              Timer
            </button>

            <button
              onClick={() => setView("todo")}
              className="bg-blue-400 text-white px-6 py-2 rounded"
            >
              Todo
            </button>
          </div>
        </>
      )}

      {/* SHOW COMPONENTS */}
      <div className="mt-8 flex justify-center">
        {view === "timer" && <Timer />}
        {view === "todo" && <Todo />}
      </div>

      {/* BACK BUTTON */}
      {view && (
        <button
          onClick={() => setView("")}
          className="mt-6 bg-gray-300 px-4 py-2 rounded"
        >
          ⬅ Back
        </button>
      )}

    </div>
  );
}

export default App; 