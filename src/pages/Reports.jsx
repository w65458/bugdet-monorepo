import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PageTemplate } from "../components/PageTemplate.jsx";

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

    const getCurrentMonthIndex = () => {
        return new Date().getMonth();
    };

    const [selectedMonthIndex, setSelectedMonthIndex] = useState(getCurrentMonthIndex());
    const [reports, setReports] = useState([]);
    const [reportPreview, setReportPreview] = useState(null); // Nowy stan do przechowywania podglądu raportu
    const userId = 1; // Replace with dynamic user ID as needed

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
            setReportPreview(response.data); // Ustaw podgląd raportu
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
            <div className="flex flex-col justify-center">
                <div className="flex flex-col bg-blue-100 p-6 text-black rounded-lg">
                    <h1 className="text-2xl mb-4">Wygeneruj swój raport za dany miesiąc</h1>
                    <div className="mb-4">
                        <label htmlFor="month-select" className="block mb-2">Wybierz miesiąc:</label>
                        <select
                            id="month-select"
                            value={selectedMonthIndex}
                            onChange={handleMonthChange}
                            className="p-2 border rounded text-black w-full"
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    >
                        Generuj raport
                    </button>
                    <button
                        onClick={() => downloadReport('pdf')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    >
                        Generuj raport PDF
                    </button>
                    <button
                        onClick={() => downloadReport('csv')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Generuj raport CSV
                    </button>
                </div>
                {reportPreview && (
                    <div className="mt-6 p-4 bg-white rounded-lg shadow-lg">
                        <h2 className="text-xl mb-4">Podgląd Raportu</h2>
                        <table className="min-w-full bg-white">
                            <thead>
                            <tr>
                                <th className="py-2 text-left">Miesiąc</th>
                                <th className="py-2 text-left">Całkowity Dochód</th>
                                <th className="py-2 text-left">Całkowite Wydatki</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="py-2 text-left">{getMonthName(reportPreview.month)}</td>
                                <td className="py-2 text-left">{reportPreview.totalIncome}</td>
                                <td className="py-2 text-left">{reportPreview.totalExpense}</td>
                            </tr>
                            </tbody>
                        </table>
                        <h3 className="text-lg mt-4 mb-2">Transakcje</h3>
                        <table className="min-w-full bg-white">
                            <thead>
                            <tr>
                                <th className="py-2 text-left">Data</th>
                                <th className="py-2 text-left">Opis</th>
                                <th className="py-2 text-left">Kwota</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reportPreview.transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td className="py-2 text-left">{transaction.date || transaction.transactionDate}</td>
                                    <td className="py-2 text-left">{transaction.description}</td>
                                    <td className="py-2 text-left">{transaction.amount}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </PageTemplate>
    );
};
