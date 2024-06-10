package com.example.budget.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReportDto {
    @JsonProperty
    private Long userId;
    @JsonProperty
    private LocalDate month;
    @JsonProperty
    private Double totalIncome;
    @JsonProperty
    private Double totalExpense;
    @JsonProperty
    private List<TransactionDto> transactions;
}
