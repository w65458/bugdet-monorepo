package com.example.budget.service;

import com.example.budget.dto.BudgetDto;
import com.example.budget.dto.mapper.BudgetMapper;
import com.example.budget.entity.Budget;
import com.example.budget.entity.PaymentCategory;
import com.example.budget.entity.User;
import com.example.budget.repository.BudgetRepository;
import com.example.budget.repository.PaymentCategoryRepository;
import com.example.budget.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;

    private final UserRepository userRepository;

    private final PaymentCategoryRepository paymentCategoryRepository;

    @Override
    public BudgetDto createBudget(BudgetDto budgetDto) {
        Optional<User> user = userRepository.findById(budgetDto.getUserId());
        Optional<PaymentCategory> category = paymentCategoryRepository.findById(budgetDto.getCategoryId());

        if (user.isPresent() && category.isPresent()) {
            Budget budget = Budget.builder()
                    .user(user.get())
                    .category(category.get())
                    .limitAmount(budgetDto.getLimitAmount())
                    .build();
            Budget savedBudget = budgetRepository.save(budget);
            return BudgetMapper.INSTANCE.budgetToBudgetDto(savedBudget);
        } else {
            throw new RuntimeException("User or Category not found");
        }
    }

    @Override
    public BudgetDto updateBudget(Long budgetId, BudgetDto budgetDto) {
        Optional<Budget> existingBudget = budgetRepository.findById(budgetId);

        if (existingBudget.isPresent()) {
            Budget budget = existingBudget.get();
            budget.setLimitAmount(budgetDto.getLimitAmount());

            Optional<User> user = userRepository.findById(budgetDto.getUserId());
            Optional<PaymentCategory> category = paymentCategoryRepository.findById(budgetDto.getCategoryId());

            if (user.isPresent() && category.isPresent()) {
                budget.setUser(user.get());
                budget.setCategory(category.get());
            } else {
                throw new RuntimeException("User or Category not found");
            }

            Budget updatedBudget = budgetRepository.save(budget);
            return BudgetMapper.INSTANCE.budgetToBudgetDto(updatedBudget);
        } else {
            throw new RuntimeException("Budget not found");
        }
    }

    @Override
    public void deleteBudget(Long budgetId) {
        if (budgetRepository.existsById(budgetId)) {
            budgetRepository.deleteById(budgetId);
        } else {
            throw new RuntimeException("Budget not found");
        }
    }

    @Override
    public List<BudgetDto> getAllBudgetsByUserId(Long userId) {
        List<Budget> budgets = budgetRepository.findByUserId(userId);

        return budgets.stream()
                .map(BudgetMapper.INSTANCE::budgetToBudgetDto)
                .collect(Collectors.toList());
    }
}
