import React from "react";
import { PageTemplate } from "../components/PageTemplate.jsx";
import { BudgetOverview } from "../components/BudgetOverview.jsx";

export const MainPanel = () => {
    return (
        <PageTemplate>
            <div className="container mx-auto p-4">
                <BudgetOverview />
            </div>
        </PageTemplate>
    );
};
