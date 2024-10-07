import React from "react";

const CountsCard = ( ) => {
  return (
    <div className="flex-1 min-w-[200px] p-6 border border-gray-300 rounded-lg flex gap-2 shadow-lg">
      <div className="flex-1 flex flex-col gap-3">
        <div className="font-semibold text-lg text-blue-500">Name</div>
        <div className="flex items-end gap-2 text-4xl font-semibold text-gray-800">
          {/* Placeholder for value */}
          0.00
          <div className="text-sm mb-2">Unit</div>
          <div className="mb-2 font-medium text-sm text-green-500">
            (+10%)
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-1">Description</div>
      </div>
      <div
        className="h-fit p-2 flex items-center justify-center rounded-lg"
        // style={{ background: item.lightColor, color: item.color }}
      >
        Icon
      </div>
    </div>
  );
};

export default CountsCard;
