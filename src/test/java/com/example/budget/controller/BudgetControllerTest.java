package com.example.budget.controller;

import com.example.budget.dto.BudgetDto;
import com.example.budget.service.BudgetService;
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

@WebMvcTest(BudgetController.class)
class BudgetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BudgetService budgetService;

    @Autowired
    private ObjectMapper objectMapper;

    private BudgetDto budgetDto;

    @BeforeEach
    void setUp() {
        budgetDto = new BudgetDto();
        budgetDto.setId(1L);
        budgetDto.setUserId(1L);
        budgetDto.setCategoryId(1L);
        budgetDto.setLimitAmount(200.0);
    }

    @Test
    void createBudget_ShouldReturnCreatedBudget() throws Exception {
        when(budgetService.createBudget(any(BudgetDto.class))).thenReturn(budgetDto);

        mockMvc.perform(post("/api/budgets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(budgetDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(budgetDto.getId()))
                .andExpect(jsonPath("$.categoryId").value(budgetDto.getCategoryId()))
                .andExpect(jsonPath("$.limitAmount").value(budgetDto.getLimitAmount()));

        verify(budgetService, times(1)).createBudget(any(BudgetDto.class));
    }

    @Test
    void updateBudget_ShouldReturnUpdatedBudget() throws Exception {
        when(budgetService.updateBudget(anyLong(), any(BudgetDto.class))).thenReturn(budgetDto);

        mockMvc.perform(put("/api/budgets/{budgetId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(budgetDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(budgetDto.getId()))
                .andExpect(jsonPath("$.categoryId").value(budgetDto.getCategoryId()))
                .andExpect(jsonPath("$.limitAmount").value(budgetDto.getLimitAmount()));

        verify(budgetService, times(1)).updateBudget(anyLong(), any(BudgetDto.class));
    }

    @Test
    void getAllBudgetsByUser_ShouldReturnListOfBudgets() throws Exception {
        List<BudgetDto> budgets = Arrays.asList(budgetDto);
        when(budgetService.getAllBudgetsByUserId(anyLong())).thenReturn(budgets);

        mockMvc.perform(get("/api/budgets/user/{userId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(budgetDto.getId()))
                .andExpect(jsonPath("$[0].categoryId").value(budgetDto.getCategoryId()))
                .andExpect(jsonPath("$[0].limitAmount").value(budgetDto.getLimitAmount()));

        verify(budgetService, times(1)).getAllBudgetsByUserId(anyLong());
    }

    @Test
    void deleteBudget_ShouldReturnNoContent() throws Exception {
        doNothing().when(budgetService).deleteBudget(anyLong());

        mockMvc.perform(delete("/api/budgets/{budgetId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        verify(budgetService, times(1)).deleteBudget(anyLong());
    }
}
