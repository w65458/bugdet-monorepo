import {addMonths, subMonths} from "date-fns";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import {useDate} from "../context/MonthContext.jsx";

const monthsInNominative = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
];

const MonthSwitcher = () => {
    const { selectedDate, setSelectedDate } = useDate();

    const getMonthName = (date) => {
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        return `${monthsInNominative[monthIndex]} ${year}`;
    };

    const handlePrevMonth = () => {
        setSelectedDate(subMonths(selectedDate, 1));
    };

    const handleNextMonth = () => {
        setSelectedDate(addMonths(selectedDate, 1));
    };

    return (
        <div className="flex items-center justify-center gap-4 bg-blue-100 dark:bg-gray-800 p-4 rounded-lg">
            <button
                onClick={handlePrevMonth}
                className="p-1.5 bg-blue-500 dark:bg-gray-700 text-white rounded-full hover:bg-blue-600 dark:hover:bg-gray-600 transition-colors"
            >
                <ChevronLeftIcon className="h-4 w-4"/>
            </button>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
        {getMonthName(selectedDate)}
      </span>
            <button
                onClick={handleNextMonth}
                className="p-1.5 bg-blue-500 dark:bg-gray-700 text-white rounded-full hover:bg-blue-600 dark:hover:bg-gray-600 transition-colors"
            >
                <ChevronRightIcon className="h-4 w-4"/>
            </button>
        </div>
    );
};

export default MonthSwitcher;
