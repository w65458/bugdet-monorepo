package com.example.budget.service;

import com.example.budget.dto.GoalDto;
import com.example.budget.dto.mapper.GoalMapper;
import com.example.budget.entity.Goal;
import com.example.budget.entity.User;
import com.example.budget.repository.GoalRepository;
import com.example.budget.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {

    private final GoalRepository goalRepository;

    private final UserRepository userRepository;

    @Override
    public GoalDto createGoal(GoalDto goalDto) {
        Optional<User> user = userRepository.findById(goalDto.getUserId());
        if (user.isPresent()) {
            Goal goal = Goal.builder()
                    .user(user.get())
                    .name(goalDto.getName())
                    .currentValue(goalDto.getCurrentValue())
                    .targetAmount(goalDto.getTargetAmount())
                    .targetDate(goalDto.getTargetDate())
                    .description(goalDto.getDescription())
                    .build();
            Goal savedGoal = goalRepository.save(goal);
            return GoalMapper.INSTANCE.goalToGoalDto(savedGoal);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public GoalDto updateGoal(Long goalId, GoalDto goalDto) {
        Optional<Goal> existingGoal = goalRepository.findById(goalId);
        if (existingGoal.isPresent()) {
            Goal goal = existingGoal.get();
            if (goalDto.getName() != null) {
                goal.setName(goalDto.getName());
            }
            if (goalDto.getCurrentValue() != null) {
                goal.setCurrentValue(goalDto.getCurrentValue());
            }
            if (goalDto.getTargetAmount() != null) {
                goal.setTargetAmount(goalDto.getTargetAmount());
            }
            if (goalDto.getTargetDate() != null) {
                goal.setTargetDate(goalDto.getTargetDate());
            }
            if (goalDto.getDescription() != null) {
                goal.setDescription(goalDto.getDescription());
            }
            if (goalDto.getUserId() != null) {
                Optional<User> user = userRepository.findById(goalDto.getUserId());
                if (user.isPresent()) {
                    goal.setUser(user.get());
                } else {
                    throw new RuntimeException("User not found");
                }
            }

            Goal updatedGoal = goalRepository.save(goal);
            return GoalMapper.INSTANCE.goalToGoalDto(updatedGoal);
        } else {
            throw new RuntimeException("Goal not found");
        }
    }

    @Override
    public void deleteGoal(Long goalId) {
        if (goalRepository.existsById(goalId)) {
            goalRepository.deleteById(goalId);
        } else {
            throw new RuntimeException("Goal not found");
        }
    }

    @Override
    public List<GoalDto> getAllGoalsByUserId(Long userId) {
        List<Goal> goals = goalRepository.findByUserId(userId);
        return goals.stream()
                .map(GoalMapper.INSTANCE::goalToGoalDto)
                .collect(Collectors.toList());
    }

}
