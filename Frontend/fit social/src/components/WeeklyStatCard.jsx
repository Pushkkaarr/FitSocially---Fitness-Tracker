import React from "react";

const WeeklyStatCard = () => {
  return (
    <div className="flex-1 min-w-[280px] p-6 border border-gray-300 rounded-lg shadow-lg flex flex-col gap-2">
      <div className="font-semibold text-lg text-blue-500">
        Weekly Calories Burned
      </div>
      {/* Placeholder for Bar Chart */}
      <div className="bg-gray-200 h-[300px] flex items-center justify-center">
        {/* Placeholder text */}
        Bar Chart Placeholder
      </div>
    </div>
  );
};

export default WeeklyStatCard;
