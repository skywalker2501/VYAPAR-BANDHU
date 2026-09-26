package com.vyaparbandhu.domain.business;

import com.vyaparbandhu.domain.user.UserEntity;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@Entity
@Table(name = "business_profiles")
public class BusinessProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "category_key", nullable = false, length = 50)
    private String categoryKey;

    @Column(name = "business_type", length = 20)
    private String businessType;

    @Column(name = "own_capital", precision = 15, scale = 2)
    private BigDecimal ownCapital;

    @Column(length = 20)
    private String status = "ACTIVE";
}
