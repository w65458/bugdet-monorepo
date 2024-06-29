package com.example.budget.service;

import com.example.budget.dto.ReportDto;
import com.example.budget.entity.PaymentCategory;
import com.example.budget.entity.Transaction;
import com.example.budget.entity.User;
import com.example.budget.repository.TransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReportServiceImplTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private ReportServiceImpl reportService;

    private Transaction transactionIncome;
    private Transaction transactionExpense;
    private User user;
    private PaymentCategory category;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);

        category = new PaymentCategory();
        category.setId(1L);
        category.setName("Salary");

        transactionIncome = new Transaction();
        transactionIncome.setId(1L);
        transactionIncome.setUser(user);
        transactionIncome.setCategory(category);
        transactionIncome.setAmount(5000.0);
        transactionIncome.setType("Przychody");
        transactionIncome.setTransactionDate(LocalDate.of(2023, 6, 15));

        category = new PaymentCategory();
        category.setId(2L);
        category.setName("Food");

        transactionExpense = new Transaction();
        transactionExpense.setId(2L);
        transactionExpense.setUser(user);
        transactionExpense.setCategory(category);
        transactionExpense.setAmount(2000.0);
        transactionExpense.setType("Wydatki");
        transactionExpense.setTransactionDate(LocalDate.of(2023, 6, 20));
    }

    @Test
    void generateMonthlyReport_ShouldReturnReportDto() {
        List<Transaction> transactions = Arrays.asList(transactionIncome, transactionExpense);
        when(transactionRepository.findByUserIdAndTransactionDateBetween(anyLong(), any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(transactions);

        LocalDate month = LocalDate.of(2023, 6, 1);
        ReportDto result = reportService.generateMonthlyReport(1L, month);

        assertNotNull(result);
        assertEquals(1L, result.getUserId());
        assertEquals(month, result.getMonth());
        assertEquals(5000.0, result.getTotalIncome());
        assertEquals(2000.0, result.getTotalExpense());
        assertEquals(2, result.getTransactions().size());

        verify(transactionRepository, times(1)).findByUserIdAndTransactionDateBetween(anyLong(), any(LocalDate.class), any(LocalDate.class));
    }

    @Test
    void generateCsvReport_ShouldReturnCsvContent() {
        List<Transaction> transactions = Arrays.asList(transactionIncome, transactionExpense);
        when(transactionRepository.findByUserIdAndTransactionDateBetween(anyLong(), any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(transactions);

        LocalDate month = LocalDate.of(2023, 6, 1);
        byte[] csvReport = reportService.generateCsvReport(1L, month);

        assertNotNull(csvReport);
        verify(transactionRepository, times(1)).findByUserIdAndTransactionDateBetween(anyLong(), any(LocalDate.class), any(LocalDate.class));
    }

    @Test
    void generatePdfReport_ShouldReturnPdfContent() {
        List<Transaction> transactions = Arrays.asList(transactionIncome, transactionExpense);
        when(transactionRepository.findByUserIdAndTransactionDateBetween(anyLong(), any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(transactions);

        LocalDate month = LocalDate.of(2023, 6, 1);
        byte[] pdfReport = reportService.generatePdfReport(1L, month);

        assertNotNull(pdfReport);
        verify(transactionRepository, times(1)).findByUserIdAndTransactionDateBetween(anyLong(), any(LocalDate.class), any(LocalDate.class));
    }
}
