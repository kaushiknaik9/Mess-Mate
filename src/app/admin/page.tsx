"use client";

import ProtectedPage from "@/components/protectedpage";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import FeedbackSummary from "@/components/FeedbackSummary";
import AddMenuItem from "@/components/AddMenuItem";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  available: boolean;
  mealType: string;
}

export default function AdminPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  // edit modal state
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editMealType, setEditMealType] = useState("Breakfast");
  const [editAvailable, setEditAvailable] = useState(true);

  // fetch initial menu
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();
        setMenu(data.menu || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // add item (state update instead of refresh)
  const handleAdd = (newItem: MenuItem) => {
    setMenu((prev) => [...prev, newItem]);
  };

  // delete item
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMenu((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("❌ Failed to delete item");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // open edit modal
  const handleEdit = (item: MenuItem) => {
    setEditing(item);
    setEditName(item.name);
    setEditDesc(item.description || "");
    setEditMealType(item.mealType);
    setEditAvailable(item.available);
  };

  // save edit
  const handleSaveEdit = async () => {
    if (!editing) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/menu/${editing._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          description: editDesc,
          mealType: editMealType,
          available: editAvailable,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setMenu((prev) =>
          prev.map((item) => (item._id === editing._id ? updated : item))
        );
        setEditing(null);
      } else {
        alert("❌ Failed to update item");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // group menu by mealType
  const grouped = menu.reduce((acc, item) => {
    if (!acc[item.mealType]) acc[item.mealType] = [];
    acc[item.mealType].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <ProtectedPage allowedType="admin">
      <div className="min-h-screen bg-gradient-to-tr from-purple-50 via-pink-50 to-yellow-50 flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto px-6 py-8 space-y-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 text-center mb-6">
            🛠️ Admin Dashboard
          </h1>

          {/* Menu Section */}
          <section className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              🍽️ Today’s Menu
            </h2>
            {["Breakfast", "Lunch", "Snacks", "Dinner"].map((meal) => (
              <div key={meal} className="mb-6">
                <h3 className="font-bold text-lg mb-2">{meal} 🍴</h3>
                {grouped[meal] && grouped[meal].length > 0 ? (
                  <div className="space-y-2">
                    {grouped[meal].map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center border p-2 rounded"
                      >
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                          {!item.available && (
                            <span className="text-red-500 text-xs">
                              Not Available
                            </span>
                          )}
                        </div>
                        <div className="space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No items</p>
                )}
              </div>
            ))}
          </section>

          {/* Add Menu Item */}
          <section className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              ➕ Add Menu Item
            </h2>
            <AddMenuItem onAdded={handleAdd} />
          </section>

          {/* Feedback Section */}
          <section className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-6">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">
              📊 Feedback Summary
            </h2>
            <FeedbackSummary />
          </section>
        </main>

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">✏️ Edit Menu Item</h2>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Item name"
                className="w-full border p-2 rounded mb-2"
              />
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Description"
                className="w-full border p-2 rounded mb-2"
              />
              <select
                value={editMealType}
                onChange={(e) => setEditMealType(e.target.value)}
                className="w-full border p-2 rounded mb-2"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Snacks">Snacks</option>
                <option value="Dinner">Dinner</option>
              </select>
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={editAvailable}
                  onChange={(e) => setEditAvailable(e.target.checked)}
                />
                <span>Available</span>
              </label>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditing(null)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={loading}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedPage>
  );
}
