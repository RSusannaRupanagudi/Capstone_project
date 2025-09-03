package com.example.payroll.service;

import com.example.payroll.dto.EmployeeDTO;
import com.example.payroll.entity.Employee;
import com.example.payroll.repository.EmployeeRepository;
import com.example.payroll.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // Add employee
    public EmployeeDTO addEmployee(EmployeeDTO dto) {
        Employee employee = new Employee();
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employeeRepository.save(employee);
        dto.setId(employee.getId());
        return dto;
    }

    //Update employee
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO dto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));

        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());

        employeeRepository.save(employee);

        dto.setId(employee.getId());
        return dto;
    }

    // Get all employees
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(emp -> new EmployeeDTO(emp.getId(), emp.getFirstName(), emp.getLastName(),
                        emp.getEmail(),
                        emp.getDepartment() != null ? emp.getDepartment().getId() : null,
                        emp.getJob() != null ? emp.getJob().getId() : null))
                .collect(Collectors.toList());
    }

    // Get employee by id
    public EmployeeDTO getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .map(emp -> new EmployeeDTO(emp.getId(), emp.getFirstName(), emp.getLastName(),
                        emp.getEmail(),
                        emp.getDepartment() != null ? emp.getDepartment().getId() : null,
                        emp.getJob() != null ? emp.getJob().getId() : null))
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
    }

    // Delete employee
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Employee not found with id " + id);
        }
        employeeRepository.deleteById(id);
    }
}
