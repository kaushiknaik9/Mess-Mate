"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<"student" | "admin">("student");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password, type }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        if (data.type === "admin") router.push("./admin");
        else router.push("./dashboard");
      } else {
        alert(data.msg || "Invalid login credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-yellow-100 via-white to-orange-100 relative overflow-hidden">
      {/* background bubbles */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-yellow-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-orange-300 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>

      <form
        onSubmit={handleLogin}
        className="relative backdrop-blur-xl bg-white/60 p-10 rounded-3xl shadow-2xl space-y-6 w-96 border border-white/30"
      >
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-yellow-600 via-orange-600 to-red-500 bg-clip-text text-transparent drop-shadow-md">
          Login
        </h2>

        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID"
          className="border border-yellow-300/40 p-3 w-full rounded-xl bg-white/40 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border border-yellow-300/40 p-3 w-full rounded-xl bg-white/40 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value as "student" | "admin")}
          className="border border-yellow-300/40 p-3 w-full rounded-xl bg-white/40 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className={`w-full p-3 rounded-xl font-bold text-white text-lg transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:scale-105 shadow-xl"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
