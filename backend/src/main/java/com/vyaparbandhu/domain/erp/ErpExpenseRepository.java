package com.vyaparbandhu.domain.erp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ErpExpenseRepository extends JpaRepository<ErpExpense, Long> {
    List<ErpExpense> findByUserId(Long userId);
}
