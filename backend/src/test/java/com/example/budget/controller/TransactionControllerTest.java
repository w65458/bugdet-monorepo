package com.example.budget.controller;

import com.example.budget.dto.TransactionDto;
import com.example.budget.service.TransactionService;
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
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TransactionController.class)
class TransactionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TransactionService transactionService;

    @Autowired
    private ObjectMapper objectMapper;

    private TransactionDto transactionDto;

    @BeforeEach
    void setUp() {
        transactionDto = new TransactionDto();
        transactionDto.setId(1L);
        transactionDto.setUserId(1L);
        transactionDto.setAmount(100.0);
        transactionDto.setDescription("Grocery shopping");
    }

    @Test
    void addTransaction_ShouldReturnCreatedTransaction() throws Exception {
        when(transactionService.createTransaction(any(TransactionDto.class))).thenReturn(transactionDto);

        mockMvc.perform(post("/api/transactions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(transactionDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(transactionDto.getId()))
                .andExpect(jsonPath("$.userId").value(transactionDto.getUserId()))
                .andExpect(jsonPath("$.amount").value(transactionDto.getAmount()))
                .andExpect(jsonPath("$.description").value(transactionDto.getDescription()));

        verify(transactionService, times(1)).createTransaction(any(TransactionDto.class));
    }

    @Test
    void getAllTransactionsByUser_ShouldReturnListOfTransactions() throws Exception {
        List<TransactionDto> transactions = Arrays.asList(transactionDto);
        when(transactionService.getAllTransactionsByUserId(anyLong())).thenReturn(transactions);

        mockMvc.perform(get("/api/transactions/{userId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(transactionDto.getId()))
                .andExpect(jsonPath("$[0].userId").value(transactionDto.getUserId()))
                .andExpect(jsonPath("$[0].amount").value(transactionDto.getAmount()))
                .andExpect(jsonPath("$[0].description").value(transactionDto.getDescription()));

        verify(transactionService, times(1)).getAllTransactionsByUserId(anyLong());
    }
}
