package com.vyaparbandhu.domain.scheme;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "government_schemes")
public class GovernmentSchemeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "scheme_name", nullable = false, length = 255)
    private String schemeName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 100)
    private String category;

    @Column(name = "business_types", length = 255)
    private String businessTypes;

    @Column(length = 100)
    private String state;

    @Column(length = 100)
    private String district;

    @Column(name = "min_project_cost", precision = 15, scale = 2)
    private BigDecimal minProjectCost;

    @Column(name = "max_project_cost", precision = 15, scale = 2)
    private BigDecimal maxProjectCost;

    @Column(name = "loan_percentage", precision = 5, scale = 2)
    private BigDecimal loanPercentage;

    @Column(name = "max_loan", precision = 15, scale = 2)
    private BigDecimal maxLoan;

    @Column(name = "interest_rate", length = 50)
    private String interestRate;

    @Column(length = 50)
    private String tenure;

    @Column(length = 50)
    private String moratorium;

    // Treat as raw JSON string via JPA (Jackson handles parsing implicitly at
    // Controller layer)
    @Column(columnDefinition = "JSONB")
    private String eligibility;

    @Column(name = "required_documents", columnDefinition = "JSONB")
    private String requiredDocuments;

    @Column(columnDefinition = "JSONB")
    private String benefits;

    @Column(name = "application_process", columnDefinition = "TEXT")
    private String applicationProcess;

    @Column(name = "official_url", length = 500)
    private String officialUrl;

    @Column(name = "source_name", length = 100)
    private String sourceName;

    @Column(name = "source_url", length = 500)
    private String sourceUrl;

    @Column(name = "last_verified")
    private LocalDateTime lastVerified;

    @Column(length = 20)
    private String version;

    @Column(length = 50)
    private String status = "ACTIVE";
}
