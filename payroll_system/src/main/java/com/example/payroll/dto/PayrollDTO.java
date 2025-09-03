package com.example.payroll.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PayrollDTO {

    private Long id;
    private Long employeeId;
    private BigDecimal baseSalary;
    private BigDecimal deductions;
    private BigDecimal netSalary;
    private LocalDate payrollDate;

    public PayrollDTO() {}

    public PayrollDTO(Long id, Long employeeId, BigDecimal baseSalary, BigDecimal deductions, BigDecimal netSalary, LocalDate payrollDate) {
        this.id = id;
        this.employeeId = employeeId;
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

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
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
