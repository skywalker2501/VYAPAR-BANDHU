package com.vyaparbandhu.domain.scheme;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class SchemeMatchRequest {
    private String businessType;
    private String locationState;
    private String locationDistrict;
    private BigDecimal projectCost;
    private BigDecimal availableMargin;
    private String businessStage;
    private String category;
}
