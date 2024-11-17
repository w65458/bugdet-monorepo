import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export const TransactionList = ({ selectedDate }) => {
    const [transactions, setTransactions] = useState([]);
    const [transactionType, setTransactionType] = useState('Przychody');
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetchTransactions(dayjs(selectedDate).format('YYYY-MM'));
    }, [selectedDate, transactionType, showAll]);

    const fetchTransactions = async (month) => {
        try {
            const response = await axios.get('/api/transactions/1');
            let filteredTransactions = response.data.filter(transaction =>
                dayjs(transaction.transactionDate).format('YYYY-MM') === month
            );

            if (!showAll) {
                filteredTransactions = filteredTransactions.filter(transaction => transaction.type === transactionType);
            }

            setTransactions(filteredTransactions.reverse());
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleTypeChange = (type) => {
        setTransactionType(type);
        setShowAll(false);
    };

    const handleShowAllChange = () => {
        setShowAll(true);
    };

    return (
        <div className="flex flex-col h-full bg-blue-100 dark:bg-gray-800 gap-2 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-left p-2 text-blue-600 dark:text-blue-400">{showAll ? 'Wszystkie' : transactionType}</h2>
            <div className="flex flex-col justify-between p-2 gap-10 items-center">
                <div className="space-x-2 flex-wrap">
                    <button
                        className={`p-2 rounded-lg ${transactionType === 'Przychody' && !showAll ? 'bg-blue-500 text-white' : 'bg-indigo-200 dark:bg-gray-700 text-black dark:text-gray-200'}`}
                        onClick={() => handleTypeChange('Przychody')}
                    >
                        Przychody
                    </button>
                    <button
                        className={`p-2 rounded-lg ${transactionType === 'Wydatki' && !showAll ? 'bg-blue-500 text-white' : 'bg-indigo-200 dark:bg-gray-700 text-black dark:text-gray-200'}`}
                        onClick={() => handleTypeChange('Wydatki')}
                    >
                        Wydatki
                    </button>
                    <button
                        className={`p-2 rounded-lg ${showAll ? 'bg-blue-500 text-white' : 'bg-indigo-200 dark:bg-gray-700 text-black dark:text-gray-200'}`}
                        onClick={handleShowAllChange}
                    >
                        Wszystkie
                    </button>
                </div>
            </div>
            <div className='p-2 pt-0 flex flex-col w-full h-full overflow-hidden'>
                <table className="flex flex-col w-full">
                    <thead>
                    <tr className="flex flex-row gap-2 w-full bg-white dark:bg-gray-700 border-b dark:border-gray-600 p-1">
                        <th className="grow text-center text-black dark:text-gray-100">Opis</th>
                        <th className="text-center min-w-[80px] text-black dark:text-gray-100">Data</th>
                        <th className="text-center min-w-[100px] text-black dark:text-gray-100">Koszt (PLN)</th>
                    </tr>
                    </thead>
                </table>
                <div
                    className="pt-0 flex flex-col gap-2 scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-blue-500 dark:scrollbar-thumb-gray-500 h-full overflow-y-auto">
                    <table className="flex flex-col w-full">
                        <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}
                                className="flex flex-row gap-2 w-full bg-white dark:bg-gray-800 p-1 border-b dark:border-gray-600">
                                <td className="grow text-left text-black dark:text-gray-100">{transaction.description}</td>
                                <td className="text-center min-w-[80px] text-black dark:text-gray-100">{dayjs(transaction.transactionDate).format('D MMM YYYY')}</td>
                                <td className={`text-center min-w-[100px] ${transaction.type === 'Przychody' ? 'text-green-500' : 'text-red-500'}`}>
                                    {transaction.amount}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
