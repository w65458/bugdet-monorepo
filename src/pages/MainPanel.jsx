import React from "react";
import {registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {PageTemplate} from "../components/PageTemplate.jsx";
import {BudgetOverview} from "../components/BudgetOverview.jsx";
import {TransactionRadarChart} from "../components/TransactionRadarChart.jsx";
import {TransactionList} from "../components/TransactionList.jsx";
import pl from 'date-fns/locale/pl';
import {ReportsOverview} from "../components/ReportsOverview.jsx";
import {GoalList} from "../components/GoalList.jsx";
import MonthSwitcher from "../components/MonthSwitcher.jsx";
import {useDate} from "../context/MonthContext.jsx";

registerLocale('pl', pl);

export const MainPanel = () => {
    const {selectedDate} = useDate();

    return (
        <PageTemplate>
            <div className="h-full w-full flex flex-col gap-4 overflow-hidden bg-white dark:bg-gray-900">
                <MonthSwitcher/>
                <BudgetOverview selectedDate={selectedDate}/>
                <div className="flex-grow overflow-y-auto w-full scrollbar-none dark:scrollbar-thumb-gray-500">
                    <div className="h-auto flex gap-4 md:gap-0 flex-wrap lg:flex-nowrap lg:h-full w-full">
                        <div className="h-auto flex gap-4 md:gap-0 flex-wrap w-full 2xl:w-1/2 2xl:h-full">
                            <div
                                className="flex-grow m-2 mt-0 min-w-[300px] w-full 2xl:w-1/4 h-[600px] lg:h-full overflow-hidden shadow-lg bg-white dark:bg-gray-800 p-4 py-6">
                                <TransactionRadarChart selectedDate={selectedDate}/>
                            </div>
                            <div
                                className="flex-grow m-2 mt-0 min-w-[300px] w-full 2xl:w-1/4 h-[400px] lg:h-full overflow-y-auto dark:scrollbar-thumb-gray-500 shadow-lg bg-white dark:bg-gray-800 p-4 py-6">
                                <TransactionList selectedDate={selectedDate}/>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 md:gap-0 w-full 2xl:w-1/2 h-full">
                            <div
                                className="flex-grow m-2 mt-0 min-w-[415px] w-full 2xl:w-1/4 h-[600px] lg:h-full overflow-y-auto dark:scrollbar-thumb-gray-500 shadow-lg bg-white dark:bg-gray-800 p-4 py-6">
                                <ReportsOverview selectedDate={selectedDate}/>
                            </div>
                            <div
                                className="flex-grow m-2 mt-0 min-w-[300px] w-full 2xl:w-1/4 h-96 lg:h-full overflow-y-auto dark:scrollbar-thumb-gray-500 shadow-lg bg-white dark:bg-gray-800 p-4 py-6">
                                <GoalList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
};
