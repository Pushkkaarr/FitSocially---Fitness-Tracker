import React, { useState } from "react";
import axios from "axios";
import { FaDumbbell, FaCalendarAlt, FaUserPlus, FaWeightHanging, FaRunning } from "react-icons/fa";
import { FaCalendarWeek } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { MdHealthAndSafety } from "react-icons/md";
import '../components/calorieforms.css'

const WorkoutPlan = () => {
  const [formData, setFormData] = useState({
    goal: "weight_loss",
    fitness_level: "intermediate",
    preferences: {
      exercise_types: "cardio",
      equipment_available: [],
    },
    health_conditions: [],
    schedule: {
      days_per_week: 4,
      session_duration: 45,
    },
    lang: "en",
    plan_duration_weeks: 4,
  });

  const [workoutPlan, setWorkoutPlan] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("preferences.")) {
      const key = name.split(".")[1];
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData({
        ...formData,
        preferences: {
          ...formData.preferences,
          [key]: selectedOptions,
        },
      });
    } else if (name.startsWith("schedule.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        schedule: {
          ...formData.schedule,
          [key]: value,
        },
      });
    } else if (name === "health_conditions") {
      const healthConditions = [...formData.health_conditions];
      if (healthConditions.includes(value)) {
        healthConditions.splice(healthConditions.indexOf(value), 1);
      } else {
        healthConditions.push(value);
      }
      setFormData({ ...formData, health_conditions: healthConditions });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/workOutPlan",
        formData
      ); // API call
      setWorkoutPlan(response.data);
    } catch (error) {
      console.error(error.message);
      alert("Failed to generate workout plan. Please try again.");
    }
  };

  return (
    <div className="space-y-6 h-screen flex items-center justify-center font-cambria">
      <div className="max-w-3xl mx-auto p-6 bg-white bg-opacity-30 backdrop-blur-lg shadow-lg rounded-lg border border-indigo-400 bg-gradient-to-r from-pink-500 to-indigo-500">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Generate Your Workout Plan
        </h1>
  
        <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-lg shadow-lg border border-indigo-400">
          {/* Goal */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              <FaWeightHanging className="inline-block mr-2" />
              Goal <span className="text-red-500">*</span>
            </label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintain">Maintain Weight</option>
            </select>
          </div>
  
          {/* Fitness Level */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              <FaUserPlus className="inline-block mr-2" />
              Fitness Level <span className="text-red-500">*</span>
            </label>
            <select
              name="fitness_level"
              value={formData.fitness_level}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
  
          {/* Exercise Types */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              <FaRunning className="inline-block mr-2" />
              Exercise Types <span className="text-red-500">*</span>
            </label>
            <select
              name="preferences.exercise_types"
              value={formData.preferences.exercise_types}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="cardio">Cardio</option>
              <option value="strength">Strength</option>
              <option value="flexibility">Flexibility</option>
            </select>
          </div>
  
          {/* Equipment Available */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              <FaDumbbell className="inline-block mr-2" />
              Equipment Available
            </label>
            <select
              name="preferences.equipment_available"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="dumbbells">Dumbbells</option>
              <option value="yoga_mat">Yoga Mat</option>
              <option value="exercise_bike">Exercise Bike</option>
              <option value="treadmill">Treadmill</option>
              <option value="kettlebells">Kettlebells</option>
              <option value="resistance_bands">Resistance Bands</option>
              <option value="none">None</option>
            </select>
          </div>
  
          {/* Health Conditions */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              <MdHealthAndSafety className="inline-block mr-2" />
              Health Conditions
            </label>
            <select
              name="health_conditions"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="knee_pain">Knee Pain</option>
              <option value="back_pain">Back Pain</option>
              <option value="shoulder_pain">Shoulder Pain</option>
              <option value="hip_pain">Hip Pain</option>
              <option value="diabetes">Diabetes</option>
              <option value="heart_condition">Heart Condition</option>
              <option value="none">None</option>
            </select>
          </div>
  
          {/* Schedule Days per Week */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              <FaCalendarAlt className="inline-block mr-2" />
              Days Per Week <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="schedule.days_per_week"
              value={formData.schedule.days_per_week}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
  
          {/* Session Duration */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              <IoMdTimer className="inline-block mr-2" />
              Session Duration (minutes) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="schedule.session_duration"
              value={formData.schedule.session_duration}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
  
          {/* Plan Duration (Weeks) */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              <FaCalendarWeek className="inline-block mr-2" />
              Plan Duration (weeks) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="plan_duration_weeks"
              value={formData.plan_duration_weeks}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Generate Plan
          </button>
        </form>
  
        {/* Display Workout Plan Output */}
        {workoutPlan && (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md border border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Your Workout Plan</h2>
            <p className="mb-2">
              <strong>Goal:</strong> {workoutPlan.plan.goal}
            </p>
            <p className="mb-2">
              <strong>Fitness Level:</strong> {workoutPlan.plan.fitness_level}
            </p>
            <p className="mb-2">
              <strong>Total Weeks:</strong> {workoutPlan.plan.plan_duration_weeks}
            </p>
            <p className="mb-2">
              <strong>Schedule:</strong> {workoutPlan.plan.schedule.days_per_week} days per week, {workoutPlan.plan.schedule.session_duration} minutes per session
            </p>
  
            <h3 className="font-bold mb-2">Exercises:</h3>
            <ul className="list-disc list-inside">
              {workoutPlan.plan.exercises.map((exercise, index) => (
                <li key={index}>
                  {exercise.name} - {exercise.sets} sets of {exercise.reps} reps
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default WorkoutPlan;
