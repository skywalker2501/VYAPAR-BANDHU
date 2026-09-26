package com.vyaparbandhu.config;

import com.vyaparbandhu.domain.scheme.GovernmentSchemeEntity;
import com.vyaparbandhu.domain.scheme.GovernmentSchemeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final GovernmentSchemeRepository schemeRepository;

    public DataInitializer(GovernmentSchemeRepository schemeRepository) {
        this.schemeRepository = schemeRepository;
    }

    @Override
    public void run(String... args) {
        if (schemeRepository.count() > 0) {
            System.out.println("[DataInitializer] Schemes already seeded. Skipping.");
            return;
        }
        System.out.println("[DataInitializer] Seeding government schemes...");

        List<GovernmentSchemeEntity> schemes = List.of(
                scheme("PM SVANidhi",
                        "Micro-credit facility for street vendors affected by Covid-19",
                        "LOAN", "services,retail", "All",
                        new BigDecimal("10000"), new BigDecimal("50000"),
                        new BigDecimal("7"), "ACTIVE",
                        "https://pmsvanidhi.mohua.gov.in"),

                scheme("PMEGP",
                        "Prime Minister's Employment Generation Programme for new micro enterprises",
                        "SUBSIDY", "manufacturing,services,business", "All",
                        new BigDecimal("100000"), new BigDecimal("2500000"),
                        new BigDecimal("15"), "ACTIVE",
                        "https://www.kviconline.gov.in/pmegpeportal"),

                scheme("Mudra Loan - Shishu",
                        "Loans up to ₹50,000 for very small businesses under MUDRA scheme",
                        "LOAN", "manufacturing,services,trading", "All",
                        new BigDecimal("0"), new BigDecimal("50000"),
                        new BigDecimal("0"), "ACTIVE",
                        "https://www.mudra.org.in"),

                scheme("Mudra Loan - Kishore",
                        "Loans between ₹50,000 and ₹5 lakh for growing small businesses",
                        "LOAN", "manufacturing,services,trading", "All",
                        new BigDecimal("50000"), new BigDecimal("500000"),
                        new BigDecimal("0"), "ACTIVE",
                        "https://www.mudra.org.in"),

                scheme("Mudra Loan - Tarun",
                        "Loans between ₹5 lakh and ₹10 lakh for established small businesses",
                        "LOAN", "manufacturing,services,trading", "All",
                        new BigDecimal("500000"), new BigDecimal("1000000"),
                        new BigDecimal("0"), "ACTIVE",
                        "https://www.mudra.org.in"),

                scheme("Stand-Up India",
                        "Loans for SC/ST and women entrepreneurs setting up greenfield enterprises",
                        "LOAN", "manufacturing,services,trading", "All",
                        new BigDecimal("1000000"), new BigDecimal("10000000"),
                        new BigDecimal("0"), "ACTIVE",
                        "https://www.standupmitra.in"),

                scheme("CGTMSE",
                        "Credit Guarantee Fund for Micro and Small Enterprises — collateral-free loans",
                        "GUARANTEE", "manufacturing,services", "All",
                        new BigDecimal("0"), new BigDecimal("20000000"),
                        new BigDecimal("0"), "ACTIVE",
                        "https://www.cgtmse.in"),

                scheme("NABARD Agricultural Loan",
                        "Agricultural credit support for farmers and agri-allied businesses",
                        "LOAN", "agriculture,dairy,poultry", "All",
                        new BigDecimal("0"), new BigDecimal("5000000"),
                        new BigDecimal("4"), "ACTIVE",
                        "https://www.nabard.org"),

                scheme("PM Kisan Samman Nidhi",
                        "Income support of ₹6000/year to landholding farmer families",
                        "GRANT", "agriculture", "All",
                        new BigDecimal("0"), new BigDecimal("6000"),
                        new BigDecimal("0"), "ACTIVE",
                        "https://pmkisan.gov.in"),

                scheme("Dairy Entrepreneurship Development Scheme (DEDS)",
                        "Capital subsidy for setting up modern dairy farms and milk processing units",
                        "SUBSIDY", "dairy", "All",
                        new BigDecimal("0"), new BigDecimal("1300000"),
                        new BigDecimal("25"), "ACTIVE",
                        "https://dahd.nic.in"));

        schemeRepository.saveAll(schemes);
        System.out.println("[DataInitializer] Seeded " + schemes.size() + " government schemes successfully.");
    }

    private GovernmentSchemeEntity scheme(String name, String desc, String category,
            String types, String state,
            BigDecimal minCost, BigDecimal maxLoan,
            BigDecimal loanPct, String status, String url) {
        GovernmentSchemeEntity e = new GovernmentSchemeEntity();
        e.setSchemeName(name);
        e.setDescription(desc);
        e.setCategory(category);
        e.setBusinessTypes(types);
        e.setState(state);
        e.setMinProjectCost(minCost);
        e.setMaxLoan(maxLoan);
        e.setLoanPercentage(loanPct);
        e.setStatus(status);
        e.setOfficialUrl(url);
        return e;
    }
}
