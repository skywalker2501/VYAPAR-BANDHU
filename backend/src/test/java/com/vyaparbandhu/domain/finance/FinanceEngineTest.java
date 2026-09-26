package com.vyaparbandhu.domain.finance;

import com.vyaparbandhu.domain.finance.dto.FinanceResponseDto;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class FinanceEngineTest {

    private final FinanceEngine engine = new FinanceEngine();

    @Test
    public void testProjectCapacityCalculation() {
        // Own Capital = 10,000. Under the 10% margin rule, total capacity is 1,00,000.
        FinanceResponseDto<BigDecimal> result = engine.calculateProjectCost(new BigDecimal("10000.00"));

        assertEquals(0, new BigDecimal("100000.00").compareTo(result.getResult()),
                "Capacity must exactly equate to capital / 0.10");
        assertEquals("Micro Finance Scheme", result.getScheme(),
                "Must route to Micro Scheme for capacities <= 140000.");
    }

    @Test
    public void testLoanNeededLogic() {
        // Project Cost = 1,00,000. 90% Max is 90,000.
        FinanceResponseDto<BigDecimal> loanNeeded = engine.calculateLoanNeeded(new BigDecimal("100000.00"));
        assertEquals(0, new BigDecimal("90000.00").compareTo(loanNeeded.getResult()));
    }

    @Test
    public void testTerminalCapLogic() {
        // Project Cost = 1,00,00,000. (1 Cr).
        // System must cap financing to MAX scheme bounds (e.g., 45,00,000) instead of
        // linear 90% (90 lakh).
        FinanceResponseDto<BigDecimal> loanNeeded = engine.calculateLoanNeeded(new BigDecimal("10000000.00"));

        assertEquals(0, new BigDecimal("4500000.00").compareTo(loanNeeded.getResult()),
                "AI/Engine MUST never invent credit limits above the explicit government ₹45,00,000 bound.");
        assertEquals("Term Loan Scheme (SME)", loanNeeded.getScheme());
    }
}
