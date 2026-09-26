package com.vyaparbandhu.domain.finance;

import com.vyaparbandhu.domain.finance.dto.FinanceResponseDto;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FinanceEngine {

    private static final String RULE_VERSION = "VyaparBandhu Rules v1.0 (Govt 2026)";

    /**
     * Determines Scheme Parameters based on project cost
     */
    private Map<String, Object> determineSchemeConfig(BigDecimal projectCost) {
        Map<String, Object> config = new HashMap<>();
        BigDecimal microThreshold = new BigDecimal("140000");

        if (projectCost.compareTo(microThreshold) <= 0) {
            config.put("scheme", "Micro Finance Scheme");
            config.put("maxLoan", new BigDecimal("125000"));
            config.put("financingRule", "up to 90%");
            config.put("interest", new BigDecimal("6.5"));
            config.put("tenureYears", 3);
            config.put("moratoriumMonths", 3);
        } else {
            config.put("scheme", "Term Loan Scheme (SME)");
            config.put("maxLoan", new BigDecimal("4500000"));
            config.put("financingRule", "up to 90%");
            config.put("interest", new BigDecimal("8.0"));
            config.put("tenureYears", 7);
            config.put("moratoriumMonths", 6);
        }
        return config;
    }

    /**
     * POST /api/finance/calculate
     * Project Cost = Available Margin / 10%
     */
    public FinanceResponseDto<BigDecimal> calculateProjectCost(BigDecimal availableMargin) {
        BigDecimal projectCost = availableMargin.divide(new BigDecimal("0.10"), 2, RoundingMode.HALF_UP);
        Map<String, Object> schemeConfig = determineSchemeConfig(projectCost);

        FinanceResponseDto<BigDecimal> response = new FinanceResponseDto<>();
        response.setInput(Map.of("availableMargin", availableMargin));
        response.setFormula("Project Cost = Available Margin / 10%");
        response.setResult(projectCost);
        response.setAssumptions("Beneficiary margin required is 10%. Scheme mapped uniquely to project size.");
        response.setScheme((String) schemeConfig.get("scheme"));
        response.setSourceRuleVersion(RULE_VERSION);
        return response;
    }

    /**
     * POST /api/finance/loan-needed
     * Maximum financing = 90% of eligible project cost
     * Loan = MIN(90% of project cost, scheme maximum)
     */
    public FinanceResponseDto<BigDecimal> calculateLoanNeeded(BigDecimal projectCost) {
        Map<String, Object> schemeConfig = determineSchemeConfig(projectCost);
        BigDecimal maxSchemeLoan = (BigDecimal) schemeConfig.get("maxLoan");

        BigDecimal ninetyPercent = projectCost.multiply(new BigDecimal("0.90")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal finalLoan = ninetyPercent.min(maxSchemeLoan);

        FinanceResponseDto<BigDecimal> response = new FinanceResponseDto<>();
        response.setInput(Map.of("projectCost", projectCost));
        response.setFormula("Loan = MIN(90% of eligible project cost, scheme maximum limit)");
        response.setResult(finalLoan);
        response.setAssumptions("Max financing is 90%. Gap must be filled by beneficiary margin.");
        response.setScheme((String) schemeConfig.get("scheme"));
        response.setSourceRuleVersion(RULE_VERSION);
        return response;
    }

    /**
     * POST /api/finance/emi
     * Standard Amortization Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
     */
    public FinanceResponseDto<BigDecimal> calculateEmi(BigDecimal loanAmount) {
        Map<String, Object> schemeConfig = determineSchemeConfig(
                loanAmount.divide(new BigDecimal("0.90"), 2, RoundingMode.HALF_UP));

        BigDecimal annualInterestRate = (BigDecimal) schemeConfig.get("interest");
        int tenureYears = (Integer) schemeConfig.get("tenureYears");
        int moratoriumMonths = (Integer) schemeConfig.get("moratoriumMonths");

        // Rate per month
        BigDecimal r = annualInterestRate.divide(new BigDecimal("100"), 10, RoundingMode.HALF_UP)
                .divide(new BigDecimal("12"), 10, RoundingMode.HALF_UP);
        // Effective months (excluding moratorium from principle reduction tenure)
        int n = (tenureYears * 12) - moratoriumMonths;

        // Math: (1+r)^n
        BigDecimal onePlusRToN = r.add(BigDecimal.ONE).pow(n);

        // Numerator: P * r * (1+r)^n
        BigDecimal numerator = loanAmount.multiply(r).multiply(onePlusRToN);

        // Denominator: (1+r)^n - 1
        BigDecimal denominator = onePlusRToN.subtract(BigDecimal.ONE);

        BigDecimal emi = numerator.divide(denominator, 2, RoundingMode.HALF_UP);

        FinanceResponseDto<BigDecimal> response = new FinanceResponseDto<>();
        response.setInput(Map.of("loanAmount", loanAmount, "interestRate", annualInterestRate, "tenureYears",
                tenureYears, "moratoriumMonths", moratoriumMonths));
        response.setFormula("EMI = [P x R x (1+R)^N]/[(1+R)^N-1]  (where N excludes moratorium months)");
        response.setResult(emi);
        response.setAssumptions(
                "Principle repayment starts strictly AFTER the " + moratoriumMonths + " month moratorium.");
        response.setScheme((String) schemeConfig.get("scheme"));
        response.setSourceRuleVersion(RULE_VERSION);
        return response;
    }

    /**
     * POST /api/finance/repayment-schedule
     */
    public FinanceResponseDto<List<Map<String, Object>>> generateSchedule(BigDecimal loanAmount, boolean isQuarterly) {
        BigDecimal emi = calculateEmi(loanAmount).getResult();
        Map<String, Object> schemeConfig = determineSchemeConfig(
                loanAmount.divide(new BigDecimal("0.90"), 2, RoundingMode.HALF_UP));

        BigDecimal annualInterestRate = (BigDecimal) schemeConfig.get("interest");
        int tenureYears = (Integer) schemeConfig.get("tenureYears");
        int moratoriumMonths = (Integer) schemeConfig.get("moratoriumMonths");

        BigDecimal r = annualInterestRate.divide(new BigDecimal("100"), 10, RoundingMode.HALF_UP)
                .divide(new BigDecimal("12"), 10, RoundingMode.HALF_UP);

        List<Map<String, Object>> schedule = new ArrayList<>();
        BigDecimal balance = loanAmount;

        int totalMonths = tenureYears * 12;
        BigDecimal quarterlyInstallment = BigDecimal.ZERO;

        for (int month = 1; month <= totalMonths; month++) {
            BigDecimal interestPayment = balance.multiply(r).setScale(2, RoundingMode.HALF_UP);
            BigDecimal principalPayment = BigDecimal.ZERO;

            if (month > moratoriumMonths) {
                principalPayment = emi.subtract(interestPayment).setScale(2, RoundingMode.HALF_UP);
                balance = balance.subtract(principalPayment).setScale(2, RoundingMode.HALF_UP);
            }

            if (balance.compareTo(BigDecimal.ZERO) < 0)
                balance = BigDecimal.ZERO;

            if (isQuarterly) {
                quarterlyInstallment = quarterlyInstallment.add(interestPayment).add(principalPayment);
                if (month % 3 == 0 || month == totalMonths) {
                    Map<String, Object> row = new HashMap<>();
                    row.put("quarterEndMonth", month);
                    row.put("installment", quarterlyInstallment);
                    row.put("balance", balance);
                    schedule.add(row);
                    quarterlyInstallment = BigDecimal.ZERO;
                }
            } else {
                Map<String, Object> row = new HashMap<>();
                row.put("month", month);
                row.put("principal", principalPayment);
                row.put("interest", interestPayment);
                row.put("balance", balance);
                schedule.add(row);
            }
        }

        FinanceResponseDto<List<Map<String, Object>>> response = new FinanceResponseDto<>();
        response.setInput(Map.of("loanAmount", loanAmount, "isQuarterly", isQuarterly));
        response.setFormula(
                isQuarterly ? "Aggregated quarterly sum of P+I" : "Standard Amortization monthly schedule mapping P+I");
        response.setResult(schedule);
        response.setAssumptions(moratoriumMonths
                + " month moratorium applied (only interest active or deferred based on specific local rules).");
        response.setScheme((String) schemeConfig.get("scheme"));
        response.setSourceRuleVersion(RULE_VERSION);
        return response;
    }

    /**
     * POST /api/finance/break-even
     */
    public FinanceResponseDto<BigDecimal> calculateBreakEven(BigDecimal fixedCosts, BigDecimal salesPricePerUnit,
            BigDecimal variableCostPerUnit) {
        BigDecimal contributionMargin = salesPricePerUnit.subtract(variableCostPerUnit);

        BigDecimal breakEvenUnits = BigDecimal.ZERO;
        if (contributionMargin.compareTo(BigDecimal.ZERO) > 0) {
            breakEvenUnits = fixedCosts.divide(contributionMargin, 0, RoundingMode.CEILING);
        }

        FinanceResponseDto<BigDecimal> response = new FinanceResponseDto<>();
        response.setInput(Map.of("fixedCosts", fixedCosts, "salesPricePerUnit", salesPricePerUnit,
                "variableCostPerUnit", variableCostPerUnit));
        // Safe assumption scheme doesn't explicitly modify local break-even formula,
        // but standardizes result
        response.setFormula("Break-Even Units = Fixed Costs / (Sales Price - Variable Cost)");
        response.setResult(breakEvenUnits);
        response.setAssumptions("Requires constant unit variable cost and fixed overhead scale.");
        response.setScheme("General Unit Economics");
        response.setSourceRuleVersion(RULE_VERSION);
        return response;
    }
}
