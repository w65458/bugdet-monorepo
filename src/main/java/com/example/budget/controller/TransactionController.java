package com.example.budget.controller;

import com.example.budget.dto.TransactionDto;
import com.example.budget.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionDto> addTransaction(@RequestBody TransactionDto transactionDto) {
        TransactionDto savedTransaction = transactionService.createTransaction(transactionDto);
        return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<TransactionDto>> getAllTransactionsByUser(@PathVariable Long userId) {
        List<TransactionDto> transactions = transactionService.getAllTransactionsByUserId(userId);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
}
