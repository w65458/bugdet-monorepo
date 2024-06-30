import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export const TransactionList = ({ selectedMonth }) => {
    const [transactions, setTransactions] = useState([]);
    const [transactionType, setTransactionType] = useState('Przychody');
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetchTransactions(dayjs(selectedMonth).format('YYYY-MM'));
    }, [selectedMonth, transactionType, showAll]);

    const fetchTransactions = async (month) => {
        try {
            const response = await axios.get('/api/transactions/1');
            let filteredTransactions = response.data.filter(transaction =>
                dayjs(transaction.transactionDate).format('YYYY-MM') === month
            );

            if (!showAll) {
                filteredTransactions = filteredTransactions.filter(transaction => transaction.type === transactionType);
            }

            setTransactions(filteredTransactions.slice(0, 8)); // Show only the latest 8 transactions
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
        <div className="flex flex-col h-full p-4 bg-blue-100 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{showAll ? 'Wszystkie' : transactionType}</h2>
                <div className="space-x-2 flex-wrap">
                    <button
                        className={`px-4 py-2 m-1 min-w-[100px] rounded-lg ${transactionType === 'Przychody' && !showAll ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => handleTypeChange('Przychody')}
                    >
                        Przychody
                    </button>
                    <button
                        className={`px-4 py-2 m-1 min-w-[100px] rounded-lg ${transactionType === 'Wydatki' && !showAll ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => handleTypeChange('Wydatki')}
                    >
                        Wydatki
                    </button>
                    <button
                        className={`px-4 py-2 m-1 min-w-[100px] rounded-lg ${showAll ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={handleShowAllChange}
                    >
                        Wszystkie
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                    <tr className="w-full bg-gray-100">
                        <th className="py-2 px-4 text-left">Opis</th>
                        <th className="py-2 px-4 text-left">Data</th>
                        <th className="py-2 px-4 text-left">Koszt (PLN)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id} className="border-t">
                            <td className="py-2 px-4">{transaction.description}</td>
                            <td className="py-2 px-4">{dayjs(transaction.transactionDate).format('D MMM YYYY')}</td>
                            <td className={`py-2 px-4 ${transaction.type === 'Przychody' ? 'text-green-500' : 'text-red-500'}`}>
                                {transaction.amount}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
