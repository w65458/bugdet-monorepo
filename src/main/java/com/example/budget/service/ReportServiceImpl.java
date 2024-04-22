package com.example.budget.service;

import com.example.budget.dto.ReportDto;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    @Override
    public ReportDto generateMonthlyReport(Long userId, LocalDate month) {
        return null;
    }

    @Override
    public List<ReportDto> getReportsByUserId(Long userId) {
        return List.of();
    }

}
