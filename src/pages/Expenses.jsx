import React from "react";
import {PageTemplate} from "../components/PageTemplate.jsx";
import {TransactionCard} from "../components/TransactionCard.jsx";
import {TransactionForm} from "../components/TransactionForm.jsx";
import brainIcon from "../assets/images/brainstorm.png"
import computerIcon from "../assets/images/pc.png"
import cutleryIcon from "../assets/images/cutlery.png"


export const Expenses = () => {
    return (
        <PageTemplate>
            <div className="bg-blue-100 p-4 text-center rounded-lg flex items-center justify-center">
                <span className="text-black text-lg font-semibold">Całkowite wydatki</span>
                <span className="text-red-500 text-3xl font-semibold p-1 ml-2">$150</span>
            </div>

            <div className='flex justify-center'>
                <div className="bg-blue-100 p-8 m-8 rounded-lg shadow-lg h-auto w-full max-w-md">
                    <TransactionForm transaction_name="Wydatki"/>
                </div>
            <div className="bg-blue-100 p-8 m-8 rounded-lg shadow-lg h-auto w-full max-w-md">
                <h2 className='text-blue-600 p-4 text-2xl bg-blue-100'>Historia wydatków</h2>
                <div className="overflow-y-auto max-h-96 custom-scrollbar">
                <TransactionCard
                    category_icon={brainIcon}
                    title="Książka"
                    amount="-40"
                    date="14/06/2024"
                    description="Lorem ipsum"
                />
                <TransactionCard
                    category_icon={computerIcon}
                    title="Klawiatura"
                    amount="-300"
                    date="12/06/2024"
                    description="Lorem ipsum"
                />
                <TransactionCard
                    category_icon={cutleryIcon}
                    title="Jedzenie"
                    amount="-67"
                    date="4/06/2024"
                    description="Lorem ipsum"
                />
                <TransactionCard
                    category_icon={computerIcon}
                    title="Słuchawki"
                    amount="-600"
                    date="12/06/2024"
                    description="Lorem ipsum"
                /><TransactionCard
                    category_icon={brainIcon}
                    title="Książka"
                    amount="-40"
                    date="14/06/2024"
                    description="Lorem ipsum"
                /><TransactionCard
                    category_icon={computerIcon}
                    title="Klawiatura"
                    amount="-300"
                    date="12/06/2024"
                    description="Lorem ipsum"
                /><TransactionCard
                    category_icon={cutleryIcon}
                    title="Jedzenie"
                    amount="-67"
                    date="4/06/2024"
                    description="Lorem ipsum"
                /><TransactionCard
                    category_icon={computerIcon}
                    title="Słuchawki"
                    amount="-600"
                    date="12/06/2024"
                    description="Lorem ipsum"
                />
                </div>
            </div>
            </div>
        </PageTemplate>

    )
}
