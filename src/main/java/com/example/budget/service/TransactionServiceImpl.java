package com.example.budget.service;

import com.example.budget.dto.TransactionDto;
import com.example.budget.dto.mapper.TransactionMapper;
import com.example.budget.entity.PaymentCategory;
import com.example.budget.entity.Transaction;
import com.example.budget.entity.User;
import com.example.budget.repository.PaymentCategoryRepository;
import com.example.budget.repository.TransactionRepository;
import com.example.budget.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;

    private final UserRepository userRepository;

    private final PaymentCategoryRepository paymentCategoryRepository;

    @Override
    public TransactionDto createTransaction(TransactionDto transactionDto) {
        Optional<User> user = userRepository.findById(transactionDto.getUserId());
        Optional<PaymentCategory> category = paymentCategoryRepository.findByNameIgnoreCase(transactionDto.getCategoryName());

        if (user.isPresent() && category.isPresent()) {
            Transaction transaction = Transaction.builder()
                    .user(user.get())
                    .category(category.get())
                    .amount(transactionDto.getAmount())
                    .type(transactionDto.getType())
                    .description(transactionDto.getDescription())
                    .transactionDate(transactionDto.getTransactionDate())
                    .build();
            Transaction savedTransaction = transactionRepository.save(transaction);
            return TransactionMapper.INSTANCE.transactionToTransactionDto(savedTransaction);
        } else {
            throw new RuntimeException("User or Category not found");
        }
    }

    @Override
    public List<TransactionDto> getAllTransactionsByUserId(Long userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);

        return transactions.stream()
                .map(TransactionMapper.INSTANCE::transactionToTransactionDto)
                .collect(Collectors.toList());
    }
}
