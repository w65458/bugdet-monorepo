import React from 'react';

export const GoalCard = ({ id, name, description, amount, goal, onDonateClick, onEditClick }) => {
    const progress = Math.min((amount / goal) * 100, 100);

    return (
        <div className="border rounded-lg shadow-lg p-4 bg-blue-100 dark:bg-gray-800 flex flex-col justify-between h-50">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-blue-600 dark:text-blue-400 text-xl md:text-2xl flex-1">{name}</h3>
                <div className="flex space-x-2">
                    <button
                        className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded flex-shrink-0"
                        onClick={() => onDonateClick(id)}
                        style={{ width: '80px' }}
                    >
                        Wpłać
                    </button>
                    <button
                        className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded flex-shrink-0"
                        onClick={() => onEditClick(id)}
                        style={{ width: '80px' }}
                    >
                        Edytuj
                    </button>
                </div>
            </div>
            <p className="text-black dark:text-gray-300 mb-4">{description}</p>
            <div className="mt-auto">
                <div className="w-full bg-gray-600 dark:bg-gray-700 rounded-full h-4">
                    <div
                        className="bg-blue-500 dark:bg-blue-600 h-4 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="text-right mt-1 text-sm text-black dark:text-gray-300">
                    {amount} / {goal} PLN
                </div>
            </div>
        </div>
    );

};
