package com.example.budget.controller;

import com.example.budget.dto.BudgetDto;
import com.example.budget.service.BudgetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Budget", description = "APIs for managing budgets")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @Operation(summary = "Create a new budget", description = "Creates a new budget for the user in a specific category.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Budget created successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = BudgetDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public ResponseEntity<BudgetDto> createBudget(@RequestBody BudgetDto budgetDto) {
        BudgetDto newBudget = budgetService.createBudget(budgetDto);
        return new ResponseEntity<>(newBudget, HttpStatus.CREATED);
    }

    @Operation(summary = "Update an existing budget", description = "Updates an existing budget with the given ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Budget updated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = BudgetDto.class))),
            @ApiResponse(responseCode = "404", description = "Budget not found"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PutMapping("/{budgetId}")
    public ResponseEntity<BudgetDto> updateBudget(@PathVariable Long budgetId, @RequestBody BudgetDto budgetDto) {
        BudgetDto updatedBudget = budgetService.updateBudget(budgetId, budgetDto);
        return new ResponseEntity<>(updatedBudget, HttpStatus.OK);
    }

    @Operation(summary = "Get all budgets for a user", description = "Retrieves all budgets associated with a specific user ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Budgets retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = BudgetDto.class))),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BudgetDto>> getAllBudgetsByUser(@PathVariable Long userId) {
        List<BudgetDto> budgets = budgetService.getAllBudgetsByUserId(userId);
        return new ResponseEntity<>(budgets, HttpStatus.OK);
    }

    @Operation(summary = "Delete a budget", description = "Deletes a budget with the given ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Budget deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Budget not found")
    })
    @DeleteMapping("/{budgetId}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long budgetId) {
        budgetService.deleteBudget(budgetId);
        return ResponseEntity.noContent().build();
    }

}
