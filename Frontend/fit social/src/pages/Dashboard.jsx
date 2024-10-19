import React, { useState, useEffect, useRef } from "react";
import { Activity, Flame, Moon, Dumbbell } from "lucide-react";
import MealTracker from "../components/MealTracker";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { user } = useSelector((store) => store.user);

  const fitnessData = {
    steps: 8234,
    stepsGoal: 10000,
    calories: 1840,
    caloriesGoal: 2500,
    activeMinutes: 65,
    activeMinutesGoal: 60,
    sleep: 7.5,
    sleepGoal: 8,
    weeklyActivity: [65, 70, 80, 75, 60, 70, 75],
    completedWorkouts: [
      { type: "running", duration: 30, caloriesBurned: 342 },
      { type: "weightLifting", duration: 45, caloriesBurned: 270 },
      { type: "yoga", duration: 60, caloriesBurned: 210 },
    ],
    workouts: {
      running: { icon: <Activity className="h-4 w-4" /> },
      weightLifting: { icon: <Dumbbell className="h-4 w-4" /> },
      yoga: { icon: <Activity className="h-4 w-4" /> },
    },
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Fitness Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Steps" icon={<Activity />} current={fitnessData.steps} goal={fitnessData.stepsGoal} />
        <MetricCard title="Calories" icon={<Flame />} current={fitnessData.calories} goal={fitnessData.caloriesGoal} unit="kcal" />
        <MetricCard title="Active Minutes" icon={<Activity />} current={fitnessData.activeMinutes} goal={fitnessData.activeMinutesGoal} unit="min" />
        <MetricCard title="Sleep" icon={<Moon />} current={fitnessData.sleep} goal={fitnessData.sleepGoal} unit="hours" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Weekly Activity</h2>
          <div className="flex items-end space-x-2 h-64">
            {fitnessData.weeklyActivity.map((activity, index) => (
              <div key={index} className="bg-blue-500 rounded-t w-1/7" style={{ height: `${activity}%` }}></div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Calories Burned</h2>
          <CaloriesBurnedPieChart workouts={fitnessData.completedWorkouts} />
        </div>
      </div>

      <MealTracker userId={user._id} />

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Workout Tracker</h2>
        <div className="space-y-4">
          {fitnessData.completedWorkouts.map((workout, index) => (
            <div key={index} className="flex justify-between text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                {fitnessData.workouts[workout.type].icon}
                <span>{workout.type}</span>
              </div>
              <div>{workout.duration} min | {workout.caloriesBurned} kcal</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, icon, current, goal, unit }) {
  const progress = Math.min((current / goal) * 100, 100);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div>{icon}</div>
      </div>
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {current}/{goal} {unit}
      </div>
    </div>
  );
}

function CaloriesBurnedPieChart({ workouts }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const colors = ["#FF6384", "#36A2EB", "#FFCE56"];
    const totalCalories = workouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0);
    let startAngle = 0;

    workouts.forEach((workout, index) => {
      const sliceAngle = (workout.caloriesBurned / totalCalories) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(100, 75); // Center of the canvas
      ctx.arc(100, 75, 75, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      startAngle += sliceAngle;
    });
  }, [workouts]);

  return <canvas ref={canvasRef} width={200} height={150}></canvas>;
}
