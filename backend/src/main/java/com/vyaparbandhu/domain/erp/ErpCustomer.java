package com.vyaparbandhu.domain.erp;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "erp_customers")
@Data
public class ErpCustomer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Column(nullable = false)
    private String name;

    private String phone;
    private String email;
    private String location;
}
