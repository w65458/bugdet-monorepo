import React, { useState, useEffect } from 'react';

export const TransactionForm = ({ transaction_name }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setDate(formattedDate);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!name) newErrors.name = 'Pole nazwa jest wymagane';
        if (!date) newErrors.date = 'Pole data jest wymagane';
        if (!amount) newErrors.amount = 'Pole kwota jest wymagane';
        if (description.length > 150) newErrors.description = 'Pole opis może mieć maksymalnie 150 znaków';
        if (!category) newErrors.category = 'Pole kategoria jest wymagane';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log({ name, description, date, amount });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Kategoria
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Wybierz kategorię</option>
                        <option value="food">Jedzenie</option>
                        <option value="transport">Transport</option>
                        <option value="entertainment">Rozrywka</option>
                        <option value="utilities">Rachunki</option>
                        <option value="other">Inne</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-xs italic">{errors.category}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Opis
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                        placeholder="Wpisz opis (max 150 znaków)"
                        maxLength="150"
                        rows="5"
                    />
                    {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
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
                        Utwórz
                    </button>
                </div>
            </form>
        </div>
    );
};