import React from 'react';

export const GoalCard = ({ name, description, amount, goal, onDonateClick }) => {
  const progress = (amount / goal) * 100;

  return (
    <div className="border rounded-lg shadow-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{name}</h3>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => onDonateClick(name)}
        >
          Wpłać
        </button>
      </div>
      <p className="text-gray-700 mt-2">{description}</p>
      <div className="mt-4">
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right mt-1 text-sm text-gray-600">
          {amount} / {goal} PLN
        </div>
      </div>
    </div>
  );
};