package com.project.capstone.service;

import com.project.capstone.repository.EmployeeRepository;
import com.project.capstone.models.Employee;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public void updateEmployeeSkills(Long employeeId, List<String> skills) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employee.setSkills(String.join(", ", skills)); 
        employeeRepository.save(employee);
    }
    public void addEmployeeSkill(Long employeeId, String newSkill) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        String currentSkills = employee.getSkills();
        if (currentSkills == null || currentSkills.trim().isEmpty() || currentSkills.equals("Not Provided")) {
            employee.setSkills(newSkill);
        } else {
            employee.setSkills(currentSkills + ", " + newSkill);
        }
        employeeRepository.save(employee);
    }
}
