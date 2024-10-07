import React from "react";

const CategoryChart = () => {
  return (
    <div className="flex-1 min-w-[280px] p-6 border border-gray-300 rounded-lg shadow-lg flex flex-col gap-2">
      <div className="font-semibold text-lg text-blue-500">Weekly Calories Burned</div>
      {/* Placeholder for PieChart */}
      <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-lg">
        {/* Add chart here */}
        Pie chart goes here
      </div>
    </div>
  );
};

export default CategoryChart;
