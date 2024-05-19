package com.example.budget.dto.mapper;

import com.example.budget.dto.BudgetDto;
import com.example.budget.entity.Budget;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BudgetMapper {

    BudgetMapper INSTANCE = Mappers.getMapper(BudgetMapper.class);

    BudgetDto budgetToBudgetDto(Budget budget);
    Budget budgetDtoToBudget(BudgetDto dto);
}