package com.vyaparbandhu.domain.erp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ErpSaleRepository extends JpaRepository<ErpSale, Long> {
    List<ErpSale> findByUserId(Long userId);
}
