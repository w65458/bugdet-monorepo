package com.example.budget.controller;

import com.example.budget.dto.ReportDto;
import com.example.budget.service.ReportService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ReportController.class)
class ReportControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReportService reportService;

    @Autowired
    private ObjectMapper objectMapper;

    private ReportDto reportDto;

    @BeforeEach
    void setUp() {
        reportDto = new ReportDto();
        reportDto.setUserId(1L);
        reportDto.setMonth(LocalDate.of(2023, 6, 1));
        reportDto.setTotalIncome(5000.0);
        reportDto.setTotalExpense(2000.0);
    }

    @Test
    void generateMonthlyReport_ShouldReturnCreatedReport() throws Exception {
        when(reportService.generateMonthlyReport(anyLong(), any(LocalDate.class))).thenReturn(reportDto);

        mockMvc.perform(post("/api/reports/generate")
                        .param("userId", "1")
                        .param("month", "2023-06-01"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.userId").value(reportDto.getUserId()))
                .andExpect(jsonPath("$.month").value(reportDto.getMonth().toString()))
                .andExpect(jsonPath("$.totalIncome").value(reportDto.getTotalIncome()))
                .andExpect(jsonPath("$.totalExpense").value(reportDto.getTotalExpense()));

        verify(reportService, times(1)).generateMonthlyReport(anyLong(), any(LocalDate.class));
    }

    @Test
    void getReportsByUserId_ShouldReturnListOfReports() throws Exception {
        List<ReportDto> reports = Arrays.asList(reportDto);
        when(reportService.getReportsByUserId(anyLong())).thenReturn(reports);

        mockMvc.perform(get("/api/reports/user/{userId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].userId").value(reportDto.getUserId()))
                .andExpect(jsonPath("$[0].month").value(reportDto.getMonth().toString()))
                .andExpect(jsonPath("$[0].totalIncome").value(reportDto.getTotalIncome()))
                .andExpect(jsonPath("$[0].totalExpense").value(reportDto.getTotalExpense()));

        verify(reportService, times(1)).getReportsByUserId(anyLong());
    }

    @Test
    void generateCsvReport_ShouldReturnCsvFile() throws Exception {
        byte[] csvContent = "id,userId,month,totalIncome,totalExpenses\n1,1,2023-06-01,5000.0,2000.0".getBytes();
        when(reportService.generateCsvReport(anyLong(), any(LocalDate.class))).thenReturn(csvContent);

        mockMvc.perform(get("/api/reports/generate/csv")
                        .param("userId", "1")
                        .param("month", "2023-06-01"))
                .andExpect(status().isOk())
                .andExpect(header().string(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"report.csv\""))
                .andExpect(content().contentType("text/csv"))
                .andReturn();

        verify(reportService, times(1)).generateCsvReport(anyLong(), any(LocalDate.class));
    }

    @Test
    void generatePdfReport_ShouldReturnPdfFile() throws Exception {
        byte[] pdfContent = new byte[]{1, 2, 3, 4};
        when(reportService.generatePdfReport(anyLong(), any(LocalDate.class))).thenReturn(pdfContent);

        mockMvc.perform(get("/api/reports/generate/pdf")
                        .param("userId", "1")
                        .param("month", "2023-06-01"))
                .andExpect(status().isOk())
                .andExpect(header().string(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"report.pdf\""))
                .andExpect(content().contentType(MediaType.APPLICATION_PDF))
                .andReturn();

        verify(reportService, times(1)).generatePdfReport(anyLong(), any(LocalDate.class));
    }
}
