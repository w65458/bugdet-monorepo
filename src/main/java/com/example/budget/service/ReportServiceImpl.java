package com.example.budget.service;

import com.example.budget.dto.ReportDto;
import com.example.budget.dto.TransactionDto;
import com.example.budget.entity.Transaction;
import com.example.budget.repository.TransactionRepository;
import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.opencsv.CSVWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final TransactionRepository transactionRepository;

    @Override
    public ReportDto generateMonthlyReport(Long userId, LocalDate month) {
        YearMonth yearMonth = YearMonth.from(month);
        List<Transaction> transactions = transactionRepository.findByUserIdAndTransactionDateBetween(
                userId, yearMonth.atDay(1), yearMonth.atEndOfMonth());
        double totalIncome = transactions.stream()
                .filter(t -> "Przychody".equals(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();
        double totalExpense = transactions.stream()
                .filter(t -> "Wydatki".equals(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();
        return ReportDto.builder()
                .userId(userId)
                .month(month)
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .transactions(transactions.stream()
                        .map(t -> new TransactionDto(
                                t.getId(),
                                t.getUser().getId(),
                                t.getCategory().getId(),
                                t.getAmount(),
                                t.getType(),
                                t.getDescription(),
                                t.getTransactionDate()
                        ))
                        .toList())
                .build();
    }

    @Override
    public List<ReportDto> getReportsByUserId(Long userId) {
        return List.of();
    }

    @Override
    public byte[] generateCsvReport(Long userId, LocalDate month) {
        YearMonth yearMonth = YearMonth.from(month);
        List<Transaction> transactions = transactionRepository.findByUserIdAndTransactionDateBetween(
                userId, yearMonth.atDay(1), yearMonth.atEndOfMonth());

        double totalIncome = transactions.stream()
                .filter(t -> "Przychody".equals(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();
        double totalExpense = transactions.stream()
                .filter(t -> "Wydatki".equals(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();
        double totalBalance = totalIncome - totalExpense;

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
             CSVWriter writer = new CSVWriter(new OutputStreamWriter(outputStream))) {
            writer.writeNext(new String[]{"Data", "Kategoria", "Typ", "Suma", "Opis"});
            for (Transaction transaction : transactions) {
                writer.writeNext(new String[]{
                        transaction.getTransactionDate().toString(),
                        transaction.getCategory().getName(),
                        transaction.getType(),
                        transaction.getAmount().toString(),
                        transaction.getDescription()
                });
            }
            writer.writeNext(new String[]{"", "", "Suma przychodow", String.valueOf(totalIncome), ""});
            writer.writeNext(new String[]{"", "", "Suma wydatkow", String.valueOf(totalExpense), ""});
            writer.writeNext(new String[]{"", "", "Saldo", String.valueOf(totalBalance), ""});
            writer.flush();
            return outputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Failed to generate CSV report", e);
        }
    }

    @Override
    public byte[] generatePdfReport(Long userId, LocalDate month) {
        YearMonth yearMonth = YearMonth.from(month);
        List<Transaction> transactions = transactionRepository.findByUserIdAndTransactionDateBetween(
                userId, yearMonth.atDay(1), yearMonth.atEndOfMonth());

        double totalIncome = transactions.stream()
                .filter(t -> "Przychody".equals(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();
        double totalExpense = transactions.stream()
                .filter(t -> "Wydatki".equals(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();
        double totalBalance = totalIncome - totalExpense;

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, outputStream);
            document.open();

            document.add(new Paragraph("Monthly report"));
            document.add(new Paragraph("User ID: " + userId));
            document.add(new Paragraph("Month: " + month));
            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(5);
            Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);

            PdfPCell headerCell;
            headerCell = new PdfPCell(new Phrase("Data", boldFont));
            table.addCell(headerCell);
            headerCell = new PdfPCell(new Phrase("Kategoria", boldFont));
            table.addCell(headerCell);
            headerCell = new PdfPCell(new Phrase("Typ", boldFont));
            table.addCell(headerCell);
            headerCell = new PdfPCell(new Phrase("Suma", boldFont));
            table.addCell(headerCell);
            headerCell = new PdfPCell(new Phrase("Opis", boldFont));
            table.addCell(headerCell);

            for (Transaction transaction : transactions) {
                table.addCell(transaction.getTransactionDate().toString());
                table.addCell(transaction.getCategory().getName());
                table.addCell(transaction.getType());
                table.addCell(transaction.getAmount().toString());
                table.addCell(transaction.getDescription());
            }

            document.add(table);

            document.add(Chunk.NEWLINE);
            document.add(new Paragraph("Suma przychodow: " + totalIncome));
            document.add(new Paragraph("Suma wydatkow: " + totalExpense));
            document.add(new Paragraph("Saldo: " + totalBalance));

            document.close();

            return outputStream.toByteArray();
        } catch (DocumentException | IOException e) {
            throw new RuntimeException("Failed to generate PDF report", e);
        }
    }

}
