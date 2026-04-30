import { useState, useEffect } from "react";

function PetCard() {
  const pet = sessionStorage.getItem("pet") || "dog";
  const [petStage, setPetStage] = useState(0);

  // animation state
  const [animate, setAnimate] = useState(false);
  const [lastMilestone, setLastMilestone] = useState(0);

  // load pet + stage
  useEffect(() => {
    const interval = setInterval(() => {
      const stage = Number(sessionStorage.getItem("petStage")) || 0;
      setPetStage(stage);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // milestone-based animation (every 25%)
  useEffect(() => {
    const interval = setInterval(() => {
      const tasks = JSON.parse(sessionStorage.getItem("tasks")) || [];

      const completed = tasks.filter(t => t.done).length;
      const total = tasks.length;

      const progress = total === 0 ? 0 : (completed / total) * 100;

      // milestone logic (0,25,50,75,100)
      const milestone = Math.floor(progress / 25) * 25;

      if (milestone > lastMilestone && milestone > 0) {
        setAnimate(true);
        setLastMilestone(milestone);

        setTimeout(() => {
          setAnimate(false);
        }, 400);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [lastMilestone]);

  // pet display
  const getPetDisplay = () => {
    if (pet === "dog") {
      if (petStage === 0) return "🐶";   // baby
      if (petStage === 1) return "🐕";   // small
      if (petStage === 2) return "🐕‍🦺"; // grown
      if (petStage >= 3) return "🦮";    // max
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
    <div className="text-center w-full bg-[#fbfaf7] rounded-2xl border border-white/60 shadow-md p-6">
      <h2 className="text-lg font-semibold mb-5 text-[#5f7245]">Your Pet</h2>

      <div className="relative flex justify-center items-center">

        {/* FLASH */}
        {animate && (
          <div className="absolute w-24 h-24 bg-yellow-200 opacity-30 blur-xl rounded-full transition-all duration-500 ease-out animate-pulse"></div>
        )}

        {/* PET */}
        <p
          className={`transform transition-all duration-500 ease-in-out opacity-100 translate-y-0 hover:scale-105 ${petStage === 0
              ? "text-5xl"
              : petStage === 1
                ? "text-6xl"
                : petStage === 2
                  ? "text-7xl"
                  : "text-8xl"
            } ${animate ? "scale-110 animate-[bounce_0.8s_ease-in-out_1] opacity-100 translate-y-0" : "scale-100 opacity-100 translate-y-0"}`}
        >
          {getPetDisplay()}
        </p>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Stage: {petStage}
      </p>
    </div>
  );
}

export default PetCard;