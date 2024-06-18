import React, { useState } from 'react';

export const DonateForm = ({ goalName , onClose }) => {
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!amount) newErrors.amount = 'Pole kwota jest wymagane';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const donation = { amount, goalName };
      try {
        const response = await fetch('/api/donations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(donation),
        });
        if (response.ok) {
          onClose();
        } else {
          onClose();
        }
      } catch (error) {
        console.error('Błąd połączenia z serwerem', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-6">Wpłać na Cel: {goalName}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Kwota
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Wpisz kwotę"
          />
          {errors.amount && <p className="text-red-500 text-xs italic">{errors.amount}</p>}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Wpłać
          </button>
        </div>
      </form>
    </div>
  );
};