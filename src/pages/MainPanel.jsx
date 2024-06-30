import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { PageTemplate } from "../components/PageTemplate.jsx";
import { BudgetOverview } from "../components/BudgetOverview.jsx";
import { TransactionRadarChart } from "../components/TransactionRadarChart.jsx";
import { TransactionList } from "../components/TransactionList.jsx";
import { CalendarIcon } from "@heroicons/react/24/outline";
import pl from 'date-fns/locale/pl';
import {ReportsOverview} from "../components/ReportsOverview.jsx";
import {GoalList} from "../components/GoalList.jsx";

registerLocale('pl', pl);

export const MainPanel = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const datepickerRef = useRef(null);

    const formatDate = (date) => {
        return dayjs(date).format('MMMM YYYY');
    };

    return (
        <PageTemplate>
            <div className="container mx-auto p-4">
                <div className="relative bg-blue-100 p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-3xl font-bold mb-4 text-left">MyMoneyApp</h2>
                    <div className="absolute top-4 right-4 flex items-center">
                        <CalendarIcon
                            className="h-6 w-6 text-gray-600 cursor-pointer"
                            onClick={() => datepickerRef.current.setFocus()}
                        />
                        <DatePicker
                            ref={datepickerRef}
                            selected={selectedMonth}
                            onChange={(date) => setSelectedMonth(date)}
                            dateFormat="MMMM yyyy"
                            showMonthYearPicker
                            locale="pl"
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
                </div>
                <BudgetOverview selectedMonth={selectedMonth} />
                <div className="mt-8 flex flex-col md:flex-row gap-4">
                    <div className="bg-blue-100 p-4 rounded-lg shadow-lg flex-1">
                        <TransactionRadarChart selectedMonth={selectedMonth} />
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg shadow-lg flex-1">
                        <TransactionList selectedMonth={selectedMonth} />
                    </div>
                </div>
                <div className="mt-8 flex flex-col md:flex-row gap-4">
                    <div className="bg-blue-100 p-4 rounded-lg shadow-lg flex-1">
                        <ReportsOverview selectedMonth={selectedMonth} />
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg shadow-lg flex-1">
                        <GoalList />
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
};
