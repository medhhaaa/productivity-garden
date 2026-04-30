import { useState, useEffect } from "react";
import Timer from "./components/Timer";
import Todo from "./components/Todo";
import PetCard from "./components/PetCard";
import FeelingPopup from "./components/FeelingPopup";
import FeelingPage from "./components/FeelingPage";

function App() {
  const [showPopup, setShowPopup] = useState(false);
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

  useEffect(() => {
    const shown = sessionStorage.getItem("feelingShown");

    if (!shown) {
      setShowPopup(true);
      sessionStorage.setItem("feelingShown", "true");
    }
  }, []);

  useEffect(() => {
    const handler = () => setShowPopup(true);

    window.addEventListener("openFeeling", handler);
    return () => window.removeEventListener("openFeeling", handler);
  }, []);

  const selectPet = (type) => {
    setPet(type);
    sessionStorage.setItem("pet", type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3ef] via-[#edeae3] to-[#e6e2d8] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.45),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.35),transparent_35%)] text-center pt-12 relative text-gray-700">

      <h1 className="text-3xl font-bold tracking-wider text-[#3a7a3a] drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
        style={{ fontFamily: "'Press Start 2P', monospace" }}>
        🌸 Productivity Garden 🌸
      </h1>

      {/* HOME SCREEN */}
      {!view && (
        <>
          <p className="mt-6 text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            {randomQuote}
          </p>

          <p className="mt-2 text-sm text-gray-600" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            now choose your pet and start doing whatever it is you have to do
          </p>

          <div className="flex justify-center gap-4 mt-10 text-3xl bg-white/40 backdrop-blur-md rounded-3xl p-4 w-fit mx-auto shadow-md border border-white/50">
            <button
              onClick={() => selectPet("dog")}
              className={pet === "dog"
                ? "bg-white/70 backdrop-blur-md shadow-lg rounded-2xl px-6 py-4 ring-2 ring-green-400 scale-105 border border-white/70 hover:scale-110 hover:shadow-xl active:scale-95 transition-all duration-300"
                : "bg-white/70 backdrop-blur-md shadow-lg rounded-2xl px-6 py-4 border border-white/70 hover:scale-110 hover:shadow-xl active:scale-95 transition-all duration-300"}
            >
              🐶
            </button>

            <button
              onClick={() => selectPet("cat")}
              className={pet === "cat"
                ? "bg-white/70 backdrop-blur-md shadow-lg rounded-2xl px-6 py-4 ring-2 ring-green-400 scale-105 border border-white/70 hover:scale-110 hover:shadow-xl active:scale-95 transition-all duration-300"
                : "bg-white/70 backdrop-blur-md shadow-lg rounded-2xl px-6 py-4 border border-white/70 hover:scale-110 hover:shadow-xl active:scale-95 transition-all duration-300"}
            >
              🐱
            </button>
          </div>

          <button
            onClick={() => setView("timer")}
            disabled={!pet}
            className={`mt-12 rounded-full px-10 py-4 text-white shadow-lg transition-all duration-300 ${
              pet
                ? "bg-gradient-to-r from-green-600 to-green-500 shadow-green-300/40 hover:shadow-xl hover:scale-105 active:scale-95"
                : "bg-gray-400 cursor-not-allowed"
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
            className="bg-[#7d8f61] text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
          >
            Timer
          </button>

          <button
            onClick={() => setView("todo")}
            className="bg-[#95ab78] text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
          >
            Todo
          </button>

          <button
            onClick={() => setView("feeling")}
            className="bg-[#b8a96d] text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
          >
            Feeling
          </button>
        </div>
      )}

      {/* COMPONENTS */}
      <div className="mt-10 px-10">

        {/* TIMER */}
        {view === "timer" && <Timer />}

        {/* TODO */}
        {view === "todo" && (
          <div className="flex gap-6 w-full">
            <div className="w-[70%]">
              <Todo />
            </div>
            <div className="w-[30%] bg-[#fbfaf7] rounded-2xl shadow-md border border-white/40 p-6 flex flex-col items-center justify-center">
              <PetCard />
            </div>
          </div>
        )}

        {/* ✅ ONLY PLACE WHERE FEELING PAGE EXISTS */}
        {view === "feeling" && <FeelingPage />}

      </div>

      {/* BACK BUTTON (cleaned) */}
      {view && (
        <button
          onClick={() => setView("")}
          className="mt-8 bg-[#d7d7d1] text-gray-700 px-5 py-2 rounded-xl shadow hover:shadow-md transition"
        >
          ⬅ Back
        </button>
      )}

      {/* POPUP */}
      {showPopup && <FeelingPopup onClose={() => setShowPopup(false)} />}

    </div>
  );
}

export default App;