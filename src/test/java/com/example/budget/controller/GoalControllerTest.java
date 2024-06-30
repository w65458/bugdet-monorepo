package com.example.budget.controller;

import com.example.budget.dto.GoalDto;
import com.example.budget.service.GoalService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(GoalController.class)
class GoalControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GoalService goalService;

    @Autowired
    private ObjectMapper objectMapper;

    private GoalDto goalDto;

    @BeforeEach
    void setUp() {
        goalDto = new GoalDto();
        goalDto.setId(1L);
        goalDto.setUserId(1L);
        goalDto.setName("Car");
        goalDto.setTargetAmount(10000.0);
        goalDto.setDescription("Save for a car");
    }

    @Test
    void createGoal_ShouldReturnCreatedGoal() throws Exception {
        when(goalService.createGoal(any(GoalDto.class))).thenReturn(goalDto);

        mockMvc.perform(post("/api/goals")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(goalDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(goalDto.getId()))
                .andExpect(jsonPath("$.name").value(goalDto.getName()))
                .andExpect(jsonPath("$.targetAmount").value(goalDto.getTargetAmount()));

        verify(goalService, times(1)).createGoal(any(GoalDto.class));
    }

    @Test
    void updateGoal_ShouldReturnUpdatedGoal() throws Exception {
        when(goalService.updateGoal(anyLong(), any(GoalDto.class))).thenReturn(goalDto);

        mockMvc.perform(put("/api/goals/{goalId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(goalDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(goalDto.getId()))
                .andExpect(jsonPath("$.name").value(goalDto.getName()))
                .andExpect(jsonPath("$.targetAmount").value(goalDto.getTargetAmount()));

        verify(goalService, times(1)).updateGoal(anyLong(), any(GoalDto.class));
    }

    @Test
    void deleteGoal_ShouldReturnNoContent() throws Exception {
        doNothing().when(goalService).deleteGoal(anyLong());

        mockMvc.perform(delete("/api/goals/{goalId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(goalService, times(1)).deleteGoal(anyLong());
    }

    @Test
    void getAllGoalsByUserId_ShouldReturnListOfGoals() throws Exception {
        List<GoalDto> goals = Arrays.asList(goalDto);
        when(goalService.getAllGoalsByUserId(anyLong())).thenReturn(goals);

        mockMvc.perform(get("/api/goals/user/{userId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(goalDto.getId()))
                .andExpect(jsonPath("$[0].name").value(goalDto.getName()))
                .andExpect(jsonPath("$[0].targetAmount").value(goalDto.getTargetAmount()));

        verify(goalService, times(1)).getAllGoalsByUserId(anyLong());
    }
}
