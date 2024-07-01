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
            <div className="h-full w-full flex flex-col overflow-auto scrollbar-none">
                <div className="w-full bg-blue-100 rounded-lg shadow-lg flex items-center justify-center place-items-center p-2">
                    <h2 className="text-md md:text-3xl font-bold text-left">Całkowite przychody</h2>
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
                            className="p-0 md:p-2border-none md:border border-gray-300 rounded-md shadow-sm"
                            customInput={
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={formatDate(selectedMonth)}
                                        readOnly
                                        className="p-2 border w-32 border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                            }
                        />
                    </div>
                    <p className="text-green-500 text-3xl font-semibold p-1">${formattedTotalIncome}</p>
                </div>
                {showAlert && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        <strong className="font-bold">Sukces!</strong>
                        <span className="block sm:inline"> Przychód został dodany.</span>
                    </div>
                )}
                <div className="flex flex-grow flex-wrap xl:flex-nowrap px-0 md:px-2 p-2 gap-2 bg-gray-100 w-full overflow-auto scrollbar-none xl:overflow-hidden">
                    <div className="flex flex-col h-auto md:h-full w-full md:w-1/2 xl:w-1/3 min-w-[320px] md:min-w-[350px] bg-blue-100 p-4 rounded-md">
                        <h2 className="text-blue-600 text-2xl bg-blue-100 p-2">Dodaj nowy przychód</h2>
                        <div className="flex h-full w-full">
                            <TransactionForm transaction_name="Przychody" userId={1} onAddTransaction={handleAddTransaction} />
                        </div>
                    </div>
                    <div className="flex-1 w-full h-auto md:h-full md:w-1/2 min-w-[320px] md:min-w-[350px] bg-blue-100 p-4 rounded-md">
                    <h2 className="text-blue-600 text-2xl bg-blue-100 p-2">Wykres przychodów</h2>
                        <div className="flex flex-col w-full">
                            <Card className='w-full rounded-lg'>
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
                    <div className="flex flex-col w-full xl:w-1/3 min-w-[320px] md:min-w-[500px] bg-blue-100 p-4 rounded-md h-full xl:h-auto md:overflow-y-auto scrollbar-none max-h-[400px] xl:max-h-full">
                        <h2 className="text-blue-600 text-2xl bg-blue-100 p-2">Historia przychodów</h2>
                        <div className="gap-2 pr-2 w-full overflow-y-auto scrollbar-none md:scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-blue-500 flex flex-col h-full xl:max-h-full">
                            {transactions.map((transaction) => (
                                <TransactionCard
                                    key={transaction.id}
                                    category={transaction.categoryName}
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
