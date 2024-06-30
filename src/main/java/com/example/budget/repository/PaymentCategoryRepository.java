package com.example.budget.repository;

import com.example.budget.entity.PaymentCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentCategoryRepository extends JpaRepository<PaymentCategory, Long> {
    Optional<PaymentCategory> findByNameIgnoreCase(String name);
}
