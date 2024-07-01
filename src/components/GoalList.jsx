import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Progress } from '@material-tailwind/react';

export const GoalList = () => {
    const [goals, setGoals] = useState([]);
    const userId = 1;

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await axios.get(`/api/goals/user/${userId}`);
                setGoals(response.data);
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        fetchGoals();
    }, [userId]);

    return (
        <div className="flex flex-col gap-2 bg-blue-100 p-2 shadow-lg h-full">
            <h2 className="text-2xl font-bold">Cele</h2>
            <ul className="flex flex-col gap-2 overflow-y-auto scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-blue-500 h-full">
                {goals.map(goal => (
                    <li key={goal.id} className="bg-white p-4 mr-2 rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">{goal.name}</span>
                        </div>
                        <div className="mt-2">
                            <Progress value={(goal.currentValue / goal.targetAmount) * 100} />
                            <div className="text-sm text-gray-600 mt-1">{`${goal.currentValue} / ${goal.targetAmount} PLN`}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};
