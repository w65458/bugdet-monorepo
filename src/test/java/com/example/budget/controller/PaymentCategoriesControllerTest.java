package com.example.budget.controller;

import com.example.budget.dto.PaymentCategoryDto;
import com.example.budget.service.PaymentCategoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PaymentCategoryController.class)
class PaymentCategoriesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PaymentCategoryService paymentCategoryService;

    private PaymentCategoryDto paymentCategoryDto;

    @BeforeEach
    void setUp() {
        paymentCategoryDto = new PaymentCategoryDto();
        paymentCategoryDto.setId(1L);
        paymentCategoryDto.setName("Podatki");
    }

    @Test
    void getAllPaymentCategories_ShouldReturnListOfPaymentCategories() throws Exception {
        List<PaymentCategoryDto> categories = Arrays.asList(paymentCategoryDto);
        when(paymentCategoryService.getAllPaymentCategories()).thenReturn(categories);

        mockMvc.perform(get("/api/categories", 1L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(paymentCategoryDto.getId()))
                .andExpect(jsonPath("$[0].name").value(paymentCategoryDto.getName()));

        verify(paymentCategoryService, times(1)).getAllPaymentCategories();
    }
}
