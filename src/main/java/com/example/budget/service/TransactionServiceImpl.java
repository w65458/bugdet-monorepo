package com.example.budget.service;

import com.example.budget.dto.TransactionDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Override
    public TransactionDto createTransaction(TransactionDto transactionDto) {
        return null;
    }

    @Override
    public List<TransactionDto> getAllTransactionsByUserId(Long userId) {
        return List.of();
    }

}
