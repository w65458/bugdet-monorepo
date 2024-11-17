package com.example.budget.service;

import com.example.budget.dto.PaymentCategoryDto;
import com.example.budget.dto.mapper.PaymentCategoryMapper;
import com.example.budget.repository.PaymentCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentCategoryServiceImpl implements PaymentCategoryService {

    private final PaymentCategoryRepository paymentCategoryRepository;

    public List<PaymentCategoryDto> getAllPaymentCategories() {
        return paymentCategoryRepository.findAll().stream()
                .map(PaymentCategoryMapper.INSTANCE::paymentCategoryToPaymentCategoryDto)
                .collect(Collectors.toList());
    }
}
