package com.example.payroll.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "payrolls")
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal baseSalary;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal deductions;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal netSalary;

    @Column(nullable = false)
    private LocalDate payrollDate;

    public Payroll() {}

    public Payroll(Long id, Employee employee, BigDecimal baseSalary, BigDecimal deductions, BigDecimal netSalary, LocalDate payrollDate) {
        this.id = id;
        this.employee = employee;
        this.baseSalary = baseSalary;
        this.deductions = deductions;
        this.netSalary = netSalary;
        this.payrollDate = payrollDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public BigDecimal getBaseSalary() {
        return baseSalary;
    }

    public void setBaseSalary(BigDecimal baseSalary) {
        this.baseSalary = baseSalary;
    }

    public BigDecimal getDeductions() {
        return deductions;
    }

    public void setDeductions(BigDecimal deductions) {
        this.deductions = deductions;
    }

    public BigDecimal getNetSalary() {
        return netSalary;
    }

    public void setNetSalary(BigDecimal netSalary) {
        this.netSalary = netSalary;
    }

    public LocalDate getPayrollDate() {
        return payrollDate;
    }

    public void setPayrollDate(LocalDate payrollDate) {
        this.payrollDate = payrollDate;
    }
}
