package com.example.budgetapp.service;

import com.example.budget.dto.PaymentCategoryDto;
import com.example.budget.entity.PaymentCategory;
import com.example.budget.repository.PaymentCategoryRepository;
import com.example.budget.service.PaymentCategoryService;
import com.example.budget.service.PaymentCategoryServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PaymentCategoryServiceImplTest {

    @Mock
    private PaymentCategoryRepository paymentCategoryRepository;

    @InjectMocks
    private PaymentCategoryServiceImpl paymentCategoryService;

    @Test
    void getAllCategories_shouldReturnListOfCategories() {
        PaymentCategory category1 = PaymentCategory.builder().id(1L).name("Jedzenie").build();
        PaymentCategory category2 = PaymentCategory.builder().id(2L).name("Transport").build();

        List<PaymentCategory> mockCategories = Arrays.asList(category1, category2);

        when(paymentCategoryRepository.findAll()).thenReturn(mockCategories);

        List<PaymentCategoryDto> result = paymentCategoryService.getAllPaymentCategories();

        assertEquals(2, result.size());
        assertEquals("Jedzenie", result.get(0).getName());
        assertEquals("Transport", result.get(1).getName());
        verify(paymentCategoryRepository, times(1)).findAll();
    }
}
