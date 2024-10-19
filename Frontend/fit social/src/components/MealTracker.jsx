import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MealTracker({ userId }) {
  const [mealType, setMealType] = useState('breakfast');
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fitnessData, setFitnessData] = useState({ meals: { breakfast: [], lunch: [], dinner: [], snacks: [] }, totalDailyCalories: 0 });

  const calculateCalories = async () => {
    try {
      setLoading(true);
      console.log("Sending request with values:", {
        userId,
        mealType,
        foodItem,
      });

      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/mealtracker`, {
        params: {
          userId,
          mealType,
          foodItem,
        },
      });

      const { calories, totalDailyCalories } = response.data;
        console.log(calories);
        console.log(totalDailyCalories);
        
        
      // Update state with the received calories
    //   setCalories(calories);

      // Update the fitness data to display meals and total daily calories
    //   setFitnessData((prevData) => ({
    //     ...prevData,
    //     meals: {
    //       ...prevData.meals,
    //       [mealType]: [...prevData.meals[mealType], { name: foodItem, calories }],
    //     },
    //     totalDailyCalories,
    //   }));

      // Clear the input fields after submission
      setFoodItem('');
    } catch (error) {
      console.error('Failed to calculate calories:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load existing meals from the backend when the component mounts
  useEffect(() => {
    const loadExistingMeals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/mealfetch`, {
          params: { userId },
        });
        
        const { meals, totalDailyCalories } = response.data;

        setFitnessData({ meals, totalDailyCalories });
      } catch (error) {
        console.error('Failed to load existing meals:', error);
      }
    };

    loadExistingMeals();
  }, [userId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Meal Calorie Calculator</h2>
        <p className="text-sm text-gray-600 mb-4">Calculate calories for your meals</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateCalories();
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="meal-type" className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
              <select
                id="meal-type"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>
            <div>
              <label htmlFor="food-item" className="block text-sm font-medium text-gray-700 mb-1">Food Item</label>
              <input
                id="food-item"
                type="text"
                placeholder="e.g., 1 apple"
                value={foodItem}
                onChange={(e) => setFoodItem(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !foodItem}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          >
            {loading ? 'Calculating...' : 'Calculate Calories'}
          </button>
        </form>
        {calories !== null && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">
              Estimated calories: <span className="text-blue-500">{calories} kcal</span>
            </p>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Daily Meal Tracker</h2>
        <p className="text-sm text-gray-600 mb-4">Track your daily meals and calorie intake</p>
        <div className="space-y-4">
          {Object.entries(fitnessData.meals).map(([meal, items]) => (
            <div key={meal}>
              <h3 className="font-medium capitalize mb-2">{meal}</h3>
              <ul className="space-y-2">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm text-gray-700">
                      <span>{item.name}</span>
                      <span>{item.calories} kcal</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500">No meals recorded for this meal type.</li>
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold">
            Total Daily Calories: <span className="text-blue-500">{fitnessData.totalDailyCalories} kcal</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MealTracker;