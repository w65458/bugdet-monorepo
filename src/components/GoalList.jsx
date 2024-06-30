import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Progress } from '@material-tailwind/react';

export const GoalList = () => {
    const [goals, setGoals] = useState([]);
    const userId = 1; // Replace with dynamic user ID as needed

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
        <div className="bg-blue-100 p-4 rounded-lg shadow-lg h-full">
            <h2 className="text-2xl font-bold mb-4">Cele</h2>
            <ul className="space-y-4">
                {goals.map(goal => (
                    <li key={goal.id} className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">{goal.name}</span>
                        </div>
                        <div className="mt-2">
                            <Progress value={(goal.amount / goal.targetAmount) * 100} />
                            <div className="text-sm text-gray-600 mt-1">{`${goal.amount} / ${goal.targetAmount}`}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
