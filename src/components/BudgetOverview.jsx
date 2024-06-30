import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/outline";
import pl from 'date-fns/locale/pl'; // Importowanie lokalizacji polskiej

registerLocale('pl', pl); // Rejestracja lokalizacji polskiej

export const BudgetOverview = () => {
    const [budgetState, setBudgetState] = useState({
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
    });
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const datepickerRef = useRef(null);

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

    const formatDate = (date) => {
        return dayjs(date).format('MMMM YYYY');
    };

    return (
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg relative">
            <h2 className="text-3xl font-bold mb-4 text-center">Budżet</h2>
            <div className="absolute top-4 right-4 flex items-center">
                <CalendarIcon
                    className="h-6 w-6 text-gray-600 cursor-pointer"
                    onClick={() => datepickerRef.current.setFocus()}
                />
                <DatePicker
                    ref={datepickerRef}
                    selected={selectedMonth}
                    onChange={(date) => setSelectedMonth(date)}
                    onSelect={(date) => fetchBudgetData(dayjs(date).format('YYYY-MM'))}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    locale="pl" // Ustawienie lokalizacji na polską
                    className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm"
                    customInput={
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={formatDate(selectedMonth)}
                                readOnly
                                className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    }
                />
            </div>
            <div className="flex flex-col md:flex-row justify-around">
                <div className="text-center mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold">Total Income</h3>
                    <p className="text-2xl text-green-600">${budgetState.totalIncome}</p>
                </div>
                <div className="text-center mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold">Total Expenses</h3>
                    <p className="text-2xl text-red-600">${budgetState.totalExpenses}</p>
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-semibold">Balance</h3>
                    <p className={`text-2xl ${budgetState.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${budgetState.balance}
                    </p>
                </div>
            </div>
        </div>
    );
};
