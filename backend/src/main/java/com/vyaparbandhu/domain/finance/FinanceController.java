package com.vyaparbandhu.domain.finance;

import com.vyaparbandhu.domain.finance.dto.FinanceResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/finance")
public class FinanceController {

    private final FinanceEngine financeEngine;
    private final LoanNeedEngine loanNeedEngine;

    public FinanceController(FinanceEngine financeEngine, LoanNeedEngine loanNeedEngine) {
        this.financeEngine = financeEngine;
        this.loanNeedEngine = loanNeedEngine;
    }

    @PostMapping("/calculate")
    public ResponseEntity<FinanceResponseDto<BigDecimal>> calculateProjectCost(
            @RequestBody Map<String, String> request) {
        BigDecimal availableMargin = new BigDecimal(request.getOrDefault("availableMargin", "0"));
        return ResponseEntity.ok(financeEngine.calculateProjectCost(availableMargin));
    }

    @PostMapping("/loan-needed")
    public ResponseEntity<FinanceResponseDto<BigDecimal>> calculateLoanNeeded(
            @RequestBody Map<String, String> request) {
        BigDecimal projectCost = new BigDecimal(request.getOrDefault("projectCost", "0"));
        return ResponseEntity.ok(financeEngine.calculateLoanNeeded(projectCost));
    }

    @PostMapping("/emi")
    public ResponseEntity<FinanceResponseDto<BigDecimal>> calculateEmi(@RequestBody Map<String, String> request) {
        BigDecimal loanAmount = new BigDecimal(request.getOrDefault("loanAmount", "0"));
        return ResponseEntity.ok(financeEngine.calculateEmi(loanAmount));
    }

    @PostMapping("/repayment-schedule")
    public ResponseEntity<FinanceResponseDto<List<Map<String, Object>>>> generateRepaymentSchedule(
            @RequestBody Map<String, String> request) {
        BigDecimal loanAmount = new BigDecimal(request.getOrDefault("loanAmount", "0"));
        boolean isQuarterly = Boolean.parseBoolean(request.getOrDefault("isQuarterly", "false"));
        return ResponseEntity.ok(financeEngine.generateSchedule(loanAmount, isQuarterly));
    }

    @PostMapping("/break-even")
    public ResponseEntity<FinanceResponseDto<BigDecimal>> calculateBreakEven(@RequestBody Map<String, String> request) {
        BigDecimal fixedCosts = new BigDecimal(request.getOrDefault("fixedCosts", "0"));
        BigDecimal salesPrice = new BigDecimal(request.getOrDefault("salesPrice", "0"));
        BigDecimal variableCost = new BigDecimal(request.getOrDefault("variableCost", "0"));

        return ResponseEntity.ok(financeEngine.calculateBreakEven(fixedCosts, salesPrice, variableCost));
    }

    @PostMapping("/loan-necessity")
    public ResponseEntity<com.vyaparbandhu.domain.finance.dto.LoanNecessityResponse> evaluateLoanNecessity(
            @RequestBody com.vyaparbandhu.domain.finance.dto.LoanNecessityRequest request) {
        return ResponseEntity.ok(loanNeedEngine.evaluateLoanNecessity(request));
    }
}
