import React, { useState, useEffect } from 'react';
import {PageTemplate} from "../components/PageTemplate.jsx";


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

    const handleMonthChange = (event) => {
        setSelectedMonthIndex(parseInt(event.target.value));
    };

    const generateReport = () => {
        console.log(`Generowanie raportu dla miesiąca z indeksem: ${selectedMonthIndex}`);
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Generuj raport
                    </button>
                </div>
            </div>
        </PageTemplate>
    );
};
