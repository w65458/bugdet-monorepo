import React, { useEffect, useState } from "react";
import axios from 'axios';
import dayjs from 'dayjs';

export const BudgetOverview = ({ selectedDate }) => {
    const [budgetState, setBudgetState] = useState({
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
    });

    useEffect(() => {
        fetchBudgetData(dayjs(selectedDate).format('YYYY-MM'));
    }, [selectedDate]);

    const fetchBudgetData = async (month) => {
        try {
            const response = await axios.get('/api/transactions/1');
            const transactions = response.data.filter(transaction =>
                dayjs(transaction.transactionDate).format('YYYY-MM') === month
            );
            const incomes = transactions.filter(transaction => transaction.type === 'Przychody');
            const expenses = transactions.filter(transaction => transaction.type === 'Wydatki');

            const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
            const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
            const balance = totalIncome - totalExpenses;

            setBudgetState({
                totalIncome,
                totalExpenses,
                balance,
            });
        } catch (error) {
            console.error('Error fetching budget data:', error);
        }
    };

    return (
        <div className="flex w-full bg-blue-100 dark:bg-gray-800 p-2">
            <div className="grow flex flex-row justify-around">
                <div className="text-center">
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">Saldo</h3>
                    <p className={`text-2xl ${budgetState.balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {budgetState.balance} zł
                    </p>
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">Przychody</h3>
                    <p className="text-2xl text-green-600 dark:text-green-400">{budgetState.totalIncome} zł</p>
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">Wydatki</h3>
                    <p className="text-2xl text-red-600 dark:text-red-400">{budgetState.totalExpenses} zł</p>
                </div>
            </div>
        </div>
    );
};
