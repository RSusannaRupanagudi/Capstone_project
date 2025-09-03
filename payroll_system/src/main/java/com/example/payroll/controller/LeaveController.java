package com.example.payroll.controller;

import com.example.payroll.dto.LeaveDTO;
import com.example.payroll.dto.ApiResponse;
import com.example.payroll.service.LeaveService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    // Apply leave
    @PostMapping
    public ResponseEntity<LeaveDTO> applyLeave(@RequestBody LeaveDTO dto) {
        return ResponseEntity.ok(leaveService.applyLeave(dto));
    }

    // Approve leave
    @PutMapping("/{id}/approve")
    public ResponseEntity<LeaveDTO> approveLeave(@PathVariable Long id) {
        return ResponseEntity.ok(leaveService.approveLeave(id));
    }

    // Reject leave
    @PutMapping("/{id}/reject")
    public ResponseEntity<LeaveDTO> rejectLeave(@PathVariable Long id) {
        return ResponseEntity.ok(leaveService.rejectLeave(id));
    }

    // Delete leave
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteLeave(@PathVariable Long id) {
        leaveService.deleteLeave(id);
        return ResponseEntity.ok(new ApiResponse(true, "Leave deleted successfully", LocalDateTime.now()));
    }

    // Get leaves by employee
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveDTO>> getEmployeeLeaves(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveService.getEmployeeLeaves(employeeId));
    }
}
