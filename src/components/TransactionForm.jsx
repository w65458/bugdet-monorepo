import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const TransactionForm = ({ transaction_name, userId, onAddTransaction }) => {
    const [description, setDescription] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setDate(formattedDate);
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories: ', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (description.length > 150) newErrors.description = 'Pole opis może mieć maksymalnie 150 znaków';
        if (!date) newErrors.date = 'Pole data jest wymagane';
        if (!amount) newErrors.amount = 'Pole kwota jest wymagane';
        if (!categoryName) newErrors.category = 'Pole kategoria jest wymagane';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post('/api/transactions', {
                    userId,
                    categoryName,
                    amount: parseFloat(amount),
                    type: transaction_name,
                    description,
                    transactionDate: date
                });
                console.log('Transaction added: ', response.data);
                if (onAddTransaction) {
                    onAddTransaction();
                }
                setDescription('');
                setCategoryName('');
                setDate('');
                setAmount('');
                setErrors({});
            } catch (error) {
                console.error('Error adding transaction: ', error);
            }
        }
    };

    return (
        <div className="p-2 flex flex-col w-full">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold" htmlFor="description">
                        Opis
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
                        placeholder="Wpisz opis transakcji (max 150 znaków)"
                        maxLength="150"
                        rows="3"
                    />
                    {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold" htmlFor="category">
                        Kategoria
                    </label>
                    <select
                        id="category"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
                    >
                        <option value="" disabled hidden>
                            Wybierz kategorię
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-xs italic">{errors.category}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold" htmlFor="date">
                        Data
                    </label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
                    />
                    {errors.date && <p className="text-red-500 text-xs italic">{errors.date}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold" htmlFor="amount">
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
                        className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
                        placeholder="Wpisz kwotę"
                        max={9999999}
                    />
                    {errors.amount && <p className="text-red-500 text-xs italic">{errors.amount}</p>}
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Utwórz
                    </button>
                </div>
            </form>
        </div>
    );
};
