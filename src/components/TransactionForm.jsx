import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const TransactionForm = ({ transaction_name, userId, onAddTransaction }) => {
    const [name, setName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setDate(formattedDate);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!name) newErrors.name = 'Pole nazwa jest wymagane';
        if (!date) newErrors.date = 'Pole data jest wymagane';
        if (!amount) newErrors.amount = 'Pole kwota jest wymagane';
        if (description.length > 150) newErrors.description = 'Pole opis może mieć maksymalnie 150 znaków';
        if (!categoryName) newErrors.category = 'Pole kategoria jest wymagane';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post('/api/transactions', {
                    userId, // Assuming userId is passed as a prop
                    categoryName, // Sending categoryName as a string
                    amount: parseFloat(amount), // Ensure amount is sent as a number
                    type: transaction_name,
                    description,
                    transactionDate: date
                });
                console.log('Transaction added:', response.data);
                // Call the onAddTransaction callback with the new transaction
                if (onAddTransaction) {
                    onAddTransaction(response.data);
                }
                // Optionally, reset the form
                setName('');
                setCategoryName('');
                setDescription('');
                setDate('');
                setAmount('');
                setErrors({});
            } catch (error) {
                console.error('Error adding transaction:', error);
            }
        }
    };

    return (
        <div className="p-2 flex flex-col w-full">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="name">
                        Nazwa
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Wpisz nazwę"
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="category">
                        Kategoria
                    </label>
                    <select
                        id="category"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Wybierz kategorię</option>
                        <option value="Jedzenie">Jedzenie</option>
                        <option value="Transport">Transport</option>
                        <option value="Rozrywka">Rozrywka</option>
                        <option value="Rachunki">Rachunki</option>
                        <option value="Inne">Inne</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-xs italic">{errors.category}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="description">
                        Opis
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                        placeholder="Wpisz opis (max 30 znaków)"
                        maxLength="30"
                        rows="1"
                    />
                    {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="date">
                        Data
                    </label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.date && <p className="text-red-500 text-xs italic">{errors.date}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="amount">
                        Kwota
                    </label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 7) {
                                setAmount(value);
                            }
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Wpisz kwotę"
                        max={9999999}
                    />
                    {errors.amount && <p className="text-red-500 text-xs italic">{errors.amount}</p>}
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Utwórz
                    </button>
                </div>
            </form>
        </div>
    );
};
