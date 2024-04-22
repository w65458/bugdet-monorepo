package com.example.budget.controller;

import com.example.budget.dto.BudgetDto;
import com.example.budget.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping
    public ResponseEntity<BudgetDto> createBudget(@RequestBody BudgetDto budgetDto) {
        BudgetDto newBudget = budgetService.createBudget(budgetDto);
        return new ResponseEntity<>(newBudget, HttpStatus.CREATED);
    }

    @PutMapping("/{budgetId}")
    public ResponseEntity<BudgetDto> updateBudget(@PathVariable Long budgetId, @RequestBody BudgetDto budgetDto) {
        BudgetDto updatedBudget = budgetService.updateBudget(budgetId, budgetDto);
        return new ResponseEntity<>(updatedBudget, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BudgetDto>> getAllBudgetsByUser(@PathVariable Long userId) {
        List<BudgetDto> budgets = budgetService.getAllBudgetsByUserId(userId);
        return new ResponseEntity<>(budgets, HttpStatus.OK);
    }

    @DeleteMapping("/{budgetId}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long budgetId) {
        budgetService.deleteBudget(budgetId);
        return ResponseEntity.noContent().build();
    }

}
