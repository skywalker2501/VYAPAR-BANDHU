package com.vyaparbandhu.domain.erp;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "erp_suppliers")
@Data
public class ErpSupplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Column(nullable = false)
    private String name;

    private String phone;
    private String categoryOffered;
}
