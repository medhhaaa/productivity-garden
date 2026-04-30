import { useState, useEffect } from "react";
import happy from "../assets/happy.png";
import loved from "../assets/loved.png";
import confused from "../assets/confused.png";
import anxious from "../assets/anxious.png";
import disapointed from "../assets/disapointed.png";
import anger from "../assets/anger.png";
import numbness from "../assets/numbness.png";
import sad from "../assets/sad.png";
import tired from "../assets/tired.png";

const feelings = [
  { label: "Happy", img: happy },
  { label: "Loved", img: loved },
  { label: "Confused", img: confused },
  { label: "Anxious", img: anxious },
  { label: "Disappointed", img: disapointed },
  { label: "Angry", img: anger },
  { label: "Numb", img: numbness },
  { label: "Sad", img: sad },
  { label: "Tired", img: tired },
];

function FeelingPopup({ onClose }) {

  const [selected, setSelected] = useState("");
  const [reason, setReason] = useState("");
  const [wish, setWish] = useState("");

  const saveEntry = () => {
    if (!selected) return;

    const today = new Date().toISOString().split("T")[0];

    const existing = JSON.parse(localStorage.getItem("feelings")) || {};

    if (!existing[today]) existing[today] = [];

    existing[today].push({
      feeling: selected,
      reason,
      wish,
    });

    localStorage.setItem("feelings", JSON.stringify(existing));

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-[#dcecc9] p-6 rounded-2xl w-[600px] shadow-lg relative">

        <button onClick={onClose} className="absolute top-2 right-3">✖</button>

        <h2 className="text-center text-lg font-semibold mb-4">
          How I feel today?
        </h2>

        {/* FEELINGS */}
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          <div className="flex justify-center gap-2 mb-4 flex-wrap">
  {feelings.map((feeling) => (
    <button
      key={feeling.label}
      onClick={() => setSelected(feeling.label)}
      className={`flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-200 ${
  selected === feeling.label
    ? "bg-white scale-110 shadow-md ring-2 ring-[#6b7f4e]"
    : "bg-[#edf5e1] hover:scale-105 hover:shadow"
}`}
    >
      
      <img
        src={feeling.img}
        alt={feeling.label}
        className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-110"
      />
      <span className="text-xs mt-1">{feeling.label}</span>
    </button>
  ))}
</div>
        </div>

        {/* TEXT AREAS */}
        <div className="flex gap-3 mb-4">
          <textarea
            placeholder="What made me feel that way?"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-1/2 p-2 rounded"
          />

          <textarea
            placeholder="What I wish for myself tomorrow?"
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            className="w-1/2 p-2 rounded"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={saveEntry}
            className="bg-white px-4 py-2 rounded shadow"
          >
            Save for today
          </button>
        </div>

      </div>
    </div>
  );
}

export default FeelingPopup;