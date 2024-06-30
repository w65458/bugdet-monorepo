import React, { useEffect, useState, useRef } from "react";
import { PageTemplate } from "../components/PageTemplate.jsx";
import { TransactionCard } from "../components/TransactionCard.jsx";
import { TransactionForm } from "../components/TransactionForm.jsx";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { BanknotesIcon, CalendarIcon } from "@heroicons/react/24/outline";
import Chart from "react-apexcharts";
import chartConfig from "../config/chartExpensesConfig.js";
import axios from 'axios';
import dayjs from "dayjs";
import 'dayjs/locale/pl';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import pl from 'date-fns/locale/pl';
import numeral from "numeral";

dayjs.locale('pl');
registerLocale('pl', pl);

export const Expenses = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [chartData, setChartData] = useState({
        categories: [],
        series: [{ name: 'Wydatki', data: [] }],
    });
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const datepickerRef = useRef(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        fetchTransactions(dayjs(selectedMonth).format('YYYY-MM'));
    }, [selectedMonth]);

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
                series: [{ name: 'Wydatki', data: amounts }]
            });
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleAddTransaction = (newTransaction) => {
        const month = dayjs(selectedMonth).format('YYYY-MM');
        if (dayjs(newTransaction.transactionDate).format('YYYY-MM') === month) {
            setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
            setTotalExpense(prevTotal => prevTotal + newTransaction.amount);

            setChartData(prevChartData => {
                const newDates = [dayjs(newTransaction.transactionDate).format('YYYY-MM-DD'), ...prevChartData.categories];
                const newAmounts = [newTransaction.amount, ...prevChartData.series[0].data];

                return {
                    categories: newDates,
                    series: [{ name: 'Wydatki', data: newAmounts }]
                };
            });
        }

        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    const formattedTotalExpense = numeral(totalExpense).format('0,0.00');

    const customChartConfig = {
        ...chartConfig,
        series: chartData.series,
        options: {
            ...chartConfig.options,
            xaxis: {
                ...chartConfig.options.xaxis,
                categories: chartData.categories,
                labels: {
                    rotate: -45,
                    rotateAlways: true,
                    formatter: (value) => dayjs(value).format('D MMM'),
                },
            },
        },
    };

    const formatDate = (date) => {
        return dayjs(date).format('MMMM YYYY');
    };

    return (
        <PageTemplate>
            <div className="relative flex flex-col grow">
                <div className="bg-blue-100 p-4 text-center flex items-center justify-center">
                    <span className="text-black text-lg font-semibold">Całkowite wydatki</span>
                    <span className="text-red-500 text-3xl font-semibold p-1 ml-2">${formattedTotalExpense}</span>
                </div>
                <div className="absolute top-4 right-4 flex items-center z-50">
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
                {showAlert && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <strong className="font-bold">Sukces!</strong>
                        <span className="block sm:inline"> Wydatek został dodany.</span>
                    </div>
                )}
                <div className="flex flex-wrap justify-between p-2 bg-gray-100">
                    <div className="flex-1 min-w-[350px] lg:min-w-[400px] bg-blue-100 m-2 p-4 rounded-md">
                        <h2 className="text-blue-600 text-2xl bg-blue-100 mb-4">Dodaj nowy wydatek</h2>
                        <TransactionForm transaction_name="Wydatki" userId={1} onAddTransaction={handleAddTransaction} />
                    </div>
                    <div className="flex-1 min-w-[350px] lg:min-w-[400px] bg-blue-100 m-2 p-4 rounded-md">
                        <h2 className="text-blue-600 text-2xl bg-blue-100 mb-4">Wykres wydatków</h2>
                        <div className="flex-col">
                            <Card className='relative z-30'>
                                <CardHeader
                                    floated={false}
                                    shadow={false}
                                    color="transparent"
                                    className="flex flex-col gap-4 p-2 rounded-none md:flex-row md:items-center"
                                >
                                    <div className="w-max rounded-lg p-5 text-black bg-red-200 lg:block md:hidden">
                                        <BanknotesIcon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <Typography variant="h6" color="blue-gray">
                                            Wykres liniowy
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="max-w-sm font-normal"
                                        >
                                            Poniżej przedstawiono wykres wydatków
                                        </Typography>
                                    </div>
                                </CardHeader>
                                <CardBody className="px-4 pb-0">
                                    <Chart {...customChartConfig} />
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                    <div className="flex-1 min-w-[350px] lg:min-w-[400px] bg-blue-100 m-2 p-4 rounded-md">
                        <h2 className="text-blue-600 text-2xl bg-blue-100 mb-4">Historia wydatków</h2>
                        <div className="overflow-y-auto custom-scrollbar flex flex-col" style={{ maxHeight: '500px' }}>
                            {transactions.map((transaction) => (
                                <TransactionCard
                                    key={transaction.id}
                                    category={transaction.categoryId}
                                    title={transaction.description}
                                    amount={transaction.amount}
                                    date={transaction.transactionDate}
                                    description={transaction.description}
                                    amount_color="text-red-500"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
};
