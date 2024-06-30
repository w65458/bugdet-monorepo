package com.example.budget.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

import com.example.budget.dto.GoalDto;
import com.example.budget.entity.Goal;
import com.example.budget.entity.User;
import com.example.budget.repository.GoalRepository;
import com.example.budget.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class GoalServiceImplTest {

    @Mock
    private GoalRepository goalRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private GoalServiceImpl goalService;

    private GoalDto goalDto;
    private User user;
    private Goal goal;

    @BeforeEach
    void setUp() {
        goalDto = new GoalDto();
        goalDto.setUserId(1L);
        goalDto.setName("Car");
        goalDto.setTargetAmount(15000.0);
        goalDto.setTargetDate(LocalDate.of(2024, 12, 31));
        goalDto.setDescription("Save for a car to the end of the year");

        user = new User();
        user.setId(1L);

        goal = new Goal();
        goal.setId(1L);
        goal.setUser(user);
        goal.setName("Car");
        goal.setTargetAmount(15000.0);
        goal.setTargetDate(LocalDate.of(2024, 12, 31));
        goal.setDescription("Save for a car to the end of the year");
    }

    @Test
    void createGoal_ShouldReturnCreatedGoal() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        when(goalRepository.save(any(Goal.class))).thenReturn(goal);

        GoalDto result = goalService.createGoal(goalDto);

        assertNotNull(result);
        assertEquals(goal.getName(), result.getName());
        assertEquals(goal.getTargetAmount(), result.getTargetAmount());
        verify(userRepository, times(1)).findById(anyLong());
        verify(goalRepository, times(1)).save(any(Goal.class));
    }

    @Test
    void createGoal_ShouldThrowException_WhenUserNotFound() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            goalService.createGoal(goalDto);
        });

        assertEquals("User not found", exception.getMessage());
        verify(userRepository, times(1)).findById(anyLong());
        verify(goalRepository, never()).save(any(Goal.class));
    }

    @Test
    void updateGoal_ShouldReturnUpdatedGoal() {
        when(goalRepository.findById(anyLong())).thenReturn(Optional.of(goal));
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        when(goalRepository.save(any(Goal.class))).thenReturn(goal);

        GoalDto result = goalService.updateGoal(1L, goalDto);

        assertNotNull(result);
        assertEquals(goal.getName(), result.getName());
        assertEquals(goal.getTargetAmount(), result.getTargetAmount());
        verify(goalRepository, times(1)).findById(anyLong());
        verify(userRepository, times(1)).findById(anyLong());
        verify(goalRepository, times(1)).save(any(Goal.class));
    }

    @Test
    void updateGoal_ShouldThrowException_WhenGoalNotFound() {
        when(goalRepository.findById(anyLong())).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            goalService.updateGoal(1L, goalDto);
        });

        assertEquals("Goal not found", exception.getMessage());
        verify(goalRepository, times(1)).findById(anyLong());
        verify(userRepository, never()).findById(anyLong());
        verify(goalRepository, never()).save(any(Goal.class));
    }

    @Test
    void updateGoal_ShouldThrowException_WhenUserNotFound() {
        when(goalRepository.findById(anyLong())).thenReturn(Optional.of(goal));
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            goalService.updateGoal(1L, goalDto);
        });

        assertEquals("User not found", exception.getMessage());
        verify(goalRepository, times(1)).findById(anyLong());
        verify(userRepository, times(1)).findById(anyLong());
        verify(goalRepository, never()).save(any(Goal.class));
    }

    @Test
    void deleteGoal_ShouldDeleteGoal() {
        when(goalRepository.existsById(anyLong())).thenReturn(true);
        doNothing().when(goalRepository).deleteById(anyLong());

        goalService.deleteGoal(1L);

        verify(goalRepository, times(1)).existsById(anyLong());
        verify(goalRepository, times(1)).deleteById(anyLong());
    }

    @Test
    void deleteGoal_ShouldThrowException_WhenGoalNotFound() {
        when(goalRepository.existsById(anyLong())).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () -> {
            goalService.deleteGoal(1L);
        });

        assertEquals("Goal not found", exception.getMessage());
        verify(goalRepository, times(1)).existsById(anyLong());
        verify(goalRepository, never()).deleteById(anyLong());
    }

    @Test
    void getAllGoalsByUserId_ShouldReturnListOfGoals() {
        List<Goal> goals = Arrays.asList(goal);
        when(goalRepository.findByUserId(anyLong())).thenReturn(goals);

        List<GoalDto> result = goalService.getAllGoalsByUserId(1L);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(goal.getName(), result.get(0).getName());
        verify(goalRepository, times(1)).findByUserId(anyLong());
    }
}

