"use client";
import { useState } from "react";

interface AddMenuItemProps {
  onAdded: (item: any) => void;
}

export default function AddMenuItem({ onAdded }: AddMenuItemProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [available, setAvailable] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, mealType, available }),
      });

      if (res.ok) {
        const newItem = await res.json(); // server returns created menu item
        onAdded(newItem); // 👈 update parent instantly
        setName("");
        setDescription("");
        setMealType("Breakfast");
        setAvailable(true);
      } else {
        alert("❌ Failed to add item");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <select
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Snacks">Snacks</option>
        <option value="Dinner">Dinner</option>
      </select>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
        />
        <span>Available</span>
      </label>
      <button
        type="submit"
        className="px-3 py-1 bg-green-500 text-white rounded"
      >
        Add
      </button>
    </form>
  );
}
