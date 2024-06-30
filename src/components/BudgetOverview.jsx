import React, { useEffect, useState } from "react";
import axios from 'axios';
import dayjs from 'dayjs';

export const BudgetOverview = ({ selectedMonth }) => {
    const [budgetState, setBudgetState] = useState({
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
    });

    useEffect(() => {
        fetchBudgetData(dayjs(selectedMonth).format('YYYY-MM'));
    }, [selectedMonth]);

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
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-left">Budżet</h2>
            <div className="flex flex-col md:flex-row justify-around">
                <div className="text-center mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold">Przychody</h3>
                    <p className="text-2xl text-green-600">${budgetState.totalIncome}</p>
                </div>
                <div className="text-center mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold">Wydatki</h3>
                    <p className="text-2xl text-red-600">${budgetState.totalExpenses}</p>
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-semibold">Saldo</h3>
                    <p className={`text-2xl ${budgetState.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${budgetState.balance}
                    </p>
                </div>
            </div>
        </div>
    );
};
