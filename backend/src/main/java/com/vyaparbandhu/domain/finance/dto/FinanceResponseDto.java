package com.vyaparbandhu.domain.finance.dto;

import lombok.Data;
import java.util.Map;

@Data
public class FinanceResponseDto<T> {
    private Map<String, Object> input;
    private String formula;
    private T result;
    private String assumptions;
    private String scheme;
    private String sourceRuleVersion;
}
