import React, { useState } from "react";
import axios from "axios";
import { FaDumbbell, FaCalendarAlt, FaUserPlus, FaWeightHanging, FaRunning } from "react-icons/fa";
import { FaCalendarWeek } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { MdHealthAndSafety } from "react-icons/md";
import '../components/calorieforms.css';

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
    <div className="flex flex-col items-center justify-center min-h-screen font-cambria">
      <div className="max-w-full w-screen mx-auto p-6 bg-gradient-to-r from-sky-400 to-blue-600 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
         3. Generate Your Workout Plan
        </h1>
        {/* Flex Container for Form and Output */}
        <div className="flex flex-col md:flex-row">
          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="block min-h-[500px] min-w-[400px] text-gray-700 font-bold mb-2 space-y-6 bg-white bg-opacity-70 rounded-lg p-6 shadow-lg flex-1 transition-all duration-300"
          >
            {/* Row 1 */}
            <div className="flex space-x-4">
              <div className="flex-1">
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
              <div className="flex-1">
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
            </div>

            {/* Row 2 */}
            <div className="flex space-x-4">
              <div className="flex-1">
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
              <div className="flex-1">
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
            </div>

            {/* Row 3 */}
            <div className="flex space-x-4">
              <div className="flex-1">
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
              <div className="flex-1">
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
            </div>

            {/* Row 4 */}
            <div className="flex space-x-4">
              <div className="flex-1">
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
              <div className="flex-1">
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
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition"
            >
              Generate Plan
            </button>
          </form>

          {/* Output Section */}
          <div className="flex-1 ml-6">
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
      </div>
    </div>
  );
};

export default WorkoutPlan;
