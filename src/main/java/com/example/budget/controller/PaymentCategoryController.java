package com.example.budget.controller;

import com.example.budget.dto.PaymentCategoryDto;
import com.example.budget.service.PaymentCategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@Tag(name = "Categories", description = "APIs for managing payment categories")
public class PaymentCategoryController {

    @Autowired
    private PaymentCategoryService paymentCategoryService;

    @Operation(summary = "Get all payment categories")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categories retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = PaymentCategoryDto.class)))
    })
    @GetMapping()
    public ResponseEntity<List<PaymentCategoryDto>> getAllPaymentCategories() {
        List<PaymentCategoryDto> transactions = paymentCategoryService.getAllPaymentCategories();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
}
