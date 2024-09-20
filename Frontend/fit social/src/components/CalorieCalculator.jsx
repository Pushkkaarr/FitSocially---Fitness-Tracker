import React, { useState } from "react";
import axios from "axios"; // Import axios
import {
  FaWeightHanging,
  FaRulerVertical,
  FaBirthdayCake,
  FaVenusMars,
  FaRunning,
  FaBullseye,
} from "react-icons/fa";

const CalorieCalculator = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    goal: "",
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/calculate-calories",
          formData
        );
        setResult({
          bmr: Math.round(response.data.BMR), // Use correct case
          tdee: Math.round(response.data.TotalDailyEnergyExpenditure), // Use correct case
          finalCalories: Math.round(response.data.finalCalories), // Use correct case
        });
      } catch (error) {
        console.error("Error calculating calories:", error);
        setErrors({ form: "Failed to calculate calories. Please try again." });
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        Daily Calorie Calculator
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
              <FaBirthdayCake className="inline-block mr-2" />
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.age ? "border-red-500" : "focus:ring-indigo-500"
              }`}
              placeholder="Enter your age"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="gender">
              <FaVenusMars className="inline-block mr-2" />
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.gender ? "border-red-500" : "focus:ring-indigo-500"
              }`}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="height">
              <FaRulerVertical className="inline-block mr-2" />
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.height ? "border-red-500" : "focus:ring-indigo-500"
              }`}
              placeholder="Enter your height"
            />
            {errors.height && (
              <p className="text-red-500 text-sm mt-1">{errors.height}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="weight">
              <FaWeightHanging className="inline-block mr-2" />
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.weight ? "border-red-500" : "focus:ring-indigo-500"
              }`}
              placeholder="Enter your weight"
            />
            {errors.weight && (
              <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="activityLevel">
            <FaRunning className="inline-block mr-2" />
            Activity Level
          </label>
          <select
            id="activityLevel"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.activityLevel ? "border-red-500" : "focus:ring-indigo-500"
            }`}
          >
            <option value="">Select activity level</option>
            <option value="sedentary">Sedentary</option>
            <option value="lightly active">Lightly Active</option>
            <option value="moderately active">Moderately Active</option>
            <option value="very active">Very Active</option>
          </select>
          {errors.activityLevel && (
            <p className="text-red-500 text-sm mt-1">{errors.activityLevel}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="goal">
            <FaBullseye className="inline-block mr-2" />
            Goal
          </label>
          <select
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.goal ? "border-red-500" : "focus:ring-indigo-500"
            }`}
          >
            <option value="">Select goal</option>
            <option value="lose">Weight Loss</option>
            <option value="maintain">Maintenance</option>
            <option value="gain">Muscle Gain</option>
          </select>
          {errors.goal && (
            <p className="text-red-500 text-sm mt-1">{errors.goal}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Calculate
        </button>
      </form>
      {result && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-indigo-600">Results</h3>
          <div className="space-y-2">
            <p>
              <strong>Basal Metabolic Rate (BMR):</strong> {result.bmr} kcal
            </p>
            <p>
              <strong>Total Daily Energy Expenditure (TDEE):</strong> {result.tdee} kcal
            </p>
            <p>
              <strong>Final Daily Caloric Needs:</strong> {result.finalCalories} kcal
            </p>
          </div>
        </div>
      )}
      {errors.form && (
        <p className="text-red-500 text-sm mt-4">{errors.form}</p>
      )}
    </div>
  );
};

export default CalorieCalculator;