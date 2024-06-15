import {PageTemplate} from "../components/PageTemplate.jsx";
import {TransactionForm} from "../components/TransactionForm.jsx";
import {TransactionCard} from "../components/TransactionCard.jsx";
import brainIcon from "../assets/images/brainstorm.png";
import TestChart from "../components/TestChart.jsx";
import React from "react";

export const Incomes = () => {
    return (
        <PageTemplate>
            <div className="flex-grow">
            <div className=" bg-blue-100 p-4 mb-2 text-center rounded-lg flex items-center justify-center">
                <span className="text-black text-lg font-semibold">Całkowite przychody</span>
                <span className="text-green-500 text-3xl font-semibold p-1 ml-2">$150</span>
            </div>
            <div className="flex-wrap md:flex-nowrap justify-between p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex-1 bg-blue-100 mx-2 p-4 mb-4 md:mb-0 rounded-md">
                    <h2 className='text-blue-600 text-2xl bg-blue-100 mb-4'>Formularz</h2>
                    <TransactionForm transaction_name="Wydatki"/>
                </div>
                <div className="flex-1 bg-blue-100 mx-2 p-4 rounded-md">
                <h2 className='text-blue-600 text-2xl bg-blue-100 mb-4'>Historia wydatków</h2>
                <div className="overflow-y-auto h-full max-h-screen flex flex-col">
                    <TransactionCard
                    category_icon={brainIcon}
                    title="Książka"
                    amount="-40"
                    date="14/06/2024"
                    description="Lorem ipsum"
                    />
                    <TransactionCard
                    category_icon={brainIcon}
                    title="Książka"
                    amount="-40"
                    date="14/06/2024"
                    description="Lorem ipsum"
                    />
                    <TransactionCard
                    category_icon={brainIcon}
                    title="Książka"
                    amount="-40"
                    date="14/06/2024"
                    description="Lorem ipsum"
                    />
                    <TransactionCard
                    category_icon={brainIcon}
                    title="Książka"
                    amount="-40"
                    date="14/06/2024"
                    description="Lorem ipsum"
                    />
                    <TransactionCard
                    category_icon={brainIcon}
                    title="Książka"
                    amount="-40"
                    date="14/06/2024"
                    description="Lorem ipsum"
                    />
                    <TransactionCard
                    category_icon={brainIcon}
                    title="Książka"
                    amount="-40"
                    date="14/06/2024"
                    description="Lorem ipsum"
                    />
                </div>
                </div>
                <div className="flex-1 bg-blue-100 mx-2 p-4 flex flex-col rounded-md">
                    <h2 className='text-blue-600 text-2xl bg-blue-100 mb-4'>Wykres przychdów</h2>
                    <TestChart/>
                </div>
            </div>
            </div>
        </PageTemplate>
    )
}
