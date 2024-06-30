package com.example.budget.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDto {
    @JsonProperty
    private Long id;
    @JsonProperty
    private Long userId;
    @JsonProperty
    private String categoryName;
    @JsonProperty
    private Double amount;
    @JsonProperty
    private String type;
    @JsonProperty
    private String description;
    @JsonProperty
    private LocalDate transactionDate;
}
