import {PageTemplate} from "../components/PageTemplate.jsx";
import {Link} from "react-router-dom";

export const MainPanel = () => {
    const budgetState = {
        totalIncome: 10000,
        totalExpenses: 4000,
        balance: 6000,
    };

    const recentIncomes = [
        { id: 1, title: 'Salary', amount: 3000 },
        { id: 2, title: 'Freelance', amount: 2000 },
    ];

    const recentExpenses = [
        { id: 1, title: 'Rent', amount: 1500 },
        { id: 2, title: 'Groceries', amount: 500 },
    ];

    const reports = [
        { id: 1, title: 'May Report', summary: 'Overview of May financials' },
        { id: 2, title: 'April Report', summary: 'Overview of April financials' },
    ];

    const goals = [
        { id: 1, title: 'Save for vacation', status: 'In Progress' },
        { id: 2, title: 'Pay off debt', status: 'Completed' },
    ];

    return (
        <PageTemplate>
            <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-blue-100 h-40 lg:h-64 p-4">
                    <h2 className="text-2xl font-bold mb-2">Budżet</h2>
                    <p>Total Income: ${budgetState.totalIncome}</p>
                    <p>Total Expenses: ${budgetState.totalExpenses}</p>
                    <p>Balance: ${budgetState.balance}</p>
                </div>
                <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-blue-100 h-40 lg:h-48 p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold mb-2">Przychody</h2>
                        <Link to="/incomes" className="bg-blue-500 text-white px-2 py-2 rounded">
                            Zobacz więcej
                        </Link>
                    </div>
                    <ul>
                        {recentIncomes.map((income) => (
                            <li key={income.id}>{income.title}: ${income.amount}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-blue-100 h-40 lg:h-48 p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold mb-2">Wydatki</h2>
                        <Link to="/expenses" className="bg-blue-500 text-white px-2 py-2 rounded">
                            Zobacz więcej
                        </Link>
                    </div>
                    <ul>
                        {recentExpenses.map((expense) => (
                            <li key={expense.id}>{expense.title}: ${expense.amount}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-blue-100 h-40 lg:h-48 p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold mb-2">Raporty</h2>
                        <Link to="/reports" className="bg-blue-500 text-white px-2 py-2 rounded">
                            Zobacz więcej
                        </Link>
                    </div>
                    <ul>
                        {reports.map((report) => (
                            <li key={report.id}>
                                <strong>{report.title}:</strong> {report.summary}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-blue-100 h-40 lg:h-48 p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold mb-2">Cele</h2>
                        <Link to="/goals" className="bg-blue-500 text-white px-2 py-2 rounded">
                            Zobacz więcej
                        </Link>
                    </div>
                    <ul>
                        {goals.map((goal) => (
                            <li key={goal.id}>
                                <strong>{goal.title}:</strong> {goal.status}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </PageTemplate>
    )
}
