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
import { ReportsOverview } from "../components/ReportsOverview.jsx";
import { GoalList } from "../components/GoalList.jsx";

registerLocale('pl', pl);

export const MainPanel = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const datepickerRef = useRef(null);

    const formatDate = (date) => {
        return dayjs(date).format('MMMM YYYY');
    };

    return (
        <PageTemplate>
            <div className="h-full w-full flex flex-col gap-4 overflow-hidden">
                <div className="h-20 w-full bg-blue-100 rounded-lg flex items-center justify-center place-items-center p-2">
                    <h2 className="text-md md:text-3xl font-bold text-left">Budżet</h2>
                    <div className="grow flex gap-2 items-center justify-center place-items-center">
                        <CalendarIcon
                            className="h-0 w-0 md:h-6 md:w-6 text-gray-600 cursor-pointer"
                            onClick={() => datepickerRef.current.setFocus()}
                        />
                        <DatePicker
                            ref={datepickerRef}
                            selected={selectedMonth}
                            onChange={(date) => setSelectedMonth(date)}
                            dateFormat="MMMM yyyy"
                            showMonthYearPicker
                            locale="pl"
                            className="p-0 md:p-2 border-none md:border border-gray-300 rounded-md shadow-sm"
                            customInput={
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={formatDate(selectedMonth)}
                                        readOnly
                                        className="p-2 border w-24 border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                            }
                        />
                    </div>
                    <h2 className="invisible text-md md:text-3xl font-bold text-left">Budżet</h2>
                </div>
                <BudgetOverview selectedMonth={selectedMonth} />
                <div className="flex-grow overflow-y-auto">
                    <div className="flex flex-wrap gap-4 h-full">
                        <div className="min-w-[300px] md:w-1/2 2xl:w-1/4 xl:h-full overflow-hidden">
                            <TransactionRadarChart selectedMonth={selectedMonth} />
                        </div>
                        <div className="min-w-[300px] md:w-1/2 2xl:w-1/4 h-[300px] xl:h-full overflow-y-auto">
                            <TransactionList selectedMonth={selectedMonth} />
                        </div>
                        <div className="min-w-[300px] md:w-1/2 2xl:w-1/4 h-[300px] xl:h-full overflow-y-auto">
                            <ReportsOverview selectedMonth={selectedMonth} />
                        </div>
                        <div className="min-w-[300px] md:w-1/2 2xl:flex-1 h-[300px] xl:h-full overflow-y-auto">
                            <GoalList />
                        </div>
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
};