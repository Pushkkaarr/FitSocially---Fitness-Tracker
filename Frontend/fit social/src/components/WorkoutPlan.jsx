import React, { useState } from "react";
import axios from "axios";

const WorkoutPlan = () => {
  const [formData, setFormData] = useState({
    goal: "weight_loss",
    fitness_level: "intermediate",
    preferences: {
      exercise_types: [],
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
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
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
      const response = await axios.post("http://localhost:3000/api/user/workOutPlan", formData); // API call
      setWorkoutPlan(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate workout plan. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Generate Your Workout Plan</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Goal */}
        <div>
          <label className="block font-medium">Goal</label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="maintain">Maintain Weight</option>
          </select>
        </div>

        {/* Fitness Level */}
        <div>
          <label className="block font-medium">Fitness Level</label>
          <select
            name="fitness_level"
            value={formData.fitness_level}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Exercise Types */}
        <div>
          <label className="block font-medium">Exercise Types</label>
          <select
            name="preferences.exercise_types"
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            multiple
          >
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
            <option value="flexibility">Flexibility</option>
          </select>
        </div>

        {/* Equipment Available */}
        <div>
          <label className="block font-medium">Equipment Available</label>
          <select
            name="preferences.equipment_available"
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            multiple
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
          <label className="block font-medium">Health Conditions</label>
          <select
            name="health_conditions"
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            multiple
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
          <label className="block font-medium">Days Per Week</label>
          <input
            type="number"
            name="schedule.days_per_week"
            value={formData.schedule.days_per_week}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Session Duration */}
        <div>
          <label className="block font-medium">Session Duration (minutes)</label>
          <input
            type="number"
            name="schedule.session_duration"
            value={formData.schedule.session_duration}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Plan Duration (Weeks) */}
        <div>
          <label className="block font-medium">Plan Duration (weeks)</label>
          <input
            type="number"
            name="plan_duration_weeks"
            value={formData.plan_duration_weeks}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          Generate Plan
        </button>
      </form>

      {/* Display Workout Plan Output */}
      {workoutPlan && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Your Workout Plan</h2>
          <p>Goal: {workoutPlan.goal}</p>
          <p>Fitness Level: {workoutPlan.fitness_level}</p>
          <p>Total Weeks: {workoutPlan.total_weeks}</p>
          <p>Schedule: {workoutPlan.schedule.days_per_week} days per week, {workoutPlan.schedule.session_duration} minutes per session</p>
          
          <h3 className="font-bold">Exercises:</h3>
          {workoutPlan.exercises.map((dayPlan) => (
            <div key={dayPlan.day} className="mb-4">
              <h4 className="font-semibold">{dayPlan.day}</h4>
              {dayPlan.exercises.map((exercise, index) => (
                <p key={index}>
                  {exercise.name} - {exercise.duration}, {exercise.repetitions} reps, {exercise.sets} sets ({exercise.equipment})
                </p>
              ))}
            </div>
          ))}

          <h3 className="font-bold">SEO Info:</h3>
          <p>Title: {workoutPlan.seo_title}</p>
          <p>Content: {workoutPlan.seo_content}</p>
          <p>Keywords: {workoutPlan.seo_keywords}</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlan;
