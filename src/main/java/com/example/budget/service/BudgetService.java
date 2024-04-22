package com.example.budget.service;

import com.example.budget.dto.BudgetDto;

import java.util.List;

public interface BudgetService {
    BudgetDto createBudget(BudgetDto budgetDto);
    BudgetDto updateBudget(Long budgetId, BudgetDto budgetDto);
    List<BudgetDto> getAllBudgetsByUserId(Long userId);
    void deleteBudget(Long budgetId);
}
