package com.example.payroll.service;

import com.example.payroll.dto.LeaveDTO;
import com.example.payroll.entity.Employee;
import com.example.payroll.entity.LeaveRequest;
import com.example.payroll.repository.EmployeeRepository;
import com.example.payroll.repository.LeaveRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaveService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeRepository employeeRepository;

    public LeaveService(LeaveRequestRepository leaveRequestRepository, EmployeeRepository employeeRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.employeeRepository = employeeRepository;
    }

    // Apply for leave
    public LeaveDTO applyLeave(LeaveDTO dto) {
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        LeaveRequest leave = new LeaveRequest();
        leave.setEmployee(employee);
        leave.setStartDate(dto.getStartDate());
        leave.setEndDate(dto.getEndDate());
        leave.setReason(dto.getReason());
        leave.setStatus(LeaveRequest.LeaveStatus.PENDING);

        leaveRequestRepository.save(leave);

        return new LeaveDTO(
                leave.getId(),
                employee.getId(),
                leave.getStartDate(),
                leave.getEndDate(),
                leave.getReason(),
                leave.getStatus().name()
        );
    }

    // Approve leave
    public LeaveDTO approveLeave(Long leaveId) {
        return changeLeaveStatus(leaveId, LeaveRequest.LeaveStatus.APPROVED);
    }

    // Reject leave
    public LeaveDTO rejectLeave(Long leaveId) {
        return changeLeaveStatus(leaveId, LeaveRequest.LeaveStatus.REJECTED);
    }

    // Delete leave request
    public void deleteLeave(Long leaveId) {
        leaveRequestRepository.deleteById(leaveId);
    }

    // Get all leaves by employee
    public List<LeaveDTO> getEmployeeLeaves(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId).stream()
                .map(l -> new LeaveDTO(
                        l.getId(),
                        employeeId,
                        l.getStartDate(),
                        l.getEndDate(),
                        l.getReason(),
                        l.getStatus().name()))
                .collect(Collectors.toList());
    }

    // Helper method to change status
    private LeaveDTO changeLeaveStatus(Long leaveId, LeaveRequest.LeaveStatus status) {
        LeaveRequest leave = leaveRequestRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        leave.setStatus(status);
        leaveRequestRepository.save(leave);

        return new LeaveDTO(
                leave.getId(),
                leave.getEmployee().getId(),
                leave.getStartDate(),
                leave.getEndDate(),
                leave.getReason(),
                leave.getStatus().name()
        );
    }
}
