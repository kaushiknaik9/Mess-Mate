"use client";

import ProtectedPage from "@/components/protectedpage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  available: boolean;
  mealType: string;
}

export default function StudentDashboard() {
  const [groupedMenu, setGroupedMenu] = useState<{ [key: string]: MenuItem[] }>(
    {}
  );
  const [studentId, setStudentId] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();
        const menuItems: MenuItem[] = data.menu || [];

        const grouped: { [key: string]: MenuItem[] } = {};
        menuItems.forEach((item) => {
          if (!grouped[item.mealType]) grouped[item.mealType] = [];
          grouped[item.mealType].push(item);
        });

        setGroupedMenu(grouped);
      } catch (err) {
        console.error("Menu fetch failed:", err);
      }
    }
    fetchMenu();
  }, []);

  const handleFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, message: feedbackMsg, rating }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Feedback submitted successfully!");
        setStudentId("");
        setFeedbackMsg("");
        setRating(5);
      } else {
        alert(data.msg || "Error submitting feedback");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const mealOrder = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  return (
    <ProtectedPage allowedType="student">
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-tr from-yellow-100 via-pink-50 to-purple-100">
        <header className="w-full py-4 bg-white/60 backdrop-blur-md shadow-md">
          <h1 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-pink-500 to-purple-600 drop-shadow-sm">
            🎓 Student Dashboard
          </h1>
        </header>

        <main className="flex-1 container mx-auto px-6 py-10 space-y-12">
          <section className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-8">
            <h2 className="text-2xl font-bold text-yellow-600 mb-6 text-center">
              🍽️ Today’s Menu
            </h2>

            {Object.keys(groupedMenu).length ? (
              mealOrder.map(
                (meal) =>
                  groupedMenu[meal] && (
                    <div
                      key={meal}
                      className="mb-6 bg-white/60 p-6 rounded-xl shadow-md border border-white/30 hover:scale-[1.01] transition-transform"
                    >
                      <h3 className="font-bold text-lg mb-3 text-pink-600 flex items-center">
                        {meal}
                      </h3>
                      {groupedMenu[meal].map((item) => (
                        <div
                          key={item._id}
                          className="py-2 border-b last:border-b-0 flex justify-between items-center"
                        >
                          <div>
                            <span className="font-semibold text-gray-800">
                              {item.name}
                            </span>
                            {item.description && (
                              <p className="text-sm text-gray-600">
                                {item.description}
                              </p>
                            )}
                          </div>
                          {!item.available && (
                            <span className="text-red-500 text-sm font-semibold ml-2">
                              Not Available
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )
              )
            ) : (
              <p className="text-gray-500 text-center">
                No menu available yet.
              </p>
            )}
          </section>

          <section className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-8">
            <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">
              💬 Share Your Feedback
            </h2>
            <form onSubmit={handleFeedback} className="space-y-4">
              <input
                type="text"
                placeholder="Your Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full border border-white/40 p-3 rounded-xl bg-white/40 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                required
              />
              <textarea
                placeholder="Write your feedback..."
                value={feedbackMsg}
                onChange={(e) => setFeedbackMsg(e.target.value)}
                className="w-full border border-white/40 p-3 rounded-xl bg-white/40 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                required
              />
              <input
                type="number"
                placeholder="Rating (1-5)"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full border border-white/40 p-3 rounded-xl bg-white/40 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-3 rounded-xl font-bold text-white text-lg transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 hover:scale-105 shadow-xl"
                }`}
              >
                {loading ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </section>
        </main>

        <footer className="w-full py-4 bg-white/60 backdrop-blur-md shadow-inner text-center text-gray-700 text-sm">
          © {new Date().getFullYear()} MessMate · All Rights Reserved
        </footer>
      </div>
    </ProtectedPage>
  );
}
