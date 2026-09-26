package com.vyaparbandhu.domain.erp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ErpSupplierRepository extends JpaRepository<ErpSupplier, Long> {
    List<ErpSupplier> findByUserId(Long userId);
}
