package com.vyaparbandhu.domain.erp;

import com.vyaparbandhu.domain.business.InventoryEntity;
import com.vyaparbandhu.domain.business.InventoryRepository;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ErpDashboardEngine {

        private final ErpSaleRepository saleRepository;
        private final ErpExpenseRepository expenseRepository;
        private final ErpLoanRepository loanRepository;
        private final InventoryRepository inventoryRepository;

        public ErpDashboardEngine(ErpSaleRepository saleRepository,
                        ErpExpenseRepository expenseRepository,
                        ErpLoanRepository loanRepository,
                        InventoryRepository inventoryRepository) {
                this.saleRepository = saleRepository;
                this.expenseRepository = expenseRepository;
                this.loanRepository = loanRepository;
                this.inventoryRepository = inventoryRepository;
        }

        @Data
        @Builder
        public static class ErpDashboardMetrics {
                private BigDecimal totalRevenue;
                private BigDecimal totalExpenses;
                private BigDecimal grossProfit;
                private BigDecimal netProfit;
                private BigDecimal cashBalance;
                private BigDecimal totalInventoryValue;
                private BigDecimal totalLoanOutstanding;
                private String monthlyGrowth; // Dummy for now
        }

        public ErpDashboardMetrics generateDashboard(Long userId) {
                List<ErpSale> sales = saleRepository.findByUserId(userId);
                List<ErpExpense> expenses = expenseRepository.findByUserId(userId);
                List<ErpLoan> loans = loanRepository.findByUserId(userId);
                List<InventoryEntity> inventory = inventoryRepository.findByProfileId(null); // Assuming 1:1 binding
                                                                                             // (patched)

                BigDecimal revenue = sales.stream().map(ErpSale::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
                BigDecimal expense = expenses.stream().map(ErpExpense::getAmount).reduce(BigDecimal.ZERO,
                                BigDecimal::add);

                BigDecimal grossProfit = revenue.subtract(expense);

                // Net profit subtracts loan EMIs
                BigDecimal totalEmi = loans.stream().map(ErpLoan::getMonthlyEmi).reduce(BigDecimal.ZERO,
                                (a, b) -> (a != null && b != null) ? a.add(b)
                                                : (a != null ? a : (b != null ? b : BigDecimal.ZERO)));
                BigDecimal netProfit = grossProfit.subtract(totalEmi);

                // Cash Balance
                BigDecimal loanCapital = loans.stream().map(ErpLoan::getPrincipalAmount).reduce(BigDecimal.ZERO,
                                BigDecimal::add);
                BigDecimal cashBalance = revenue.add(loanCapital).subtract(expense);

                // Outstanding Load
                BigDecimal outstandingLoad = loans.stream().map(ErpLoan::getOutstandingBalance).reduce(BigDecimal.ZERO,
                                (a, b) -> (a != null && b != null) ? a.add(b)
                                                : (a != null ? a : (b != null ? b : BigDecimal.ZERO)));

                // Inventory Value (mock simple quantity * 100 for now if missing unit price)
                BigDecimal totalInventoryValue = inventory.stream()
                                .map(i -> new BigDecimal(i.getQuantity() != null ? i.getQuantity() : 0)
                                                .multiply(new BigDecimal("100")))
                                .reduce(BigDecimal.ZERO, BigDecimal::add);

                return ErpDashboardMetrics.builder()
                                .totalRevenue(revenue)
                                .totalExpenses(expense)
                                .grossProfit(grossProfit)
                                .netProfit(netProfit)
                                .cashBalance(cashBalance)
                                .totalInventoryValue(totalInventoryValue)
                                .totalLoanOutstanding(outstandingLoad)
                                .monthlyGrowth("12%") // Mock trend
                                .build();
        }
}
