import React, { useState } from "react";
import axios from "axios";

const DietPlan = () => {
  const [formData, setFormData] = useState({
    timeFrame: "day",
    targetCalories: 2000,
    diet: "vegetarian",
    exclude: "", // Default to an empty string
  });

  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({}); // Add errors state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.timeFrame) {
      validationErrors.timeFrame = "Time frame is required.";
    }
    if (!formData.targetCalories || formData.targetCalories <= 0) {
      validationErrors.targetCalories = "Target calories must be a positive number.";
    }
    if (!formData.diet) {
      validationErrors.diet = "Diet is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop submission if validation fails

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams(formData).toString(); // Convert formData to query string
      const response = await axios.get(`http://localhost:3000/api/user/DietPlan?${params}`);
      setDietPlan(response.data);
    } catch (err) {
      setError("Failed to generate diet plan. Please try again.");
      console.error('Error:', err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg m-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        Generate Your Diet Plan
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Time Frame */}
        <div className="flex flex-wrap -mx-2">
          <div className="w-full px-2 mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Time Frame <span className="text-red-500">*</span>
            </label>
            <select
              name="timeFrame"
              value={formData.timeFrame}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.timeFrame ? "border-red-500" : "focus:ring-indigo-500"
              }`}
              required
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
            </select>
            {errors.timeFrame && <p className="text-red-500">{errors.timeFrame}</p>}
          </div>
        </div>

        {/* Target Calories */}
        <div className="flex flex-wrap -mx-2">
          <div className="w-full px-2 mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Target Calories <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="targetCalories"
              value={formData.targetCalories}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.targetCalories ? "border-red-500" : "focus:ring-indigo-500"
              }`}
              required
            />
            {errors.targetCalories && <p className="text-red-500">{errors.targetCalories}</p>}
          </div>
        </div>

        {/* Diet Dropdown */}
        <div className="flex flex-wrap -mx-2">
          <div className="w-full px-2 mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Diet <span className="text-red-500">*</span>
            </label>
            <select
              name="diet"
              value={formData.diet}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.diet ? "border-red-500" : "focus:ring-indigo-500"
              }`}
              required
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
            </select>
            {errors.diet && <p className="text-red-500">{errors.diet}</p>}
          </div>
        </div>

        {/* Exclude (Optional) */}
        <div className="flex flex-wrap -mx-2">
          <div className="w-full px-2 mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Exclude (optional)
            </label>
            <input
              type="text"
              name="exclude"
              value={formData.exclude}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.exclude ? "border-red-500" : "focus:ring-indigo-500"
              }`}
              placeholder="e.g., shellfish, olives"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Plan"}
        </button>
      </form>

      {/* Display Diet Plan Output */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {dietPlan && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">
            {dietPlan.message}
          </h2>
          <div>
            <h3 className="font-bold">Meals:</h3>
            {dietPlan?.mealPlan?.meals && dietPlan.mealPlan.meals.length > 0 ? (
  <ul className="space-y-4">
    {dietPlan.mealPlan.meals.map((meal) => (
      <li key={meal.id}>
        <p className="font-medium text-lg">{meal.title}</p>
        <p>Ready in: {meal.readyInMinutes} minutes</p>
        <p>Servings: {meal.servings}</p>
        <a
          href={meal.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Recipe
        </a>
      </li>
    ))}
  </ul>
) : (
  <p>No meals available for the selected criteria.</p>
)}

          </div>

          <div className="mt-4">
            <h3 className="font-bold">Nutrients:</h3>
            <p>Calories: {dietPlan.mealPlan.nutrients.calories}</p>
            <p>Protein: {dietPlan.mealPlan.nutrients.protein}g</p>
            <p>Fat: {dietPlan.mealPlan.nutrients.fat}g</p>
            <p>Carbohydrates: {dietPlan.mealPlan.nutrients.carbohydrates}g</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlan;
