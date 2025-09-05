import { useState } from "react";
import { Plus } from "lucide-react";

interface MenuItemForm {
  itemName: string;
  mealType: string;
  stock: string;
}

const AddMenuItem = () => {
  const [formData, setFormData] = useState<MenuItemForm>({
    itemName: "",
    mealType: "",
    stock: "",
  });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (field: keyof MenuItemForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.itemName || !formData.mealType || !formData.stock) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    const stockNumber = parseInt(formData.stock);
    if (isNaN(stockNumber) || stockNumber < 0) {
      setMessage({ type: "error", text: "Please enter a valid stock number" });
      return;
    }

    console.log("Adding menu item:", {
      name: formData.itemName,
      mealType: formData.mealType,
      stock: stockNumber,
    });

    setMessage({
      type: "success",
      text: `${formData.itemName} has been added to the menu`,
    });

    setFormData({
      itemName: "",
      mealType: "",
      stock: "",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
        🍽️ Add New Menu Item
      </h2>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 max-w-md">
        <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-indigo-600" />
          <span className="font-semibold text-gray-700">New Item Details</span>
        </div>

        <div className="p-6">
          {message && (
            <div
              className={`mb-4 px-4 py-2 rounded-lg text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Item Name */}
            <div className="space-y-2">
              <label
                htmlFor="itemName"
                className="text-sm font-medium text-gray-700"
              >
                Item Name
              </label>
              <input
                id="itemName"
                type="text"
                placeholder="Enter item name"
                value={formData.itemName}
                onChange={(e) => handleInputChange("itemName", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition"
              />
            </div>

            {/* Meal Type */}
            <div className="space-y-2">
              <label
                htmlFor="mealType"
                className="text-sm font-medium text-gray-700"
              >
                Meal Type
              </label>
              <select
                id="mealType"
                value={formData.mealType}
                onChange={(e) => handleInputChange("mealType", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition"
              >
                <option value="">Select meal type</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>

            {/* Stock Quantity */}
            <div className="space-y-2">
              <label
                htmlFor="stock"
                className="text-sm font-medium text-gray-700"
              >
                Stock Quantity
              </label>
              <input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                min="0"
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white font-semibold py-2.5 shadow-md hover:bg-indigo-700 transition"
            >
              <Plus className="h-4 w-4" />
              Add Menu Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMenuItem;
