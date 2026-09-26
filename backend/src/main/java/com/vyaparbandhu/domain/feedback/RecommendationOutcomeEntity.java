package com.vyaparbandhu.domain.feedback;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "recommendation_outcomes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationOutcomeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Identities
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "business_id")
    private Long businessId;

    // Context Filters (crucial for Admin Analytics)
    @Column(name = "business_type")
    private String businessType;

    @Column(name = "location")
    private String location;

    // Insight Detail
    @Column(columnDefinition = "TEXT")
    private String recommendation;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "outcome_date")
    private LocalDateTime outcomeDate;

    // User Response
    private boolean accepted;
    private boolean implemented;

    // Quantifiable Real-World Impacts
    @Column(name = "sales_before")
    private BigDecimal salesBefore;

    @Column(name = "sales_after")
    private BigDecimal salesAfter;

    @Column(name = "profit_before")
    private BigDecimal profitBefore;

    @Column(name = "profit_after")
    private BigDecimal profitAfter;

    @Column(name = "customer_change")
    private Integer customerChange;

    // Qualitative User Sentiment
    private Integer rating;

    @Column(name = "user_feedback", columnDefinition = "TEXT")
    private String userFeedback;
}
