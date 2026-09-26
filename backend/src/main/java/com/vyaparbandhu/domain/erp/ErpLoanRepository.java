package com.vyaparbandhu.domain.erp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ErpLoanRepository extends JpaRepository<ErpLoan, Long> {
    List<ErpLoan> findByUserId(Long userId);
}
