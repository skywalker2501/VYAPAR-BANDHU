package com.vyaparbandhu.domain.erp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ErpCustomerRepository extends JpaRepository<ErpCustomer, Long> {
    List<ErpCustomer> findByUserId(Long userId);
}
