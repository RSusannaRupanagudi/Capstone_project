package com.example.payroll.controller;

import com.example.payroll.dto.ApiResponse;
import com.example.payroll.dto.PayrollDTO;
import com.example.payroll.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    @Autowired
    private PayrollService payrollService;

    @PostMapping("/generate/{employeeId}")
    public ResponseEntity<PayrollDTO> generatePayroll(
            @PathVariable Long employeeId,
            @RequestParam(required = false) BigDecimal deductions) {
        PayrollDTO dto = payrollService.generatePayroll(employeeId, deductions);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/history/{employeeId}")
    public ResponseEntity<List<PayrollDTO>> getPayrollHistory(@PathVariable Long employeeId) {
        return ResponseEntity.ok(payrollService.getPayrollHistory(employeeId));
    }

    @GetMapping("/test")
    public ResponseEntity<ApiResponse> test() {
        return ResponseEntity.ok(new ApiResponse(true, "Payroll API is working"));
    }
}
