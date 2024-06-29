package com.example.budget.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

import com.example.budget.dto.TransactionDto;
import com.example.budget.entity.PaymentCategory;
import com.example.budget.entity.Transaction;
import com.example.budget.entity.User;
import com.example.budget.repository.PaymentCategoryRepository;
import com.example.budget.repository.TransactionRepository;
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
class TransactionServiceImplTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PaymentCategoryRepository paymentCategoryRepository;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    private TransactionDto transactionDto;
    private User user;
    private PaymentCategory category;
    private Transaction transaction;

    @BeforeEach
    void setUp() {
        transactionDto = new TransactionDto();
        transactionDto.setUserId(1L);
        transactionDto.setCategoryId(1L);
        transactionDto.setAmount(100.0);
        transactionDto.setType("Przychody");
        transactionDto.setDescription("Grocery shopping");
        transactionDto.setTransactionDate(LocalDate.of(2023, 6, 15));

        user = new User();
        user.setId(1L);

        category = new PaymentCategory();
        category.setId(1L);

        transaction = new Transaction();
        transaction.setId(1L);
        transaction.setUser(user);
        transaction.setCategory(category);
        transaction.setAmount(100.0);
        transaction.setType("Przychody");
        transaction.setDescription("Grocery shopping");
        transaction.setTransactionDate(LocalDate.of(2023, 6, 15));
    }

    @Test
    void createTransaction_ShouldReturnCreatedTransaction() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        when(paymentCategoryRepository.findById(anyLong())).thenReturn(Optional.of(category));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        TransactionDto result = transactionService.createTransaction(transactionDto);

        assertNotNull(result);
        assertEquals(transaction.getAmount(), result.getAmount());
        assertEquals(transaction.getDescription(), result.getDescription());
        verify(userRepository, times(1)).findById(anyLong());
        verify(paymentCategoryRepository, times(1)).findById(anyLong());
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }

    @Test
    void createTransaction_ShouldThrowException_WhenUserOrCategoryNotFound() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            transactionService.createTransaction(transactionDto);
        });

        assertEquals("User or Category not found", exception.getMessage());
        verify(userRepository, times(1)).findById(anyLong());
        verify(paymentCategoryRepository, times(1)).findById(anyLong());
        verify(transactionRepository, never()).save(any(Transaction.class));
    }

    @Test
    void getAllTransactionsByUserId_ShouldReturnListOfTransactions() {
        List<Transaction> transactions = Arrays.asList(transaction);
        when(transactionRepository.findByUserId(anyLong())).thenReturn(transactions);

        List<TransactionDto> result = transactionService.getAllTransactionsByUserId(1L);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(transaction.getAmount(), result.get(0).getAmount());
        verify(transactionRepository, times(1)).findByUserId(anyLong());
    }
}
