import { FaDumbbell, FaClock } from "react-icons/fa";
import React from "react";

const WorkoutCard = ({ workout }) => {
  return (
    <div className="flex-1 min-w-[250px] max-w-[400px] p-4 border border-gray-300 rounded-lg shadow-lg flex flex-col gap-2">
      <div className="text-sm text-blue-500 font-medium bg-blue-100 rounded-lg px-3 py-1 w-fit">
        #{/* Placeholder for category */}
        Category
      </div>
      <div className="text-lg text-gray-800 font-semibold">
        {/* Placeholder for workout name */}
        Workout Name
      </div>
      <div className="text-sm text-gray-600 font-medium flex gap-1">
        Count: {/* Placeholder for sets and reps */}
        3 sets X 12 reps
      </div>
      <div className="flex gap-4">
        <div className="text-sm text-gray-800 font-medium flex items-center gap-1">
          <FaDumbbell style={{ fontSize: "20px" }} />
          {/* Placeholder for weight */}
          30 kg
        </div>
        <div className="text-sm text-gray-800 font-medium flex items-center gap-1">
          <FaClock style={{ fontSize: "20px" }} />
          {/* Placeholder for duration */}
          45 min
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
