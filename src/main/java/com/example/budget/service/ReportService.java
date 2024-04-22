package com.example.budget.service;

import com.example.budget.dto.ReportDto;

import java.time.LocalDate;
import java.util.List;

public interface ReportService {
    ReportDto generateMonthlyReport(Long userId, LocalDate month);
    List<ReportDto> getReportsByUserId(Long userId);
}
