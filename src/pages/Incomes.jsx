import { PageTemplate } from "../components/PageTemplate.jsx";
import { TransactionForm } from "../components/TransactionForm.jsx";
import { TransactionCard } from "../components/TransactionCard.jsx";
import brainIcon from "../assets/images/brainstorm.png";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Chart from "react-apexcharts";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { BanknotesIcon } from "@heroicons/react/24/outline/index.js";
import chartConfig from "../config/chartIncomesConfig.js";
import dayjs from "dayjs";
import numeral from "numeral";

export const Incomes = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [chartData, setChartData] = useState({
        categories: [],
        series: [{ name: 'Przychody', data: [] }],
    });

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/transactions/1');
            const incomes = response.data.filter(transaction => transaction.type === 'Przychody');
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
                    formatter: (value) => dayjs(value).format('MMM D, YYYY'),
                },
            },
        },
    };

    return (
        <PageTemplate>
            <div className="bg-blue-100 p-4 mb-2]=[ text-center rounded-lg flex items-center justify-center">
                <span className="text-black text-lg font-semibold">Całkowite przychody</span>
                <span className="text-green-500 text-3xl font-semibold p-1 ml-2">${formattedTotalIncome}</span>
            </div>
            {showAlert && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Sukces!</strong>
                    <span className="block sm:inline"> Przychód został dodany.</span>
                </div>
            )}
            <div className="flex flex-wrap justify-between p-4 mb-4 bg-gray-100">
                <div className="flex-1 min-w-[350px] lg:min-w-[400px] bg-blue-100 mx-2 p-4 mb-4 rounded-md">
                    <h2 className="text-blue-600 text-2xl bg-blue-100 mb-4">Dodaj nowy przychód</h2>
                    <TransactionForm transaction_name="Przychody" userId={1} onAddTransaction={handleAddTransaction} />
                </div>
                <div className="flex-1 min-w-[350px] lg:min-w-[400px] bg-blue-100 mx-2 p-4 mb-4 rounded-md">
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
                                        Wykres liniowy
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
                <div className="flex-1 min-w-[350px] lg:min-w-[400px] bg-blue-100 mx-2 p-4 mb-4 rounded-md">
                    <h2 className="text-blue-600 text-2xl bg-blue-100 mb-4">Historia przychodów</h2>
                    <div className="overflow-y-auto custom-scrollbar flex flex-col" style={{ maxHeight: '500px' }}>
                        {transactions.map((transaction) => (
                            <TransactionCard
                                key={transaction.id}
                                category_icon={brainIcon}
                                title={transaction.description}
                                amount={transaction.amount}
                                date={transaction.transactionDate}
                                description={transaction.description}
                                amount_color="text-green-500"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
};
