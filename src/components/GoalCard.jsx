import React from 'react';

export const GoalCard = ({ name, description, amount, goal, onDonateClick }) => {
  const progress = (amount / goal) * 100;

  return (
    <div className="border rounded-lg shadow-lg p-4 bg-blue-100">
      <div className="flex justify-between items-center">
        <h3 className="text-blue-600 text-2xl mb-4">{name}</h3>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => onDonateClick(name)}
        >
          Wpłać
        </button>
      </div>
      <p className="text-black mt-2">{description}</p>
      <div className="mt-4">
        <div className="w-full bg-gray-600 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right mt-1 text-sm text-black">
          {amount} / {goal} PLN
        </div>
      </div>
    </div>
  );
};