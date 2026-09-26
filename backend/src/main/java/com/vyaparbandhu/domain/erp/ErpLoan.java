package com.vyaparbandhu.domain.erp;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "erp_loans")
@Data
public class ErpLoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String lenderName;

    @Column(nullable = false)
    private BigDecimal principalAmount;

    private BigDecimal outstandingBalance;
    private BigDecimal monthlyEmi;

    private LocalDate nextDueDate;
}
