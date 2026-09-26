package com.vyaparbandhu.domain.scheme;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GovernmentSchemeRepository extends JpaRepository<GovernmentSchemeEntity, UUID> {

    // Explicit JPA queries for structured matching without LLM inference
    List<GovernmentSchemeEntity> findByCategoryIgnoreCase(String category);

    List<GovernmentSchemeEntity> findByStatus(String status);
}
