import React from "react";
import {PageTemplate} from "../components/PageTemplate.jsx";
import {TransactionCard} from "../components/TransactionCard.jsx";
import {TransactionForm} from "../components/TransactionForm.jsx";
import brainIcon from "../assets/images/brainstorm.png"
import computerIcon from "../assets/images/pc.png"
import cutleryIcon from "../assets/images/cutlery.png"
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {BanknotesIcon} from "@heroicons/react/24/outline/index.js";
import Chart from "react-apexcharts";
import chartConfig from "../config/chartExpensesConfig.js";


export const Expenses = () => {
    return (
        <PageTemplate>
            <PageTemplate>
                <div className="bg-blue-100 p-4 mb-2 text-center rounded-lg flex items-center justify-center">
                    <span className="text-black text-lg font-semibold">Całkowite przychody</span>
                    <span className="text-red-500 text-3xl font-semibold p-1 ml-2">$150</span>
                </div>
                <div className="flex flex-wrap justify-between p-4 mb-4 bg-gray-100">
                    <div className="flex-1 min-w-[350px] lg:min-w-[400px] bg-blue-100 mx-2 p-4 mb-4 rounded-md">
                        <h2 className='text-blue-600 text-2xl bg-blue-100 mb-4'>Dodaj nowy wydatatek</h2>
                        <TransactionForm transaction_name="Wydatki" />
                    </div>
                    <div className="flex-1 min-w-[350px] lg:min-w-[400px] bg-blue-100 mx-2 p-4 mb-4 rounded-md">
                        <h2 className='text-blue-600 text-2xl bg-blue-100 mb-4'>Historia wydatków</h2>
                        <div className="overflow-y-auto custom-scrollbar flex flex-col" style={{ maxHeight: '500px' }}>
                            <TransactionCard
                                category_icon={brainIcon}
                                title="Książka"
                                amount="40"
                                date="14/06/2024"
                                description="Lorem ipsum"
                                amount_color="text-red-500"
                            />
                            <TransactionCard
                                category_icon={brainIcon}
                                title="Książka"
                                amount="40"
                                date="14/06/2024"
                                description="Lorem ipsum"
                                amount_color="text-red-500"
                            />
                            <TransactionCard
                                category_icon={brainIcon}
                                title="Książka"
                                amount="40"
                                date="14/06/2024"
                                description="Lorem ipsum"
                                amount_color="text-red-500"
                            />
                            <TransactionCard
                                category_icon={brainIcon}
                                title="Książka"
                                amount="40"
                                date="14/06/2024"
                                description="Lorem ipsum"
                                amount_color="text-red-500"
                            />
                            <TransactionCard
                                category_icon={brainIcon}
                                title="Książka"
                                amount="40"
                                date="14/06/2024"
                                description="Lorem ipsum"
                                amount_color="text-red-500"
                            />
                            <TransactionCard
                                category_icon={brainIcon}
                                title="Książka"
                                amount="40"
                                date="14/06/2024"
                                description="Lorem ipsum"
                                amount_color="text-red-500"
                            />
                        </div>
                    </div>
                    <div className="flex-1 min-w-[350px] lg:min-w-[400px] bg-blue-100 mx-2 p-4 mb-4 rounded-md">
                        <h2 className='text-blue-600 text-2xl bg-blue-100 mb-4'>Wykres przychodów</h2>
                        <div className=''>
                            <Card className='flex-col'>
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
                                            Poniżej przedstawiono wykres przychodów
                                        </Typography>
                                    </div>
                                </CardHeader>
                                <CardBody className="px-4 pb-0">
                                    <Chart {...chartConfig} />
                                </CardBody>
                            </Card>
                        </div>

                    </div>
                </div>
            </PageTemplate>
        </PageTemplate>
    )
}
