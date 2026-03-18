import { useState } from "react";
import Timer from "./components/Timer";
import Todo from "./components/Todo";

function App() {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className="min-h-screen bg-pink-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-6">
        🌸 Productivity Garden
      </h1>

      {/* Buttons */}
      {activeTab === "" && (
  <p className="text-center text-gray-600">
    Select an option
  </p>
)}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("timer")}
          className="bg-purple-400 text-white px-4 py-2 rounded"
        >
          Timer
        </button>

        <button
          onClick={() => setActiveTab("todo")}
          className="bg-blue-400 text-white px-4 py-2 rounded"
        >
          Todo
        </button>
      </div>

      {/* Conditional Rendering */}
      <div className="flex justify-center">
        {activeTab === "timer" && <Timer />}  
        {activeTab === "todo" && <Todo />}
      </div>
    </div>
  );
}

export default App;