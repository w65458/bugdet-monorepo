package com.example.budget.dto.mapper;

import com.example.budget.dto.TransactionDto;
import com.example.budget.entity.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TransactionMapper {

    TransactionMapper INSTANCE = Mappers.getMapper(TransactionMapper.class);

    TransactionDto transactionToTransactionDto(Transaction transaction);
    Transaction transactionDtoToTransaction(TransactionDto transactionDto);
}
