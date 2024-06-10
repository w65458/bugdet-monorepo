package com.example.budget.controller;

import com.example.budget.dto.ReportDto;
import com.example.budget.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
@Tag(name = "Report", description = "APIs for managing and generating reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Operation(summary = "Generate a monthly report")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Report generated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ReportDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping("/generate")
    public ResponseEntity<ReportDto> generateMonthlyReport(@RequestParam Long userId,
                                                           @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate month) {
        ReportDto report = reportService.generateMonthlyReport(userId, month);
        return new ResponseEntity<>(report, HttpStatus.CREATED);
    }

    @Operation(summary = "Get all reports for a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reports retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ReportDto.class))),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReportDto>> getReportsByUserId(@PathVariable Long userId) {
        List<ReportDto> reports = reportService.getReportsByUserId(userId);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    @Operation(summary = "Generate a CSV report")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "CSV report generated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @GetMapping("/generate/csv")
    public ResponseEntity<byte[]> generateCsvReport(@RequestParam Long userId, @RequestParam LocalDate month) {
        byte[] csvReport = reportService.generateCsvReport(userId, month);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"report.csv\"")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csvReport);
    }

    @Operation(summary = "Generate a PDF report")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "PDF report generated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @GetMapping("/generate/pdf")
    public ResponseEntity<byte[]> generatePdfReport(@RequestParam Long userId, @RequestParam LocalDate month) {
        byte[] pdfReport = reportService.generatePdfReport(userId, month);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"report.pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfReport);
    }
}
