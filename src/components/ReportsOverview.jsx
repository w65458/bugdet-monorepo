import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ReportsOverview = ({ selectedMonth }) => {
    const [reportPreview, setReportPreview] = useState(null); // Nowy stan do przechowywania podglądu raportu
    const userId = 1; // Replace with dynamic user ID as needed

    useEffect(() => {
        generateReport();
    }, [selectedMonth]);

    const generateReport = async () => {
        try {
            const response = await axios.post(`/api/reports/generate`, null, {
                params: {
                    userId: userId,
                    month: `${new Date(selectedMonth).getFullYear()}-${String(new Date(selectedMonth).getMonth() + 1).padStart(2, '0')}-01`
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
                    month: `${new Date(selectedMonth).getFullYear()}-${String(new Date(selectedMonth).getMonth() + 1).padStart(2, '0')}-01`
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
        <div className="flex flex-col h-full gap-2 shadow-lg bg-blue-100 overflow-hidden">
            <div className="flex gap-2 p-2 pb-0 items-center justify-center place-items-center ">
                <h2 className="grow text-2xl font-bold">Podgląd Raportu</h2>
            </div>
            {reportPreview && (
                <div className="flex flex-col p-4 bg-white rounded-lg relative m-2 mt-0 overflow-hidden">
                    <table className="w-full border border-black bg-white">
                        <thead>
                        <tr>
                            <th className="p-2 border border-black text-left">Miesiąc</th>
                            <th className="p-2 border border-black text-left">Całkowity Dochód</th>
                            <th className="p-2 border border-black text-left">Całkowite Wydatki</th>
                        </tr>
                        </thead>
                        <tbody>    
                        <tr>
                            <td className="p-2 text-left border border-black">{getMonthName(reportPreview.month)}</td>
                            <td className="p-2 text-center border border-black">{reportPreview.totalIncome}</td>
                            <td className="p-2 text-center border border-black">{reportPreview.totalExpense}</td>
                        </tr>
                        </tbody>
                    </table>
                    <h3 className="text-lg p-2 font-bold ">Transakcje</h3>
                    <table className="flex w-full bg-white">
                        <thead className='flex w-full bg-white'>
                            <tr className='flex w-full bg-white border-b'>

                                <th className="p-1 text-left min-w-[100px]">Data</th>
                                <th className="grow p-1 text-left ">Opis</th>
                                <th className="p-1 text-left min-w-[65px]">Kwota</th>
                                <th className="p-1 text-left min-w-[86px] ">Typ</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="pt-0 flex flex-col gap-2 scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-blue-500 h-full overflow-y-auto overflow-x-hidden">
                        <table className="w-full bg-white">
                            <tbody className='flex flex-col w-full bg-white'>
                            {reportPreview.transactions.map((transaction, index) => (
                                <tr key={index} className='flex flex-row w-full bg-white border-b'>
                                    <td className="p-1 text-left min-w-[100px]">{transaction.date || transaction.transactionDate}</td>
                                    <td className="grow p-1 text-left">{transaction.description}</td>
                                    <td className="p-1 text-left min-w-[65px]">{transaction.amount}</td>
                                    <td className="p-1 text-left min-w-[80px]">{transaction.type}</td>
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