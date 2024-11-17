package com.example.budget.controller;

import com.example.budget.dto.GoalDto;
import com.example.budget.service.GoalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/goals")
@Tag(name = "Goal", description = "APIs for managing goal")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @Operation(summary = "Create a new goal")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Goal created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public ResponseEntity<GoalDto> createGoal(@RequestBody GoalDto goalDto) {
        GoalDto createdGoal = goalService.createGoal(goalDto);
        return ResponseEntity.ok(createdGoal);
    }

    @Operation(summary = "Update an existing goal")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Goal updated successfully"),
            @ApiResponse(responseCode = "404", description = "Goal not found")
    })
    @PutMapping("/{goalId}")
    public ResponseEntity<GoalDto> updateGoal(@PathVariable Long goalId, @RequestBody GoalDto goalDto) {
        GoalDto updatedGoal = goalService.updateGoal(goalId, goalDto);
        return ResponseEntity.ok(updatedGoal);
    }

    @Operation(summary = "Delete a goal")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Goal deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Goal not found")
    })
    @DeleteMapping("/{goalId}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long goalId) {
        goalService.deleteGoal(goalId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Get all goals for a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Goals retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<GoalDto>> getAllGoalsByUserId(@PathVariable Long userId) {
        List<GoalDto> goals = goalService.getAllGoalsByUserId(userId);
        return ResponseEntity.ok(goals);
    }

}
