import React, {useEffect, useState} from "react";
import {PageTemplate} from "../components/PageTemplate.jsx";
import {TransactionCard} from "../components/TransactionCard.jsx";
import {TransactionForm} from "../components/TransactionForm.jsx";
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {BanknotesIcon} from "@heroicons/react/24/outline";
import Chart from "react-apexcharts";
import chartConfig from "../config/chartExpensesConfig.js";
import axios from 'axios';
import dayjs from "dayjs";
import 'dayjs/locale/pl';
import {registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import pl from 'date-fns/locale/pl';
import numeral from "numeral";
import 'react-toastify/dist/ReactToastify.css';
import MonthSwitcher from "../components/MonthSwitcher.jsx";
import {useDate} from "../context/MonthContext.jsx";

dayjs.locale('pl');
registerLocale('pl', pl);

export const Expenses = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [chartData, setChartData] = useState({
        categories: [],
        series: [{name: 'Wydatki', data: []}],
    });
    const {selectedDate} = useDate();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        fetchTransactions(dayjs(selectedDate).format('YYYY-MM'));
    }, [selectedDate]);

    const fetchTransactions = async (month) => {
        try {
            const response = await axios.get('/api/transactions/1');
            const expenses = response.data.filter(transaction =>
                transaction.type === 'Wydatki' && dayjs(transaction.transactionDate).format('YYYY-MM') === month
            );
            setTransactions(expenses);
            const total = expenses.reduce((acc, transaction) => acc + transaction.amount, 0);
            setTotalExpense(total);

            const dates = expenses.map(transaction => dayjs(transaction.transactionDate).format('YYYY-MM-DD'));
            const amounts = expenses.map(transaction => transaction.amount);

            setChartData({
                categories: dates,
                series: [{name: 'Wydatki', data: amounts}]
            });
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleAddTransaction = () => {
        fetchTransactions(dayjs(selectedDate).format('YYYY-MM'));
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    const formattedTotalExpense = numeral(totalExpense).format('0,0.00');

    const customChartConfig = {
        ...chartConfig,
        series: chartData.series.map(series => ({
            ...series,
            data: [...series.data],
        })),
        options: {
            ...chartConfig.options,
            xaxis: {
                ...chartConfig.options.xaxis,
                categories: [...chartData.categories],
                labels: {
                    rotate: -45,
                    rotateAlways: true,
                    formatter: (value) => dayjs(value).format('D MMM'),
                },
            },
        },
    };

    return (
        <PageTemplate>
            <div className="h-full w-full flex flex-col gap-4 overflow-hidden bg-white dark:bg-gray-900">
                <div className="h-20 w-full bg-blue-100 dark:bg-gray-800 flex items-center justify-center p-2">
                    <MonthSwitcher/>
                    <p className="text-red-500 dark:text-red-400 text-lg md:text-3xl font-semibold p-1 text-right ml-auto">{formattedTotalExpense} zł</p>
                </div>
                {showAlert && (
                    <div
                        className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-3 rounded relative mb-4">
                        <strong className="font-bold">Sukces!</strong>
                        <span className="block sm:inline"> Wydatek został dodany</span>
                    </div>
                )}
                <div
                    className="flex flex-grow flex-wrap 2xl:flex-nowrap px-0 md:px-2 p-2 gap-2 bg-gray-100 dark:bg-gray-900 w-full overflow-auto scrollbar-none 2xl:overflow-hidden">
                    <div
                        className="flex flex-col h-auto md:h-full w-full md:w-1/2 2xl:w-1/3 min-w-[320px] md:min-w-[350px] bg-blue-100 dark:bg-gray-800 p-4 rounded-md">
                        <h2 className="text-blue-600 dark:text-blue-400 text-2xl bg-blue-100 dark:bg-gray-800 p-2">
                            Dodaj nowy wydatek
                        </h2>
                        <div className="flex h-full w-full items-center justify-center place-items-center">
                            <TransactionForm transaction_name="Wydatki" userId={1}
                                             onAddTransaction={handleAddTransaction}/>
                        </div>
                    </div>
                    <div
                        className="flex-1 w-full h-auto md:h-full md:w-1/2 min-w-[320px] md:min-w-[350px] bg-blue-100 dark:bg-gray-800 p-4 rounded-md">
                        <h2 className="text-blue-600 dark:text-blue-400 text-2xl bg-blue-100 dark:bg-gray-800 p-2">
                            Wykres wydatków
                        </h2>
                        <div className="flex flex-col w-full items-center place-content-center justify-center">
                            <Card className='md:mt-5 xl:mt-10 w-full rounded-lg h-[500px] dark:bg-gray-900'>
                                <CardHeader
                                    floated={false}
                                    shadow={false}
                                    color="transparent"
                                    className="flex flex-col gap-4 p-2 rounded-none md:flex-row md:items-center dark:bg-gray-900"
                                >
                                    <div
                                        className="w-max rounded-lg p-5 text-black dark:text-gray-100 bg-red-200 dark:bg-red-700 lg:block md:hidden">
                                        <BanknotesIcon className="h-7 w-7"/>
                                    </div>
                                    <div>
                                        <Typography variant="h6" color="blue-gray" className="dark:text-gray-200">
                                            Wykres wydatków
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="max-w-sm font-normal dark:text-gray-400"
                                        >
                                            Poniżej przedstawiono wykres wydatków
                                        </Typography>
                                    </div>
                                </CardHeader>
                                <CardBody className="px-4 pb-0 h-full">
                                    <div className="w-full h-full">
                                        <Chart {...customChartConfig} height="100%"/>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                    <div
                        className="flex flex-col w-full 2xl:w-1/3 min-w-[320px] md:min-w-[500px] bg-blue-100 dark:bg-gray-800 p-4 rounded-md h-full 2xl:h-auto md:overflow-y-auto scrollbar-none max-h-[400px] 2xl:max-h-full">
                        <h2 className="text-blue-600 dark:text-blue-400 text-2xl bg-blue-100 dark:bg-gray-800 p-2">
                            Historia wydatków</h2>
                        <div
                            className="gap-2 pr-2 w-full overflow-y-auto scrollbar-none md:scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-blue-500 dark:scrollbar-thumb-gray-500 flex flex-col h-full 2xl:max-h-full">
                            {transactions.map((transaction) => (
                                <TransactionCard
                                    key={transaction.id}
                                    category={transaction.categoryName}
                                    title={transaction.name}
                                    amount={transaction.amount}
                                    date={transaction.transactionDate}
                                    description={transaction.description}
                                    amount_color="text-red-500 dark:text-red-400"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
};
