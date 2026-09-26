package com.vyaparbandhu.domain.erp;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "erp_expenses")
@Data
public class ErpExpense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long supplierId; // Optional link

    @Column(nullable = false)
    private BigDecimal amount;

    private String category;
    private String description;

    @Column(nullable = false)
    private LocalDateTime transactionDate;
}
