package com.example.budget.dto.mapper;

import com.example.budget.dto.PaymentCategoryDto;
import com.example.budget.entity.PaymentCategory;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PaymentCategoryMapper {

    PaymentCategoryMapper INSTANCE = Mappers.getMapper(PaymentCategoryMapper.class);

    PaymentCategoryDto paymentCategoryToPaymentCategoryDto(PaymentCategory paymentCategory);
    PaymentCategory paymentCategoryDtoToPaymentCategory(PaymentCategoryDto paymentCategoryDto);
}