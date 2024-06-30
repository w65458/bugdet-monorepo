import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { PageTemplate } from "../components/PageTemplate.jsx";
import { TransactionForm } from "../components/TransactionForm.jsx";
import { TransactionCard } from "../components/TransactionCard.jsx";
import Chart from "react-apexcharts";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { BanknotesIcon, CalendarIcon } from "@heroicons/react/24/outline"; // Importowanie ikony kalendarza
import chartConfig from "../config/chartIncomesConfig.js";
import pl from 'date-fns/locale/pl';
import 'dayjs/locale/pl';
import numeral from "numeral";

dayjs.locale('pl');
registerLocale('pl', pl);

export const Incomes = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [chartData, setChartData] = useState({
        categories: [],
        series: [{ name: 'Przychody', data: [] }],
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
            const incomes = response.data.filter(transaction =>
                transaction.type === 'Przychody' && dayjs(transaction.transactionDate).format('YYYY-MM') === month
            );
            setTransactions(incomes);
            const total = incomes.reduce((acc, transaction) => acc + transaction.amount, 0);
            setTotalIncome(total);

            const dates = incomes.map(transaction => dayjs(transaction.transactionDate).format('YYYY-MM-DD'));
            const amounts = incomes.map(transaction => transaction.amount);

            setChartData({
                categories: dates,
                series: [{ name: 'Przychody', data: amounts }]
            });
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleAddTransaction = (newTransaction) => {
        const month = dayjs(selectedMonth).format('YYYY-MM');
        if (dayjs(newTransaction.transactionDate).format('YYYY-MM') === month) {
            setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
            setTotalIncome(prevTotal => prevTotal + newTransaction.amount);

            setChartData(prevChartData => {
                const newDates = [dayjs(newTransaction.transactionDate).format('YYYY-MM-DD'), ...prevChartData.categories];
                const newAmounts = [newTransaction.amount, ...prevChartData.series[0].data];

                return {
                    categories: newDates,
                    series: [{ name: 'Przychody', data: newAmounts }]
                };
            });
        }

        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    const formattedTotalIncome = numeral(totalIncome).format('0,0.00');

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
                <div className="relative bg-blue-100 p-6 rounded-lg shadow-lg mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-left">Całkowite przychody</h2>
                        <div className="text-black text-lg font-semibold">
                            <span className="text-green-500 text-3xl font-semibold p-1">${formattedTotalIncome}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
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
                {showAlert && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        <strong className="font-bold">Sukces!</strong>
                        <span className="block sm:inline"> Przychód został dodany.</span>
                    </div>
                )}
                <div className="flex flex-wrap justify-between p-2 bg-gray-100">
                    <div className="flex-1 min-w-[350px] lg:min-w-[400px] bg-blue-100 m-2 p-4 rounded-md">
                        <h2 className="text-blue-600 text-2xl bg-blue-100 mb-4">Dodaj nowy przychód</h2>
                        <TransactionForm transaction_name="Przychody" userId={1} onAddTransaction={handleAddTransaction} />
                    </div>
                    <div className="flex-1 min-w-[350px] lg:min-w-[400px] bg-blue-100 m-2 p-4 rounded-md">
                        <h2 className="text-blue-600 text-2xl bg-blue-100 mb-4">Wykres przychodów</h2>
                        <div className="flex-col">
                            <Card className='relative z-30'>
                                <CardHeader
                                    floated={false}
                                    shadow={false}
                                    color="transparent"
                                    className="flex flex-col gap-4 p-2 rounded-none md:flex-row md:items-center"
                                >
                                    <div className="w-max rounded-lg p-5 text-black bg-green-200 lg:block md:hidden">
                                        <BanknotesIcon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <Typography variant="h6" color="blue-gray">
                                            Wykres przychodów
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="max-w-sm font-normal"
                                        >
                                            Poniżej przedstawiono wykres przychodów
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
                        <h2 className="text-blue-600 text-2xl bg-blue-100 mb-4">Historia przychodów</h2>
                        <div className="overflow-y-auto custom-scrollbar flex flex-col" style={{ maxHeight: '500px' }}>
                            {transactions.map((transaction) => (
                                <TransactionCard
                                    key={transaction.id}
                                    category={transaction.categoryId}
                                    title={transaction.name}
                                    amount={transaction.amount}
                                    date={transaction.transactionDate}
                                    description={transaction.description}
                                    amount_color="text-green-500"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
};
