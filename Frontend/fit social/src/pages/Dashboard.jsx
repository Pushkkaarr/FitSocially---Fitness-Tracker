import React, { useState, useEffect, useRef } from "react";
import { Activity, Flame, Moon, Dumbbell } from "lucide-react";
import MealTracker from "../components/MealTracker";
import { useSelector } from "react-redux";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

export default function Dashboard() {
  const { user } = useSelector((store) => store.user);

  const fitnessData = {
    steps: 500,
    stepsGoal: 8000,
    calories: 1200,
    caloriesGoal: 2500,
    activeMinutes: 40,
    activeMinutesGoal: 120,
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

  const [totalCalories, setTotalCalories] = useState(0);
  const [sleepHours, setSleepHours] = useState(fitnessData.sleep);
  const [steps, setSteps] = useState(fitnessData.steps);
  const [calories, setCalories] = useState(fitnessData.calories);
  const [activeMinutes, setActiveMinutes] = useState(fitnessData.activeMinutes);

  const handleTotalCaloriesUpdate = (calories) => {
    setTotalCalories(calories);
  };

  const increaseSleep = () => {
    setSleepHours(prev => Math.min(prev + 1, fitnessData.sleepGoal));
  };

  const decreaseSleep = () => {
    setSleepHours(prev => Math.max(prev - 1, 0));
  };

  const increaseSteps = () => {
    setSteps(prev => Math.min(prev + 100, fitnessData.stepsGoal));
  };

  const decreaseSteps = () => {
    setSteps(prev => Math.max(prev - 100, 0));
  };

  const increaseCalories = () => {
    setCalories(prev => Math.min(prev + 50, fitnessData.caloriesGoal));
  };

  const decreaseCalories = () => {
    setCalories(prev => Math.max(prev - 50, 0));
  };

  const increaseActiveMinutes = () => {
    setActiveMinutes(prev => Math.min(prev + 10, fitnessData.activeMinutesGoal));
  };

  const decreaseActiveMinutes = () => {
    setActiveMinutes(prev => Math.max(prev - 10, 0));
  };

  // Hardcoded data for line chart (calories burned over a week)
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories Burned',
        data: [300, 450, 500, 400, 350, 600, 700], // Example hardcoded data
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Calories',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container p-8 max-w-full bg-gradient-to-r from-sky-400 to-blue-900 min-h-screen font-cambria">
      <h1 className="text-3xl font-bold mb-6 text-white border-solid border-spacing-5 border-red-950 p-6 rounded-lg transition-transform transform hover:scale-85 hover:bg-gradient-to-r from-blue-400 to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-800">Fitness Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard 
          title="Steps" 
          icon={<Activity />} 
          current={steps} 
          goal={fitnessData.stepsGoal} 
          unit="steps"
          controls={
            <div className="flex space-x-2 mt-2">
              <button onClick={decreaseSteps} className="bg-red-500 text-white px-2 rounded">-100</button>
              <button onClick={increaseSteps} className="bg-green-500 text-white px-2 rounded">+100</button>
            </div>
          }
        />
        <MetricCard title="Calories" icon={<Flame />} current={totalCalories} goal={fitnessData.caloriesGoal  } unit="kcal" />
        <MetricCard 
          title="Active Minutes" 
          icon={<Activity />} 
          current={activeMinutes} 
          goal={fitnessData.activeMinutesGoal} 
          unit="min"
          controls={
            <div className="flex space-x-2 mt-2">
              <button onClick={decreaseActiveMinutes} className="bg-red-500 text-white px-2 rounded">-10</button>
              <button onClick={increaseActiveMinutes} className="bg-green-500 text-white px-2 rounded">+10</button>
            </div>
          }
        />
        <MetricCard 
          title="Sleep" 
          icon={<Moon />} 
          current={sleepHours} 
          goal={fitnessData.sleepGoal} 
          unit="hours" 
          controls={
            <div className="flex space-x-2 mt-2">
              <button onClick={decreaseSleep} className="bg-red-500 text-white px-2 rounded">-1</button>
              <button onClick={increaseSleep} className="bg-green-500 text-white px-2 rounded">+1</button>
            </div>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-white bg-opacity-85 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Weekly Activity</h2>
          <Line data={lineData} options={lineOptions} />
          <div className="flex items-end space-x-2 h-45">
            {fitnessData.weeklyActivity.map((activity, index) => (
              <div key={index} className="bg-blue-500 rounded-t w-1/7" style={{ height: `${activity}%` }}></div>
            ))}
          </div>
        </div>
        <div className="bg-white bg-opacity-85 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Calories Burned</h2>
          <CaloriesBurnedPieChart workouts={fitnessData.completedWorkouts} />
        </div>
      </div>

      <MealTracker userId={user._id} onTotalCaloriesUpdate={handleTotalCaloriesUpdate} />

      <div className="bg-white bg-opacity-85 p-6 rounded-lg shadow-md mb-8">
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

function MetricCard({ title, icon, current, goal, unit, controls }) {
  const progress = Math.min((current / goal) * 100, 100);
  return (
    <div className="bg-white bg-opacity-85 p-6 rounded-lg shadow-md flex flex-col items-center">
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
      {controls}
    </div>
  );
}

function CaloriesBurnedPieChart({ workouts }) {
  const canvasRef = useRef(null);
  const canvasWidth = 400;  // Width of the canvas
  const canvasHeight = 400; // Height of the canvas

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const colors = ["#FF6384", "#36A2EB", "#FFCE56"];
    const totalCalories = workouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0);
    
    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    let startAngle = 0;
    workouts.forEach((workout, index) => {
      const sliceAngle = (workout.caloriesBurned / totalCalories) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2, canvasHeight / 2); // Center of the canvas
      ctx.arc(canvasWidth / 2, canvasHeight / 2, Math.min(canvasWidth, canvasHeight) / 2 - 10, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();

      // Set font size and style
      ctx.fillStyle = "white"; // Change text color to white
      ctx.font = "bold 16px Arial"; // Increase font size here

      // Calculate label position
      const labelX = canvasWidth / 2 + ((Math.min(canvasWidth, canvasHeight) / 2 - 10) / 2) * Math.cos(startAngle + sliceAngle / 2);
      const labelY = canvasHeight / 2 + ((Math.min(canvasWidth, canvasHeight) / 2 - 10) / 2) * Math.sin(startAngle + sliceAngle / 2);
      ctx.fillText(`${workout.type}: ${workout.caloriesBurned}`, labelX - 30, labelY); // Offset for better positioning

      startAngle += sliceAngle;
    });
  }, [workouts]);

  return (
    <div className="flex justify-center">
      <canvas 
        ref={canvasRef} 
        width={canvasWidth} 
        height={canvasHeight} 
        style={{ display: 'block' }} // Ensure display is block
      ></canvas>
    </div>
  );
}
