import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const GoalForm = ({ onClose, onGoalCreated, goalId = null, initialData = {} }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (goalId && initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setAmount(initialData.targetAmount || '');
      setTargetDate(initialData.targetDate || '');
    }
  }, [goalId, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const newErrors = {};
    if (!name) newErrors.name = 'Pole nazwa jest wymagane';
    if (!amount) newErrors.amount = 'Pole kwota jest wymagane';
    if (!targetDate) newErrors.targetDate = 'Pole data jest wymagana';
    if (description.length > 150) newErrors.description = 'Pole opis może mieć maksymalnie 150 znaków';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const userId = 1; // Replace with actual user ID
      const goal = {
        userId,
        name,
        description,
        targetAmount: parseFloat(amount),
        targetDate,
        currentValue: goalId ? initialData.currentValue : 0, // Maintain current value if editing
      };

      try {
        let response;
        if (goalId) {
          response = await axios.put(`/api/goals/${goalId}`, goal, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } else {
          response = await axios.post('/api/goals', goal, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }

        if (response.status === 200 || response.status === 201) {
          onGoalCreated(response.data);
        } else {
          setSubmitError('Wystąpił problem podczas zapisywania celu.');
        }
      } catch (error) {
        console.error('Błąd połączenia z serwerem', error);
        setSubmitError('Wystąpił problem podczas połączenia z serwerem.');
      }
    }
  };

  return (
      <div>
        <h1 className="text-center text-2xl font-bold mb-6 text-black dark:text-gray-100">{goalId ? 'Edytuj Cel' : 'Utwórz Nowy Cel'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
              Nazwa
            </label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
                placeholder="Wpisz nazwę"
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="description">
              Opis
            </label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 resize-none"
                placeholder="Wpisz opis (max 150 znaków)"
                maxLength="150"
                rows="5"
            />
            {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="amount">
              Kwota
            </label>
            <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
                placeholder="Wpisz kwotę"
            />
            {errors.amount && <p className="text-red-500 text-xs italic">{errors.amount}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="targetDate">
              Data Docelowa
            </label>
            <input
                id="targetDate"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
            />
            {errors.targetDate && <p className="text-red-500 text-xs italic">{errors.targetDate}</p>}
          </div>
          {submitError && <p className="text-red-500 text-xs italic text-center">{submitError}</p>}
          <div className="flex items-center justify-center">
            <button type="submit"
                    className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {goalId ? 'Edytuj' : 'Utwórz'}
            </button>
          </div>
        </form>
      </div>

  );
};
