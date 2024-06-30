package com.example.budget;

import com.example.budget.dto.BudgetDto;
import com.example.budget.dto.TransactionDto;
import com.example.budget.dto.GoalDto;
import com.example.budget.entity.User;
import com.example.budget.entity.PaymentCategory;
import com.example.budget.repository.UserRepository;
import com.example.budget.repository.PaymentCategoryRepository;
import com.example.budget.service.BudgetService;
import com.example.budget.service.TransactionService;
import com.example.budget.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private static final String WYDATKI = "Wydatki";

    private static final String PRZYCHODY = "Przychody";

    private final UserRepository userRepository;

    private final PaymentCategoryRepository paymentCategoryRepository;

    private final BudgetService budgetService;

    private final TransactionService transactionService;

    private final GoalService goalService;

    @Override
    public void run(String... args) throws Exception {
        User user1 = User.builder()
                .username("Robert")
                .password("haslo123")
                .email("robert_kowalski@example.com")
                .build();
        userRepository.save(user1);

        User user2 = User.builder()
                .username("Anna")
                .password("pass")
                .email("anna_nowak@example.com")
                .build();
        userRepository.save(user2);

        User user3 = User.builder()
                .username("Adam")
                .password("sekret")
                .email("adam_wisniewski@example.com")
                .build();
        userRepository.save(user3);

        PaymentCategory foodCategory = PaymentCategory.builder()
                .name("Jedzenie")
                .build();
        paymentCategoryRepository.save(foodCategory);

        PaymentCategory electronicsCategory = PaymentCategory.builder()
                .name("Elektronika")
                .build();
        paymentCategoryRepository.save(electronicsCategory);

        PaymentCategory subscriptionCategory = PaymentCategory.builder()
                .name("Subskrypcje")
                .build();
        paymentCategoryRepository.save(subscriptionCategory);

        PaymentCategory transportCategory = PaymentCategory.builder()
                .name("Transport")
                .build();
        paymentCategoryRepository.save(transportCategory);

        PaymentCategory entertainmentCategory = PaymentCategory.builder()
                .name("Rozrywka")
                .build();
        paymentCategoryRepository.save(entertainmentCategory);

        PaymentCategory salaryCategory = PaymentCategory.builder()
                .name("Wynagrodzenie")
                .build();
        paymentCategoryRepository.save(salaryCategory);

        PaymentCategory freelanceCategory = PaymentCategory.builder()
                .name("Freelance")
                .build();
        paymentCategoryRepository.save(freelanceCategory);

        BudgetDto budget1 = new BudgetDto();
        budget1.setUserId(user1.getId());
        budget1.setCategoryName(foodCategory.getName());
        budget1.setLimitAmount(1000.00);
        budgetService.createBudget(budget1);

        BudgetDto budget2 = new BudgetDto();
        budget2.setUserId(user1.getId());
        budget2.setCategoryName(subscriptionCategory.getName());
        budget2.setLimitAmount(200.00);
        budgetService.createBudget(budget2);

        BudgetDto budget3 = new BudgetDto();
        budget3.setUserId(user2.getId());
        budget3.setCategoryName(electronicsCategory.getName());
        budget3.setLimitAmount(1500.00);
        budgetService.createBudget(budget3);

        BudgetDto budget4 = new BudgetDto();
        budget4.setUserId(user2.getId());
        budget4.setCategoryName(transportCategory.getName());
        budget4.setLimitAmount(300.00);
        budgetService.createBudget(budget4);

        BudgetDto budget5 = new BudgetDto();
        budget5.setUserId(user3.getId());
        budget5.setCategoryName(entertainmentCategory.getName());
        budget5.setLimitAmount(500.00);
        budgetService.createBudget(budget5);

        TransactionDto transaction1 = new TransactionDto();
        transaction1.setUserId(user1.getId());
        transaction1.setCategoryName(foodCategory.getName());
        transaction1.setAmount(150.00);
        transaction1.setType("Wydatki");
        transaction1.setDescription("Zakupy spożywcze w Biedronce");
        transaction1.setTransactionDate(LocalDate.now());
        transactionService.createTransaction(transaction1);

        TransactionDto transaction2 = new TransactionDto();
        transaction2.setUserId(user1.getId());
        transaction2.setCategoryName(subscriptionCategory.getName());
        transaction2.setAmount(40.00);
        transaction2.setType("Wydatki");
        transaction2.setDescription("Subskrypcja Netflix");
        transaction2.setTransactionDate(LocalDate.now());
        transactionService.createTransaction(transaction2);

        TransactionDto transaction3 = new TransactionDto();
        transaction3.setUserId(user2.getId());
        transaction3.setCategoryName(electronicsCategory.getName());
        transaction3.setAmount(200.00);
        transaction3.setType("Wydatki");
        transaction3.setDescription("Zakup słuchawek");
        transaction3.setTransactionDate(LocalDate.now());
        transactionService.createTransaction(transaction3);

        TransactionDto transaction4 = new TransactionDto();
        transaction4.setUserId(user2.getId());
        transaction4.setCategoryName(transportCategory.getName());
        transaction4.setAmount(100.00);
        transaction4.setType("Wydatki");
        transaction4.setDescription("Bilet miesięczny na komunikację miejską");
        transaction4.setTransactionDate(LocalDate.now());
        transactionService.createTransaction(transaction4);

        TransactionDto transaction5 = new TransactionDto();
        transaction5.setUserId(user3.getId());
        transaction5.setCategoryName(entertainmentCategory.getName());
        transaction5.setAmount(60.00);
        transaction5.setType(WYDATKI);
        transaction5.setDescription("Bilet do kina");
        transaction5.setTransactionDate(LocalDate.now());
        transactionService.createTransaction(transaction5);

        TransactionDto income1 = new TransactionDto();
        income1.setUserId(user1.getId());
        income1.setCategoryName(salaryCategory.getName());
        income1.setAmount(5000.00);
        income1.setType(PRZYCHODY);
        income1.setDescription("Wynagrodzenie za pracę");
        income1.setTransactionDate(LocalDate.now().minusDays(10));
        transactionService.createTransaction(income1);

        TransactionDto income2 = new TransactionDto();
        income2.setUserId(user1.getId());
        income2.setCategoryName(freelanceCategory.getName());
        income2.setAmount(800.00);
        income2.setType("Przychody");
        income2.setDescription("Projekt freelance - strona internetowa");
        income2.setTransactionDate(LocalDate.now().minusDays(5));
        transactionService.createTransaction(income2);

        TransactionDto income3 = new TransactionDto();
        income3.setUserId(user2.getId());
        income3.setCategoryName(salaryCategory.getName());
        income3.setAmount(4500.00);
        income3.setType("Przychody");
        income3.setDescription("Wynagrodzenie za pracę");
        income3.setTransactionDate(LocalDate.now().minusDays(10));
        transactionService.createTransaction(income3);

        TransactionDto income4 = new TransactionDto();
        income4.setUserId(user2.getId());
        income4.setCategoryName(freelanceCategory.getName());
        income4.setAmount(1200.00);
        income4.setType("Przychody");
        income4.setDescription("Projekt freelance - aplikacja mobilna");
        income4.setTransactionDate(LocalDate.now().minusDays(3));
        transactionService.createTransaction(income4);

        TransactionDto income5 = new TransactionDto();
        income5.setUserId(user3.getId());
        income5.setCategoryName(salaryCategory.getName());
        income5.setAmount(4800.00);
        income5.setType("Przychody");
        income5.setDescription("Wynagrodzenie za pracę");
        income5.setTransactionDate(LocalDate.now().minusDays(10));
        transactionService.createTransaction(income5);

        TransactionDto income6 = new TransactionDto();
        income6.setUserId(user3.getId());
        income6.setCategoryName(freelanceCategory.getName());
        income6.setAmount(600.00);
        income6.setType("Przychody");
        income6.setDescription("Projekt freelance - grafika");
        income6.setTransactionDate(LocalDate.now().minusDays(7));
        transactionService.createTransaction(income6);

        GoalDto goal1 = new GoalDto();
        goal1.setUserId(user1.getId());
        goal1.setName("Wakacje w Turcji");
        goal1.setCurrentValue(1000.00);
        goal1.setTargetAmount(3000.00);
        goal1.setTargetDate(LocalDate.now().plusMonths(6));
        goalService.createGoal(goal1);

        GoalDto goal2 = new GoalDto();
        goal2.setUserId(user2.getId());
        goal2.setName("iPhone 16");
        goal2.setCurrentValue(2500.00);
        goal2.setTargetAmount(4500.00);
        goal2.setTargetDate(LocalDate.now().plusMonths(12));
        goalService.createGoal(goal2);

        GoalDto goal3 = new GoalDto();
        goal3.setUserId(user2.getId());
        goal3.setName("DJI Mini 4 PRO");
        goal3.setCurrentValue(500.00);
        goal3.setTargetAmount(4000.00);
        goal3.setTargetDate(LocalDate.now().plusMonths(3));
        goalService.createGoal(goal3);
    }
}

