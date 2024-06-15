import React from "react";
import {PageTemplate} from "../components/PageTemplate.jsx";
import {TransactionCard} from "../components/TransactionCard.jsx";
import {TransactionForm} from "../components/TransactionForm.jsx";
import brainIcon from "../assets/images/brainstorm.png"
import computerIcon from "../assets/images/pc.png"
import cutleryIcon from "../assets/images/cutlery.png"
import TestChart from "../components/TestChart.jsx";


export const Expenses = () => {
    return (
        <PageTemplate>
            {/*<div className="bg-blue-100 p-4 mb-2 text-center rounded-lg flex items-center justify-center">*/}
            {/*    <span className="text-black text-lg font-semibold">Całkowite przychody</span>*/}
            {/*    <span className="text-red-500 text-3xl font-semibold p-1 ml-2">$150</span>*/}
            {/*</div>*/}
            {/*<div className="flex flex-wrap md:flex-nowrap justify-between p-4 bg-gray-100">*/}
            {/*    <div className="flex-1 bg-blue-100 mx-2 p-4 mb-4 md:mb-0 rounded-md">*/}
            {/*        <h2 className='text-blue-600 text-2xl bg-blue-100 mb-4'>Formularz</h2>*/}
            {/*        <TransactionForm transaction_name="Wydatki"/>*/}
            {/*    </div>*/}
            {/*    <div className="flex-1 bg-blue-100 mx-2 p-4 rounded-md">*/}
            {/*        <h2 className='text-blue-600 text-2xl bg-blue-100 mx-2 p-4 flex flex-col mb-4 md:mb-0'>Historia wydatków</h2>*/}
            {/*        <div className="overflow-y-auto flex-1">*/}
            {/*            <TransactionCard*/}
            {/*                category_icon={brainIcon}*/}
            {/*                title="Książka"*/}
            {/*                amount="-40"*/}
            {/*                date="14/06/2024"*/}
            {/*                description="Lorem ipsum"*/}
            {/*            />*/}
            {/*            <TransactionCard*/}
            {/*                category_icon={brainIcon}*/}
            {/*                title="Książka"*/}
            {/*                amount="-40"*/}
            {/*                date="14/06/2024"*/}
            {/*                description="Lorem ipsum"*/}
            {/*            />*/}
            {/*            <TransactionCard*/}
            {/*                category_icon={brainIcon}*/}
            {/*                title="Książka"*/}
            {/*                amount="-40"*/}
            {/*                date="14/06/2024"*/}
            {/*                description="Lorem ipsum"*/}
            {/*            />*/}
            {/*            <TransactionCard*/}
            {/*                category_icon={brainIcon}*/}
            {/*                title="Książka"*/}
            {/*                amount="-40"*/}
            {/*                date="14/06/2024"*/}
            {/*                description="Lorem ipsum"*/}
            {/*            />*/}
            {/*            <TransactionCard*/}
            {/*                category_icon={brainIcon}*/}
            {/*                title="Książka"*/}
            {/*                amount="-40"*/}
            {/*                date="14/06/2024"*/}
            {/*                description="Lorem ipsum"*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*    <div className="flex-1 bg-blue-100 mx-2 p-4 flex flex-col rounded-md">*/}
            {/*        <h2 className='text-blue-600 text-2xl bg-blue-100 mb-4'>Wykres wydatków</h2>*/}
            {/*        <TestChart/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </PageTemplate>
    )
}
