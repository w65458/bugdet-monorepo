package com.example.budget.controller;

import com.example.budget.dto.TransactionDto;
import com.example.budget.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Transaction", description = "APIs for managing transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Operation(summary = "Add a new transaction")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Transaction added successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TransactionDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public ResponseEntity<TransactionDto> addTransaction(@RequestBody TransactionDto transactionDto) {
        TransactionDto savedTransaction = transactionService.createTransaction(transactionDto);
        return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
    }

    @Operation(summary = "Get all transactions for a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Transactions retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TransactionDto.class))),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{userId}")
    public ResponseEntity<List<TransactionDto>> getAllTransactionsByUser(@PathVariable Long userId) {
        List<TransactionDto> transactions = transactionService.getAllTransactionsByUserId(userId);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
}
