import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ReportsOverview = ({ selectedMonth }) => {
    const [reportPreview, setReportPreview] = useState(null); // Nowy stan do przechowywania podglądu raportu
    const userId = 1; // Replace with dynamic user ID as needed

    const generateReport = async () => {
        try {
            const response = await axios.post(`/api/reports/generate`, null, {
                params: {
                    userId: userId,
                    month: `${new Date(selectedMonth).getFullYear()}-${String(new Date(selectedMonth).getMonth() + 1).padStart(2, '0')}-01`
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

    const handleCloseReportPreview = () => {
        setReportPreview(null);
    };

    return (
        <div className="flex flex-col h-full p-4 rounded-lg shadow-lg bg-blue-100">
            <h2 className="text-2xl font-bold mb-4">Raporty</h2>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={generateReport}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Podgląd raportu
                </button>
                {/*<button*/}
                {/*    onClick={() => downloadReport('pdf')}*/}
                {/*    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"*/}
                {/*>*/}
                {/*    Pobierz PDF*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    onClick={() => downloadReport('csv')}*/}
                {/*    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"*/}
                {/*>*/}
                {/*    Pobierz CSV*/}
                {/*</button>*/}
            </div>
            {reportPreview && (
                <div className="mt-6 p-4 bg-white rounded-lg shadow-lg relative">
                    <button
                        onClick={handleCloseReportPreview}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    >
                        &times;
                    </button>
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
    );
};
