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
import "../App.css";
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
function FeelingPage() {
    const [data, setData] = useState({});
    const [selected, setSelected] = useState("");
    const [reason, setReason] = useState("");
    const [wish, setWish] = useState("");

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("feelings")) || {};
        setData(stored);
    }, []);

    const saveEntry = () => {
        if (!selected) return;

        const existing = JSON.parse(localStorage.getItem("feelings")) || {};

        if (!existing[today]) existing[today] = [];

        existing[today].push({
            feeling: selected,
            reason,
            wish,
        });

        localStorage.setItem("feelings", JSON.stringify(existing));
        setData(existing);

        // reset
        setSelected("");
        setReason("");
        setWish("");
    };

    // 🔹 SHORT SUMMARY FORMAT
    const getShortSummary = (entries) => {
        if (!entries || entries.length === 0) return "";

        // remove duplicates
        const feelings = [...new Set(entries.map(e => e.feeling))].join(", ");
        const wishes = [...new Set(entries.map(e => e.wish).filter(Boolean))].join(", ");
        const reasons = [...new Set(entries.map(e => e.reason).filter(Boolean))].join(", ");

        return (
            <>
                <p>
                    Today was a mix of {feelings}.
                </p>

                {wishes && (
                    <p>
                        You carried hopes for {wishes}.
                    </p>
                )}

                {reasons && (
                    <p>
                        Moments like {reasons} shaped how you felt.
                    </p>
                )}
            </>
        );
    };

    return (
        <div className="bg-[#fbfaf7] p-6 rounded-2xl shadow-md border border-white/40">

            {/* ================= FORM (CENTER) ================= */}
            <div className="bg-[#dcecc9] p-6 rounded-2xl mb-6">

                <h2 className="text-center text-lg font-semibold mb-4">
                    How I feel today?
                </h2>

                {/* FEELINGS */}
                <div className="flex justify-between gap-2 mb-4 flex-wrap">
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
    <img src={feeling.img} alt={feeling.label} className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-110" />
    <span className="text-xs">{feeling.label}</span>
  </button>
))}
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

            {/* ================= HISTORY ================= */}
            <h2 className="text-xl font-semibold mb-4 text-[#5f7245] text-center">
                Your Feeling History
            </h2>

            {Object.keys(data).length === 0 && (
                <p className="text-gray-500 text-sm text-center">
                    No entries yet
                </p>
            )}

            <div className="max-h-[400px] overflow-y-auto grid grid-cols-2 gap-4">

                {Object.keys(data)
                    .sort((a, b) => new Date(b) - new Date(a))
                    .map((date) => {
                        const entries = data[date];

                        return (
                            <div
                                key={date}
                                className="bg-white p-4 rounded-xl shadow border border-gray-100 h-full"              >
                                <h3 className="font-semibold text-[#6b7f4e] mb-2">
                                    {date}
                                </h3>

                                <div className="text-sm text-gray-600 space-y-1 italic leading-relaxed">
                                    {getShortSummary(entries)}
                                </div>
                            </div>
                        );
                    })}
            </div>

        </div>
    );
}

export default FeelingPage;