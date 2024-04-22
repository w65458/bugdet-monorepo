package com.example.budget.controller;

import com.example.budget.dto.ReportDto;
import com.example.budget.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/generate")
    public ResponseEntity<ReportDto> generateMonthlyReport(@RequestParam Long userId,
                                                           @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate month) {
        ReportDto report = reportService.generateMonthlyReport(userId, month);
        return new ResponseEntity<>(report, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReportDto>> getReportsByUserId(@PathVariable Long userId) {
        List<ReportDto> reports = reportService.getReportsByUserId(userId);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

}
