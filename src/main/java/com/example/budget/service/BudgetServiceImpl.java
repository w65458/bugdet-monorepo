package com.example.budget.service;

import com.example.budget.dto.BudgetDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetServiceImpl implements BudgetService {

    @Override
    public BudgetDto createBudget(BudgetDto budgetDto) {
        return null;
    }

    @Override
    public BudgetDto updateBudget(Long budgetId, BudgetDto budgetDto) {
        return null;
    }

    @Override
    public List<BudgetDto> getAllBudgetsByUserId(Long userId) {
        return List.of();
    }

    @Override
    public void deleteBudget(Long budgetId) {

    }
}
