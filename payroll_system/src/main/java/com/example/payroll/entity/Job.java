package com.example.payroll.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String jobTitle;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal baseSalary;

    public Job() {}

    public Job(Long id, String jobTitle, BigDecimal baseSalary) {
        this.id = id;
        this.jobTitle = jobTitle;
        this.baseSalary = baseSalary;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public BigDecimal getBaseSalary() {
        return baseSalary;
    }

    public void setBaseSalary(BigDecimal baseSalary) {
        this.baseSalary = baseSalary;
    }
}
