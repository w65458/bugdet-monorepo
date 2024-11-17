import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ReportsOverview = ({ selectedDate }) => {
    const [reportPreview, setReportPreview] = useState(null);
    const userId = 1; // Replace with dynamic user ID as needed

    useEffect(() => {
        generateReport();
    }, [selectedDate]);

    const generateReport = async () => {
        try {
            const response = await axios.post(`/api/reports/generate`, null, {
                params: {
                    userId: userId,
                    month: `${new Date(selectedDate).getFullYear()}-${String(new Date(selectedDate).getMonth() + 1).padStart(2, '0')}-01`
                }
            });
            const reversedTransactions = response.data.transactions.reverse();
            setReportPreview({ ...response.data, transactions: reversedTransactions });
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    const downloadReport = async (format) => {
        try {
            const response = await axios.get(`/api/reports/generate/${format}`, {
                params: {
                    userId: userId,
                    month: `${new Date(selectedDate).getFullYear()}-${String(new Date(selectedDate).getMonth() + 1).padStart(2, '0')}-01`
                },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `report.${format}`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error(`Error generating ${format.toUpperCase()} report:`, error);
        }
    };

    const getMonthName = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('pl-PL', { month: 'long', year: 'numeric' });
    };

    return (
        <div className="flex flex-col h-full gap-2 shadow-lg bg-blue-100 dark:bg-gray-800 overflow-hidden">
            <div className="flex gap-2 p-2 pb-0 items-center justify-center place-items-center ">
                <h2 className="grow text-2xl font-bold text-blue-600 dark:text-blue-400">Podgląd Raportu</h2>
            </div>
            {reportPreview && (
                <div
                    className="flex flex-col p-4 bg-white dark:bg-gray-700 rounded-lg relative m-2 mt-0 overflow-hidden">
                    <table className="w-full border border-black dark:border-gray-600 bg-white dark:bg-gray-700">
                        <thead>
                        <tr>
                            <th className="p-2 border border-black dark:border-gray-600 text-left text-blue-600 dark:text-blue-400">Miesiąc</th>
                            <th className="p-2 border border-black dark:border-gray-600 text-left text-blue-600 dark:text-blue-400">Całkowity
                                Dochód
                            </th>
                            <th className="p-2 border border-black dark:border-gray-600 text-left text-blue-600 dark:text-blue-400">Całkowite
                                Wydatki
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="p-2 text-left border border-black dark:border-gray-600 text-blue-600 dark:text-blue-400">{getMonthName(reportPreview.month)}</td>
                            <td className="p-2 text-center border border-black dark:border-gray-600 text-blue-600 dark:text-blue-400">{reportPreview.totalIncome}</td>
                            <td className="p-2 text-center border border-black dark:border-gray-600 text-blue-600 dark:text-blue-400">{reportPreview.totalExpense}</td>
                        </tr>
                        </tbody>
                    </table>
                    <h3 className="text-lg p-2 font-bold text-black dark:text-gray-100">Transakcje</h3>
                    <table className="flex w-full bg-white dark:bg-gray-700">
                        <thead className='flex w-full bg-white dark:bg-gray-700'>
                        <tr className='flex w-full bg-white dark:bg-gray-700 border-b dark:border-gray-600'>
                            <th className="p-1 text-left min-w-[100px] text-blue-600 dark:text-blue-400">Data</th>
                            <th className="grow p-1 text-left text-black dark:text-gray-300">Opis</th>
                            <th className="p-1 text-left min-w-[65px] text-blue-600 dark:text-blue-400">Kwota</th>
                            <th className="p-1 text-left min-w-[86px] text-blue-600 dark:text-blue-400">Typ</th>
                        </tr>
                        </thead>
                    </table>
                    <div
                        className="pt-0 flex flex-col gap-2 scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-blue-500 dark:scrollbar-thumb-gray-500 h-full overflow-y-auto overflow-x-hidden">
                        <table className="w-full bg-white dark:bg-gray-700">
                            <tbody className='flex flex-col w-full bg-white dark:bg-gray-700'>
                            {reportPreview.transactions.map((transaction, index) => (
                                <tr key={index}
                                    className='flex flex-row w-full bg-white dark:bg-gray-700 border-b dark:border-gray-600'>
                                    <td className="p-1 text-left min-w-[100px] text-blue-600 dark:text-blue-400">{transaction.date || transaction.transactionDate}</td>
                                    <td className="grow p-1 text-left text-blue-600 dark:text-blue-400">{transaction.description}</td>
                                    <td className="p-1 text-left min-w-[65px] text-blue-600 dark:text-blue-400">{transaction.amount}</td>
                                    <td className="p-1 text-left min-w-[80px] text-blue-600 dark:text-blue-400">{transaction.type}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};
