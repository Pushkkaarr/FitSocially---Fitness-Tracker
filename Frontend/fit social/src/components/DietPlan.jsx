import React, { useState } from "react";
import axios from "axios";
import { IoFastFoodSharp, IoTime } from "react-icons/io5";
import { GiFruitBowl } from "react-icons/gi";
import { MdCancel } from "react-icons/md";

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
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/DietPlan?${params}`);
      setDietPlan(response.data);
    } catch (err) {
      setError("Failed to generate diet plan. Please try again.");
      console.error('Error:', err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="min-h-screen max-w-full w-screen mx-4 p-6 bg-gradient-to-r from-sky-400 to-blue-600 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-white font-cambria">
         1. Generate Your Diet Plan
        </h1>

        <div className="flex flex-col md:flex-row items-stretch  space-y-6 md:space-y-0 md:space-x-6">
          {/* Form Component */}
          <div className="flex items-center justify-center w-full ">
            <form
              onSubmit={handleSubmit}
              id="form1"
              className="space-y-4  bg-white min-h-[500px] min-w-[200px] bg-opacity-70  rounded-lg p-6 shadow-lg"
              style={{ fontFamily: 'Cambria, serif' }}
            >
              {/* Time Frame */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  <IoTime className="inline-block mr-2" /> Time Frame{' '}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="timeFrame"
                  value={formData.timeFrame}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.timeFrame ? 'border-red-500' : 'focus:ring-indigo-500'
                  }`}
                  required
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                </select>
                {errors.timeFrame && <p className="text-red-500">{errors.timeFrame}</p>}
              </div>

              {/* Target Calories */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  <IoFastFoodSharp className="inline-block mr-2" /> Target Calories{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="targetCalories"
                  value={formData.targetCalories}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.targetCalories ? 'border-red-500' : 'focus:ring-indigo-500'
                  }`}
                  required
                />
                {errors.targetCalories && <p className="text-red-500">{errors.targetCalories}</p>}
              </div>

              {/* Diet Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  <GiFruitBowl className="inline-block mr-2" /> Diet{' '}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="diet"
                  value={formData.diet}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.diet ? 'border-red-500' : 'focus:ring-indigo-500'
                  }`}
                  required
                >
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                </select>
                {errors.diet && <p className="text-red-500">{errors.diet}</p>}
              </div>

              {/* Exclude (Optional) */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  <MdCancel className="inline-block mr-2" /> Exclude (optional)
                </label>
                <input
                  type="text"
                  name="exclude"
                  value={formData.exclude}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.exclude ? 'border-red-500' : 'focus:ring-indigo-500'
                  }`}
                  placeholder="e.g., shellfish, olives"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Plan'}
              </button>
            </form>
          </div>

          {/* Display Diet Plan Output */}
          <div className="w-full  pl-4">
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            {dietPlan && (
              <div className="mt-8 p-6 bg-white bg-opacity-60 backdrop-blur-lg rounded-lg shadow-lg font-cambria">
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
        </div>
      </div>
    </div>
  );
};

export default DietPlan;
