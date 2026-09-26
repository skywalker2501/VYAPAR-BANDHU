package com.vyaparbandhu.domain.feedback;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationOutcomeRepository extends JpaRepository<RecommendationOutcomeEntity, Long> {
    List<RecommendationOutcomeEntity> findByBusinessTypeAndLocation(String businessType, String location);

    List<RecommendationOutcomeEntity> findByImplementedTrue();
}
