package com.example.budget.service;

import com.example.budget.dto.GoalDto;

import java.util.List;

public interface GoalService {
    GoalDto createGoal(GoalDto goalDto);
    GoalDto updateGoal(Long goalId, GoalDto goalDto);
    List<GoalDto> getAllGoalsByUserId(Long userId);
    void deleteGoal(Long goalId);
}
