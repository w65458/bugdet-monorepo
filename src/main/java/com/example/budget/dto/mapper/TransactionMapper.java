package com.example.budget.dto.mapper;

import com.example.budget.dto.TransactionDto;
import com.example.budget.entity.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TransactionMapper {

    TransactionMapper INSTANCE = Mappers.getMapper(TransactionMapper.class);

    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(source = "user.id", target = "userId")
    TransactionDto transactionToTransactionDto(Transaction transaction);

    @Mapping(source = "categoryName", target = "category.name")
    @Mapping(source = "userId", target = "user.id")
    Transaction transactionDtoToTransaction(TransactionDto transactionDto);
}
