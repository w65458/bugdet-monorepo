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

            setTransactions(filteredTransactions.slice(0, 16));
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
        <div className="flex flex-col h-full bg-blue-100 gap-2 shadow-lg">
            <h2 className="text-2xl font-bold text-left p-2">{showAll ? 'Wszystkie' : transactionType}</h2>
            <div className="flex flex-col justify-between p-2 gap-2 items-center">
                <div className="space-x-2 flex-wrap">
                    <button
                        className={`p-2 rounded-lg ${transactionType === 'Przychody' && !showAll ? 'bg-blue-500 text-white' : 'bg-indigo-200 text-black'}`}
                        onClick={() => handleTypeChange('Przychody')}
                    >
                        Przychody
                    </button>
                    <button
                        className={`p-2 rounded-lg ${transactionType === 'Wydatki' && !showAll ? 'bg-blue-500 text-white' : 'bg-indigo-200 text-black'}`}
                        onClick={() => handleTypeChange('Wydatki')}
                    >
                        Wydatki
                    </button>
                    <button
                        className={`p-2 rounded-lg ${showAll ? 'bg-blue-500 text-white' : 'bg-indigo-200 text-black'}`}
                        onClick={handleShowAllChange}
                    >
                        Wszystkie
                    </button>
                </div>
            </div>
            <div className='p-2 pt-0 flex flex-col w-full h-full overflow-hidden'>
                <table className="flex flex-col w-full">
                    <thead>
                        <tr className="flex flex-row gap-2 w-full bg-white border-b p-1">
                            <th className="grow text-center">Opis</th>
                            <th className="text-center min-w-[80px]">Data</th>
                            <th className="text-center min-w-[100px]">Koszt (PLN)</th>
                        </tr>
                    </thead>
                </table>
                <div className="pt-0 flex flex-col gap-2 scrollbar-none md:scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-blue-500 h-full overflow-y-auto">
                    <table className="flex flex-col w-full">
                        <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id} className="flex flex-row gap-2 w-full bg-white p-1 border-b">
                                <td className="grow text-left">{transaction.description}</td>
                                <td className="text-center min-w-[80px]">{dayjs(transaction.transactionDate).format('D MMM YYYY')}</td>
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
