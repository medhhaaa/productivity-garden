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
const [selectedPet, setSelectedPet] = useState(null);
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
  setSelectedPet(type); // 🔥 THIS WAS MISSING
  sessionStorage.setItem("pet", type);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3ef] via-[#edeae3] to-[#e6e2d8] text-center pt-12 relative text-gray-700">

      <h1 className="text-3xl font-bold tracking-wider text-[#3a7a3a]">
        🌸 Productivity Garden 🌸
      </h1>

      {/* HOME */}
      {!view && (
        <>
          <p className="mt-6 text-lg">{randomQuote}</p>

          <p className="mt-2 text-sm text-gray-600">
            now choose your pet and start doing whatever it is you have to do
          </p>

          <div className="flex justify-center gap-6 mt-6">

  <button
    onClick={() => selectPet("dog")}
    className={`text-4xl p-4 rounded-2xl shadow-md transition-all ${
      selectedPet === "dog"
        ? "bg-[#dcecc9] scale-110 ring-2 ring-[#6b7f4e]"
        : "bg-[#f1efe8] hover:scale-105"
    }`}
  >
    🐶
  </button>

  <button
    onClick={() => selectPet("cat")}
    className={`text-4xl p-4 rounded-2xl shadow-md transition-all ${
      selectedPet === "cat"
        ? "bg-[#dcecc9] scale-110 ring-2 ring-[#6b7f4e]"
        : "bg-[#f1efe8] hover:scale-105"
    }`}
  >
    🐱
  </button>

</div>

          <button
            onClick={() => setView("timer")}
            disabled={!pet}
            className="mt-12 px-10 py-4 bg-green-500 text-white rounded-full"
          >
            Let’s Grind
          </button>
        </>
      )}

      {/* NAV */}
      {view && (
  <div className="flex justify-center gap-4 mt-6">

    <button
      onClick={() => setView("timer")}
      className="bg-[#7d8f61] text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition"
    >
      Timer
    </button>

    <button
      onClick={() => setView("todo")}
      className="bg-[#95ab78] text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition"
    >
      Todo
    </button>

    <button
      onClick={() => setView("feeling")}
      className="bg-[#b8a96d] text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition"
    >
      Feeling
    </button>

  </div>
)}

      {/* 🔥 TIMER ALWAYS RUNS (IMPORTANT FIX) */}
      <Timer view={view} />

      <div className="mt-10 px-10">

        {/* TODO */}
        {view === "todo" && (
          <div className="flex gap-6 w-full">
            <div className="w-[70%]">
              <Todo />
            </div>

            <div className="w-[30%] bg-[#fbfaf7] rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
              <PetCard />
            </div>
          </div>
        )}

        {/* FEELING */}
        {view === "feeling" && <FeelingPage />}

      </div>

      {/* BACK */}
      {view && (
        <button
          onClick={() => setView("")}
          className="mt-8 px-5 py-2 bg-gray-200 rounded-xl"
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