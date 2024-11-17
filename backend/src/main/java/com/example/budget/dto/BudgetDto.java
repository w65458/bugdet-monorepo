package com.example.budget.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BudgetDto {
    @JsonProperty
    private Long id;
    @JsonProperty
    private Long userId;
    @JsonProperty
    private Double limitAmount;
    @JsonProperty
    private String categoryName;
}
