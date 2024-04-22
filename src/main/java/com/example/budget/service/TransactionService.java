package com.example.budget.service;

import com.example.budget.dto.TransactionDto;

import java.util.List;

public interface TransactionService {
    TransactionDto createTransaction(TransactionDto transactionDto);
    List<TransactionDto> getAllTransactionsByUserId(Long userId);
}
