package com.example.budget.service;

import com.example.budget.dto.GoalDto;

import java.util.List;

public class GoalServiceImpl implements GoalService {

    @Override
    public GoalDto createGoal(GoalDto goalDto) {
        return null;
    }

    @Override
    public GoalDto updateGoal(Long goalId, GoalDto goalDto) {
        return null;
    }

    @Override
    public List<GoalDto> getAllGoalsByUserId(Long userId) {
        return List.of();
    }

    @Override
    public void deleteGoal(Long goalId) {

    }

}
