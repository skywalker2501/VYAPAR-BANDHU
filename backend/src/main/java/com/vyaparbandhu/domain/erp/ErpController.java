package com.vyaparbandhu.domain.erp;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/erp")
public class ErpController {

    private final ErpSaleRepository saleRepo;
    private final ErpExpenseRepository expenseRepo;
    private final ErpLoanRepository loanRepo;
    private final ErpCustomerRepository customerRepo;
    private final ErpSupplierRepository supplierRepo;
    private final com.vyaparbandhu.domain.business.InventoryRepository inventoryRepo;
    private final ErpDashboardEngine dashboardEngine;

    public ErpController(ErpSaleRepository saleRepo,
            ErpExpenseRepository expenseRepo,
            ErpLoanRepository loanRepo,
            ErpCustomerRepository customerRepo,
            ErpSupplierRepository supplierRepo,
            com.vyaparbandhu.domain.business.InventoryRepository inventoryRepo,
            ErpDashboardEngine dashboardEngine) {
        this.saleRepo = saleRepo;
        this.expenseRepo = expenseRepo;
        this.loanRepo = loanRepo;
        this.customerRepo = customerRepo;
        this.supplierRepo = supplierRepo;
        this.inventoryRepo = inventoryRepo;
        this.dashboardEngine = dashboardEngine;
    }

    // --- DASHBOARD ---
    @GetMapping("/dashboard")
    public ResponseEntity<ErpDashboardEngine.ErpDashboardMetrics> getDashboard(
            @RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(dashboardEngine.generateDashboard(userId));
    }

    // --- SALES ---
    @PostMapping("/sales")
    public ResponseEntity<ErpSale> addSale(@RequestBody ErpSale sale) {
        return ResponseEntity.ok(saleRepo.save(sale));
    }

    @GetMapping("/sales")
    public ResponseEntity<List<ErpSale>> getSales(@RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(saleRepo.findByUserId(userId));
    }

    // --- EXPENSES ---
    @PostMapping("/expenses")
    public ResponseEntity<ErpExpense> addExpense(@RequestBody ErpExpense expense) {
        return ResponseEntity.ok(expenseRepo.save(expense));
    }

    @GetMapping("/expenses")
    public ResponseEntity<List<ErpExpense>> getExpenses(@RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(expenseRepo.findByUserId(userId));
    }

    // --- LOANS ---
    @PostMapping("/loans")
    public ResponseEntity<ErpLoan> addLoan(@RequestBody ErpLoan loan) {
        return ResponseEntity.ok(loanRepo.save(loan));
    }

    @GetMapping("/loans")
    public ResponseEntity<List<ErpLoan>> getLoans(@RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(loanRepo.findByUserId(userId));
    }

    // --- CUSTOMERS ---
    @PostMapping("/customers")
    public ResponseEntity<ErpCustomer> addCustomer(@RequestBody ErpCustomer customer) {
        return ResponseEntity.ok(customerRepo.save(customer));
    }

    @GetMapping("/customers")
    public ResponseEntity<List<ErpCustomer>> getCustomers(@RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(customerRepo.findByUserId(userId));
    }

    // --- SUPPLIERS ---
    @PostMapping("/suppliers")
    public ResponseEntity<ErpSupplier> addSupplier(@RequestBody ErpSupplier supplier) {
        return ResponseEntity.ok(supplierRepo.save(supplier));
    }

    @GetMapping("/suppliers")
    public ResponseEntity<List<ErpSupplier>> getSuppliers(@RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(supplierRepo.findByUserId(userId));
    }

    // --- INVENTORY ---
    @PostMapping("/inventory")
    public ResponseEntity<com.vyaparbandhu.domain.business.InventoryEntity> addInventory(
            @RequestBody com.vyaparbandhu.domain.business.InventoryEntity inventory) {
        return ResponseEntity.ok(inventoryRepo.save(inventory));
    }

    @GetMapping("/inventory")
    public ResponseEntity<List<com.vyaparbandhu.domain.business.InventoryEntity>> getInventory(
            @RequestParam(defaultValue = "1") Long businessId) {
        return ResponseEntity.ok(inventoryRepo.findByProfileId(null));
    }
}
