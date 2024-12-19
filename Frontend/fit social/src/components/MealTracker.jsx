
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MealTracker({userId,onTotalCaloriesUpdate}) {
  const [mealType, setMealType] = useState('breakfast');
  const [foodItem, setFoodItem] = useState('');
  const [calorieData, setCalorieData] = useState(null);
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]); // State to hold fetched meals
  const [totalCalories, setTotalCalories] = useState(0); // State to store total calories


  const fitnessData = {
    meals: {
      breakfast: [{ name: '1 apple', calories: 95 }],
      lunch: [{ name: 'Grilled chicken sandwich', calories: 400 }],
      dinner: [{ name: 'Salmon with vegetables', calories: 600 }],
      snacks: [{ name: 'Protein bar', calories: 200 }],
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      userId,
      mealType,
      foodItem,
    };

    try {
      // Send POST request to the backend API using axios
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/mealtracker`, requestBody);

      // Update state with the response data
      setCalorieData(response.data.meal);
      setFoodItem('')
      setError(null); // Clear any previous errors
      fetchMeals()
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error); // Backend error message
      } else {
        setError('Failed to connect to the server'); // Connection or other error
      }
      setCalorieData(null); // Clear calorie data on error
    }
  };

  
  const fetchMeals = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/mealfetch`, {
        params: { userId },
      });
      // Set the fetched meals in state
      setMeals(response.data.meals);
      setTotalCalories(response.data.totalCalories)
      onTotalCaloriesUpdate(response.data.totalCalories);
      console.log("Fetched meals:", response.data.meals); // Log the fetched meals
      console.log("Total calories:", response.data.totalCalories); // Log total calories
    } catch (error) {
      console.error('Error fetching meals:', error);
      setError('Failed to fetch meals');
    }
  };

  // useEffect to call fetchMeals when the component mounts or userId changes
  useEffect(() => {
    fetchMeals();
  }, [userId]); // Dependency on userId to refetch meals if userId changes

  // Log meals whenever they change
  useEffect(() => {
    console.log("Updated meals:", meals);
  }, [meals]); // Log meals state whenever it changes

  
  const breakfastMeals = meals.filter(meal => meal.mealType === 'breakfast');
  const lunchMeals = meals.filter(meal => meal.mealType === 'lunch');
  const dinnerMeals = meals.filter(meal => meal.mealType === 'dinner');
  const snackMeals = meals.filter(meal => meal.mealType === 'snack');
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
      <div className="bg-white bg-opacity-85 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Meal Calorie Calculator</h2>
        <p className="text-sm text-gray-600 mb-4">Calculate calories for your meals</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="meal-type" className="block text-sm font-medium text-gray-700 mb-1">
                Meal Type
              </label>
              <select
                id="meal-type"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snacks</option>
              </select>
            </div>
            <div>
              <label htmlFor="food-item" className="block text-sm font-medium text-gray-700 mb-1">
                Food Item
              </label>
              <input
                id="food-item"
                type="text"
                placeholder="e.g., 1 apple"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={foodItem}
                onChange={(e) => setFoodItem(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          >
            Calculate Calories
          </button>
        </form>
        {calorieData && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Meal Info</h3>
            <p>{`Food Item: ${calorieData.foodItem}`}</p>
            <p>{`Meal Type: ${calorieData.mealType}`}</p>
            <p>{`Calories: ${calorieData.calories}`}</p>
          </div>
        )}        </div>

      <div className="bg-white bg-opacity-85 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Daily Meal Tracker</h2>
        <p className="text-sm text-gray-600 mb-4">Track your daily meals and calorie intake</p>
        <div className="space-y-4">
        
        <h3 className="font-medium capitalize mb-2">Breakfast</h3>
      <ul className="space-y-2">
        {breakfastMeals.length > 0 ? (
          breakfastMeals.map(meal => (
            <li key={meal.id} className="flex justify-between text-sm text-gray-700">
              <span>{meal.foodItem}</span>
              <span>{meal.calories} kcal</span>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-700">No breakfast meals logged.</li>
        )}
      </ul>

      <h3 className="font-medium capitalize mb-2">Lunch</h3>
      <ul className="space-y-2">
        {lunchMeals.length > 0 ? (
          lunchMeals.map(meal => (
            <li key={meal.id} className="flex justify-between text-sm text-gray-700">
              <span>{meal.foodItem}</span>
              <span>{meal.calories} kcal</span>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-700">No lunch meals logged.</li>
        )}
      </ul>

      <h3 className="font-medium capitalize mb-2">Dinner</h3>
      <ul className="space-y-2">
        {dinnerMeals.length > 0 ? (
          dinnerMeals.map(meal => (
            <li key={meal.id} className="flex justify-between text-sm text-gray-700">
              <span>{meal.foodItem}</span>
              <span>{meal.calories} kcal</span>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-700">No dinner meals logged.</li>
        )}
      </ul>

      <h3 className="font-medium capitalize mb-2">Snacks</h3>
      <ul className="space-y-2">
        {snackMeals.length > 0 ? (
          snackMeals.map(meal => (
            <li key={meal.id} className="flex justify-between text-sm text-gray-700">
              <span>{meal.foodItem}</span>
              <span>{meal.calories} kcal</span>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-700">No snack meals logged.</li>
        )}
      </ul>

      {error && <p>{error}</p>}
     <div className="mt-4  text-xl font-bold">
        Total Calories: {totalCalories} kcal
      </div>
         
        </div>
      </div>
    </div>
  );
}

export default MealTracker;