import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';

export const TransactionRadarChart = ({ selectedMonth }) => {
    const [transactionType, setTransactionType] = useState('Przychody');
    const [chartData, setChartData] = useState({
        categories: ['Kategoria 1', 'Kategoria 2', 'Kategoria 3', 'Kategoria 4', 'Kategoria 5', 'Kategoria 6', 'Kategoria 7'],
        series: [{ name: 'Brak danych', data: [0, 0, 0, 0, 0, 0, 0], color: 'gray' }],
    });

    useEffect(() => {
        fetchTransactionData(transactionType);
    }, [transactionType, selectedMonth]);

    const fetchTransactionData = async (type) => {
        try {
            const response = await axios.get('/api/transactions/1');
            const transactions = response.data.filter(transaction =>
                (type === 'Wszystkie' || transaction.type === type) &&
                dayjs(transaction.transactionDate).format('YYYY-MM') === dayjs(selectedMonth).format('YYYY-MM')
            );

            const categoryCountsIncomes = transactions.reduce((acc, transaction) => {
                if (transaction.type === 'Przychody') {
                    const category = transaction.categoryId;
                    acc[category] = (acc[category] || 0) + 1;
                }
                return acc;
            }, {});

            const categoryCountsExpenses = transactions.reduce((acc, transaction) => {
                if (transaction.type === 'Wydatki') {
                    const category = transaction.categoryId;
                    acc[category] = (acc[category] || 0) + 1;
                }
                return acc;
            }, {});

            const categories = Array.from(new Set([
                ...Object.keys(categoryCountsIncomes),
                ...Object.keys(categoryCountsExpenses)
            ])).map(key => `Kategoria ${key}`);

            const seriesDataIncomes = categories.map(category => categoryCountsIncomes[category.split(' ')[1]] || 0);
            const seriesDataExpenses = categories.map(category => categoryCountsExpenses[category.split(' ')[1]] || 0);

            const newSeries = [];
            if (type !== 'Wydatki') {
                newSeries.push({ name: 'Przychody', data: seriesDataIncomes, color: 'green' });
            }
            if (type !== 'Przychody') {
                newSeries.push({ name: 'Wydatki', data: seriesDataExpenses, color: 'red' });
            }

            setChartData({
                categories: categories.length ? categories : ['Kategoria 1', 'Kategoria 2', 'Kategoria 3', 'Kategoria 4', 'Kategoria 5', 'Kategoria 6', 'Kategoria 7'],
                series: newSeries.length ? newSeries : [{ name: 'Brak danych', data: [0, 0, 0, 0, 0, 0, 0], color: 'gray' }],
            });
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        }
    };

    const handleTypeChange = (type) => {
        setTransactionType(type);
    };

    const chartOptions = {
        chart: {
            type: 'radar',
        },
        xaxis: {
            categories: chartData.categories,
        },
        yaxis: {
            tickAmount: 5,
            labels: {
                formatter: (value) => `${Math.round(value)}`,
            },
        },
        stroke: {
            width: 3,
        },
        markers: {
            size: 4,
        },
        plotOptions: {
            radar: {
                polygons: {
                    strokeColor: '#e9e9e9',
                    fill: {
                        colors: ['#f8f8f8', '#fff']
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -20,
                bottom: -20
            }
        },
        colors: ['green', 'red'], // Colors for the series
    };

    return (
        <div className="flex flex-col h-full bg-blue-100 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Transakcje według kategorii</h2>
                <div className="space-x-2 flex-wrap">
                    <button
                        className={`px-4 py-2 m-1 min-w-[100px] rounded-lg ${transactionType === 'Przychody' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => handleTypeChange('Przychody')}
                    >
                        Przychody
                    </button>
                    <button
                        className={`px-4 py-2 m-1 min-w-[100px] rounded-lg ${transactionType === 'Wydatki' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => handleTypeChange('Wydatki')}
                    >
                        Wydatki
                    </button>
                    <button
                        className={`px-4 py-2 m-1 min-w-[100px] rounded-lg ${transactionType === 'Wszystkie' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => handleTypeChange('Wszystkie')}
                    >
                        Wszystkie
                    </button>
                </div>
            </div>
            <div className="flex-1">
                <Chart options={chartOptions} series={chartData.series} type="radar" height="100%" />
            </div>
        </div>
    );
};
