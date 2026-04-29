import { useState } from "react";
import Timer from "./components/Timer";
import Todo from "./components/Todo";
import PetCard from "./components/PetCard";

function App() {

  const [view, setView] = useState("");
  const [pet, setPet] = useState(sessionStorage.getItem("pet") || "");

  const quotes = [
    "Nobody is coming to save you. Not even your own motivation.",
    "You’re not tired. You’re avoiding the work. Big difference.",
    "The '5 more minutes' lie is the oldest and most tragic in the book.",
    "Your future self is already judging you. Fairly.",
    "grow or stay embarrassing 🌱",
    "ur plant is doing better than u rn… fix that",
    "u opened this website for a reason … what was it again?",
    "future u is tired of ur nonsense",
    "Congrats. Opening this app is your biggest achievement today.",
    "Don't worry, the deadline is just watching you quietly.",
    "You said '5 min break'… it's been 2 hours.",
    "Let’s pretend you're about to be productive.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const selectPet = (type) => {
    setPet(type);
    sessionStorage.setItem("pet", type);
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-center pt-10 relative">

      <h1 className="text-3xl font-bold">🌸 Productivity Garden</h1>

      {/* HOME SCREEN */}
      {!view && (
        <>
          <p className="mt-6 text-lg">{randomQuote}</p>

          <p className="mt-2 text-sm text-gray-600">
            now choose your pet and start doing whatever it is you have to do
          </p>

          <div className="flex justify-center gap-4 mt-6 text-3xl">
            <button
              onClick={() => selectPet("dog")}
              className={pet === "dog" ? "bg-green-300 p-2 rounded-full" : ""}
            >
              🐶
            </button>

            <button
              onClick={() => selectPet("cat")}
              className={pet === "cat" ? "bg-green-300 p-2 rounded-full" : ""}
            >
              🐱
            </button>
          </div>

          <button
            onClick={() => setView("timer")}
            disabled={!pet}
            className={`mt-6 px-6 py-3 rounded-xl text-white ${
              pet ? "bg-green-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Let’s Grind
          </button>
        </>
      )}

      {/* NAVBAR */}
      {view && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setView("timer")}
            className="bg-purple-400 text-white px-4 py-2 rounded"
          >
            Timer
          </button>

          <button
            onClick={() => setView("todo")}
            className="bg-blue-400 text-white px-4 py-2 rounded"
          >
            Todo
          </button>
        </div>
      )}

      {/* COMPONENTS */}
      <div className="mt-8 px-10">

        {/* TIMER PAGE */}
        <div className={view === "timer" ? "block" : "hidden"}>
          <Timer />
        </div>

        {/* TODO + PET */}
        <div className={view === "todo" ? "flex gap-6 w-full" : "hidden"}>

          {/* TODO */}
          <div className="w-[70%]">
            <Todo />
          </div>

          {/* PET */}
          <div className="w-[30%] bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
            <PetCard />
          </div>

        </div>

      </div>

      {/* BACK */}
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