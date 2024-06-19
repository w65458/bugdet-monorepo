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
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    const generatePdfReport = async () => {
        try {
            const response = await axios.get(`/api/reports/generate/pdf`, {
                params: {
                    userId: userId
                },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error generating PDF report:', error);
        }
    };

    const generateCsvReport = async () => {
        try {
            const response = await axios.get(`/api/reports/generate/csv`, {
                params: {
                    userId: userId
                },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.csv');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error generating CSV report:', error);
        }
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
                        onClick={generatePdfReport}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    >
                        Generuj raport PDF
                    </button>
                    <button
                        onClick={generateCsvReport}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Generuj raport CSV
                    </button>
                </div>
            </div>
        </PageTemplate>
    );
};
