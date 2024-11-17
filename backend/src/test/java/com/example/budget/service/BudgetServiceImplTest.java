package com.example.budget.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.example.budget.dto.BudgetDto;
import com.example.budget.entity.Budget;
import com.example.budget.entity.PaymentCategory;
import com.example.budget.entity.User;
import com.example.budget.repository.BudgetRepository;
import com.example.budget.repository.PaymentCategoryRepository;
import com.example.budget.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class BudgetServiceImplTest {

    @Mock
    private BudgetRepository budgetRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PaymentCategoryRepository paymentCategoryRepository;

    @InjectMocks
    private BudgetServiceImpl budgetService;

    private BudgetDto budgetDto;
    private User user;
    private PaymentCategory category;
    private Budget budget;

    @BeforeEach
    void setUp() {
        budgetDto = new BudgetDto();
        budgetDto.setUserId(1L);
        budgetDto.setCategoryName("Elektronika");
        budgetDto.setLimitAmount(500.0);

        user = new User();
        user.setId(1L);

        category = new PaymentCategory();
        category.setId(1L);

        budget = new Budget();
        budget.setId(1L);
        budget.setUser(user);
        budget.setCategory(category);
        budget.setLimitAmount(500.0);
    }

    @Test
    void createBudget_ShouldReturnCreatedBudget() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        when(paymentCategoryRepository.findByNameIgnoreCase(anyString())).thenReturn(Optional.of(category));
        when(budgetRepository.save(any(Budget.class))).thenReturn(budget);

        BudgetDto result = budgetService.createBudget(budgetDto);

        assertNotNull(result);
        assertEquals(budget.getLimitAmount(), result.getLimitAmount());
        verify(userRepository, times(1)).findById(anyLong());
        verify(paymentCategoryRepository, times(1)).findByNameIgnoreCase(anyString());
        verify(budgetRepository, times(1)).save(any(Budget.class));
    }

    @Test
    void createBudget_ShouldThrowException_WhenUserOrCategoryNotFound() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            budgetService.createBudget(budgetDto);
        });

        assertEquals("User or Category not found", exception.getMessage());
        verify(userRepository, times(1)).findById(anyLong());
        verify(paymentCategoryRepository, times(1)).findByNameIgnoreCase(anyString());
        verify(budgetRepository, never()).save(any(Budget.class));
    }

    @Test
    void updateBudget_ShouldReturnUpdatedBudget() {
        when(budgetRepository.findById(anyLong())).thenReturn(Optional.of(budget));
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        when(paymentCategoryRepository.findByNameIgnoreCase(anyString())).thenReturn(Optional.of(category));
        when(budgetRepository.save(any(Budget.class))).thenReturn(budget);

        BudgetDto result = budgetService.updateBudget(1L, budgetDto);

        assertNotNull(result);
        assertEquals(budget.getLimitAmount(), result.getLimitAmount());
        verify(budgetRepository, times(1)).findById(anyLong());
        verify(userRepository, times(1)).findById(anyLong());
        verify(paymentCategoryRepository, times(1)).findByNameIgnoreCase(anyString());
        verify(budgetRepository, times(1)).save(any(Budget.class));
    }

    @Test
    void updateBudget_ShouldThrowException_WhenBudgetNotFound() {
        when(budgetRepository.findById(anyLong())).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            budgetService.updateBudget(1L, budgetDto);
        });

        assertEquals("Budget not found", exception.getMessage());
        verify(budgetRepository, times(1)).findById(anyLong());
        verify(userRepository, never()).findById(anyLong());
        verify(paymentCategoryRepository, never()).findByNameIgnoreCase(anyString());
        verify(budgetRepository, never()).save(any(Budget.class));
    }

    @Test
    void updateBudget_ShouldThrowException_WhenUserOrCategoryNotFound() {
        when(budgetRepository.findById(anyLong())).thenReturn(Optional.of(budget));
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            budgetService.updateBudget(1L, budgetDto);
        });

        assertEquals("User not found", exception.getMessage());
        verify(budgetRepository, times(1)).findById(anyLong());
        verify(userRepository, times(1)).findById(anyLong());
        verify(paymentCategoryRepository, never()).findByNameIgnoreCase(anyString());
        verify(budgetRepository, never()).save(any(Budget.class));
    }

    @Test
    void deleteBudget_ShouldDeleteBudget() {
        when(budgetRepository.existsById(anyLong())).thenReturn(true);
        doNothing().when(budgetRepository).deleteById(anyLong());

        budgetService.deleteBudget(1L);

        verify(budgetRepository, times(1)).existsById(anyLong());
        verify(budgetRepository, times(1)).deleteById(anyLong());
    }

    @Test
    void deleteBudget_ShouldThrowException_WhenBudgetNotFound() {
        when(budgetRepository.existsById(anyLong())).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () -> {
            budgetService.deleteBudget(1L);
        });

        assertEquals("Budget not found", exception.getMessage());
        verify(budgetRepository, times(1)).existsById(anyLong());
        verify(budgetRepository, never()).deleteById(anyLong());
    }

    @Test
    void getAllBudgetsByUserId_ShouldReturnListOfBudgets() {
        List<Budget> budgets = Arrays.asList(budget);
        when(budgetRepository.findByUserId(anyLong())).thenReturn(budgets);

        List<BudgetDto> result = budgetService.getAllBudgetsByUserId(1L);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(budget.getLimitAmount(), result.get(0).getLimitAmount());
        verify(budgetRepository, times(1)).findByUserId(anyLong());
    }
}
