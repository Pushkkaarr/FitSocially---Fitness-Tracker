import React from "react";
// import { counts } from "../utils/data";
import CountsCard from "../components/CountsCard";
import WeeklyStatCard from "../components/WeeklyStatCard";
import CategoryChart from "../components/CategoryChart";
import WorkoutCard from "../components/WorkoutCard";
import AddWorkout from "../components/AddWorkout";


const Dashboard = () => {
  return (
    <div className="flex-1 h-full flex justify-center p-6 overflow-y-scroll">
      <div className="flex-1 max-w-7xl flex flex-col gap-6">
        <div className="px-4 text-2xl font-medium text-gray-800">Dashboard</div>

        {/* Counts Section */}
        <div className="flex flex-wrap justify-between gap-6 px-4">
          {/* {counts.map((item, index) => (
            <CountsCard key={index} item={item} />
          ))} */}
          <CountsCard/>
        </div>

        {/* Weekly Stats and Chart Section */}
        <div className="flex flex-wrap justify-between gap-6 px-4">
          <WeeklyStatCard/>
          <CategoryChart/>
          <AddWorkout/>
        </div>

        {/* Today's Workouts Section */}
        <div className="flex flex-col gap-6 px-4">
          <div className="text-2xl font-medium text-gray-800">Today's Workouts</div>
          <div className="flex flex-wrap justify-center gap-5 mb-24">
            <WorkoutCard/>
            <WorkoutCard/>
            <WorkoutCard/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
