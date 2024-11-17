package com.example.budget.service;

import com.example.budget.dto.PaymentCategoryDto;

import java.util.List;

public interface PaymentCategoryService {
    List<PaymentCategoryDto> getAllPaymentCategories();
}
