import React from "react";

const AddWorkout = () => {
  return (
    <div className="flex-1 min-w-[280px] p-6 border border-gray-300 rounded-lg shadow-lg flex flex-col gap-2">
      <div className="font-semibold text-lg text-blue-500">
        Add New Workout
      </div>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md resize-none"
        rows="10"
        placeholder={`Enter in this format:\n\n#Category\n-Workout Name\n-Sets\n-Reps\n-Weight\n-Duration`}
      />
      <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-4 hover:bg-blue-600">
        Add Workout
      </button>
    </div>
  );
};

export default AddWorkout;
