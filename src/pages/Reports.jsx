import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PageTemplate } from "../components/PageTemplate.jsx";
import {useDate} from "../context/MonthContext.jsx";

export const Reports = () => {
    const months = [
        { name: 'Styczeń', index: 0 },
        { name: 'Luty', index: 1 },
        { name: 'Marzec', index: 2 },
        { name: 'Kwiecień', index: 3 },
        { name: 'Maj', index: 4 },
        { name: 'Czerwiec', index: 5 },
        { name: 'Lipiec', index: 6 },
        { name: 'Sierpień', index: 7 },
        { name: 'Wrzesień', index: 8 },
        { name: 'Październik', index: 9 },
        { name: 'Listopad', index: 10 },
        { name: 'Grudzień', index: 11 },
    ];

    const {selectedDate} = useDate();

    const getCurrentMonthIndex = () => {
        return selectedDate.getMonth();
    };

    const [selectedMonthIndex, setSelectedMonthIndex] = useState(getCurrentMonthIndex());
    const [reports, setReports] = useState([]);
    const [reportPreview, setReportPreview] = useState(null);
    const [showReportPreview, setShowReportPreview] = useState(false);

    const userId = 1;
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get(`/api/reports/user/${userId}`);
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, [userId]);

    const handleMonthChange = (event) => {
        setSelectedMonthIndex(parseInt(event.target.value));
    };

    const generateReport = async () => {
        try {
            const response = await axios.post(`/api/reports/generate`, null, {
                params: {
                    userId: userId,
                    month: `${new Date().getFullYear()}-${String(selectedMonthIndex + 1).padStart(2, '0')}-01`
                }
            });
            console.log('Raport wygenerowany:', response.data);
            setReportPreview(response.data);
            setShowReportPreview(true);
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    const downloadReport = async (format) => {
        try {
            const response = await axios.get(`/api/reports/generate/${format}`, {
                params: {
                    userId: userId,
                    month: `${new Date().getFullYear()}-${String(selectedMonthIndex + 1).padStart(2, '0')}-01`
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
        return months[date.getMonth()].name;
    };

    return (
        <PageTemplate>
            <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="my-5 flex flex-col md:flex-row justify-center w-full gap-5 md:gap-10 overflow-auto md:overflow-hidden scrollbar-none">
                    {!showReportPreview && (
                        <div className="flex flex-col bg-blue-100 dark:bg-gray-800 p-6 text-black dark:text-gray-200 rounded-lg h-auto justify-center md:overflow-hidden max-w-4xl mx-auto">
                            <h1 className="text-2xl dark:text-gray-100 mb-4">Generowanie raportu miesięcznego</h1>
                            <div className="mb-4">
                                <label htmlFor="month-select" className="block mb-2 text-black dark:text-gray-200">Wybierz miesiąc:</label>
                                <select
                                    id="month-select"
                                    value={selectedMonthIndex}
                                    onChange={handleMonthChange}
                                    className="p-2 border rounded text-black dark:text-gray-200 dark:bg-gray-700 w-full"
                                >
                                    {months.map((month) => (
                                        <option key={month.index} value={month.index}>
                                            {month.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={generateReport}
                                className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mb-4"
                            >
                                Podgląd raportu
                            </button>
                            <button
                                onClick={() => downloadReport('pdf')}
                                className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mb-4"
                            >
                                Generuj raport PDF
                            </button>
                            <button
                                onClick={() => downloadReport('csv')}
                                className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                            >
                                Generuj raport CSV
                            </button>
                        </div>
                    )}
                    {showReportPreview && reportPreview && (
                        <div className="flex flex-col p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg relative m-1 mt-0 overflow-hidden h-auto md:h-[500px] min-h-[600px] md:min-h-0 max-w-4xl mx-auto">
                            <div className='flex flex-row w-full items-center justify-center place-items-center pb-2'>
                                <h2 className="grow text-xl dark:text-gray-100">Podgląd Raportu</h2>
                                <button
                                    className="text-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-bold"
                                    onClick={() => setShowReportPreview(false)}
                                >X
                                </button>
                            </div>
                            <table className="min-w-full border border-black dark:border-gray-600 bg-white dark:bg-gray-700">
                                <thead>
                                <tr>
                                    <th className="p-2 border border-black dark:border-gray-600 text-left text-black dark:text-gray-200">Miesiąc</th>
                                    <th className="p-2 border border-black dark:border-gray-600 text-left text-black dark:text-gray-200">Całkowity Dochód</th>
                                    <th className="p-2 border border-black dark:border-gray-600 text-left text-black dark:text-gray-200">Całkowite Wydatki</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="p-2 border border-black dark:border-gray-600 text-left text-black dark:text-gray-300">{getMonthName(reportPreview.month)}</td>
                                    <td className="p-2 border border-black dark:border-gray-600 text-left text-black dark:text-gray-300">{reportPreview.totalIncome}</td>
                                    <td className="p-2 border border-black dark:border-gray-600 text-left text-black dark:text-gray-300">{reportPreview.totalExpense}</td>
                                </tr>
                                </tbody>
                            </table>
                            <h3 className="text-lg dark:text-gray-200 mt-4 mb-2">Transakcje</h3>
                            <table className="flex w-full bg-white dark:bg-gray-700">
                                <thead className='flex w-full bg-white dark:bg-gray-700'>
                                <tr className='flex w-full bg-white dark:bg-gray-700 border-b dark:border-gray-600'>
                                    <th className="p-2 text-left min-w-[100px] dark:text-gray-200">Data</th>
                                    <th className="grow p-2 text-left dark:text-gray-200">Opis</th>
                                    <th className="p-2 text-left min-w-[65px] dark:text-gray-200">Kwota</th>
                                    <th className="p-2 text-left min-w-[86px] dark:text-gray-200">Typ</th>
                                </tr>
                                </thead>
                            </table>
                            <div className="pt-0 flex flex-col gap-2 scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-blue-500 h-full overflow-y-auto">
                                <table className="w-full bg-white dark:bg-gray-700">
                                    <tbody className='flex flex-col w-full bg-white dark:bg-gray-700'>
                                    {reportPreview.transactions.map((transaction, index) => (
                                        <tr key={index} className='flex flex-row w-full bg-white dark:bg-gray-700 border-b dark:border-gray-600'>
                                            <td className="p-2 text-left min-w-[100px] dark:text-gray-300">{transaction.date || transaction.transactionDate}</td>
                                            <td className="grow p-2 text-left dark:text-gray-300">{transaction.description}</td>
                                            <td className="p-2 text-left min-w-[65px] dark:text-gray-300">{transaction.amount}</td>
                                            <td className="p-2 text-left min-w-[80px] dark:text-gray-300">{transaction.type}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageTemplate>
    );
};
