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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl m-10">
      <h1 className="text-2xl font-bold mb-4">Generate Your Diet Plan</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Time Frame */}
        <div>
          <label className="block font-medium">Time Frame <span className="text-red-500">*</span></label>
          <select
            name="timeFrame"
            value={formData.timeFrame}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
          </select>
        </div>

        {/* Target Calories */}
        <div>
          <label className="block font-medium">Target Calories <span className="text-red-500">*</span></label>
          <input
            type="number"
            name="targetCalories"
            value={formData.targetCalories}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Diet Dropdown */}
        <div>
          <label className="block font-medium">Diet <span className="text-red-500">*</span></label>
          <select
            name="diet"
            value={formData.diet}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
          </select>
        </div>

        {/* Exclude (Optional) */}
        <div>
          <label className="block font-medium">Exclude (optional)</label>
          <input
            type="text"
            name="exclude"
            value={formData.exclude}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="e.g., shellfish, olives"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg" disabled={loading}>
          {loading ? "Generating..." : "Generate Plan"}
        </button>
      </form>

      {/* Display Diet Plan Output */}
      {error && <p className="text-red-500">{error}</p>}
      {dietPlan && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">{dietPlan.message}</h2>
          
          <div>
            <h3 className="font-bold">Meals:</h3>
            <ul>
              {dietPlan.mealPlan.meals.map((meal) => (
                <li key={meal.id} className="mb-4">
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
