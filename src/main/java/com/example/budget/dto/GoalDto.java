package com.example.budget.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GoalDto {
    @JsonProperty
    private Long id;
    @JsonProperty
    private Long userId;
    @JsonProperty
    private String name;
    @JsonProperty
    private Double currentValue;
    @JsonProperty
    private Double targetAmount;
    @JsonProperty
    private LocalDate targetDate;
}
