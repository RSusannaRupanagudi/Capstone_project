package com.example.payroll.service;

import com.example.payroll.dto.PayrollDTO;
import com.example.payroll.entity.Employee;
import com.example.payroll.entity.Payroll;
import com.example.payroll.exception.ResourceNotFoundException;
import com.example.payroll.repository.EmployeeRepository;
import com.example.payroll.repository.PayrollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PayrollService {

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    /**
     * Generate payroll for an employee
     */
    public PayrollDTO generatePayroll(Long employeeId, BigDecimal deductions) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));

        BigDecimal baseSalary = employee.getJob().getBaseSalary();

        // Ensure deductions is never null
        if (deductions == null) {
            deductions = BigDecimal.ZERO;
        }

        // Net Salary = Base Salary - Deductions
        BigDecimal netSalary = baseSalary.subtract(deductions);

        Payroll payroll = new Payroll();
        payroll.setEmployee(employee);
        payroll.setBaseSalary(baseSalary);
        payroll.setDeductions(deductions);
        payroll.setNetSalary(netSalary);
        payroll.setPayrollDate(LocalDate.now());

        Payroll savedPayroll = payrollRepository.save(payroll);

        return mapToDTO(savedPayroll);
    }

    /**
     * Get payroll history for an employee
     */
    public List<PayrollDTO> getPayrollHistory(Long employeeId) {
        List<Payroll> payrolls = payrollRepository.findByEmployeeId(employeeId);
        return payrolls.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert Entity → DTO
     */
    private PayrollDTO mapToDTO(Payroll payroll) {
        return new PayrollDTO(
                payroll.getId(),
                payroll.getEmployee().getId(),
                payroll.getBaseSalary(),
                payroll.getDeductions(),
                payroll.getNetSalary(),
                payroll.getPayrollDate()
        );
    }
}
