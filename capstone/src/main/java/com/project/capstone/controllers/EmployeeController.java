package com.project.capstone.controllers;

import com.project.capstone.dto.SkillUpdateRequest;
import com.project.capstone.models.Employee;
import com.project.capstone.repository.EmployeeRepository;
import com.project.capstone.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeService employeeService;

    // Get all employees (for admin usage, perhaps)
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get employee by id
    @GetMapping("/{id}")
    public Optional<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeRepository.findById(id);
    }
    
    // Update skills endpoint
    @PutMapping("/update-skills")
    public ResponseEntity<String> updateSkills(@RequestBody SkillUpdateRequest request) {
        employeeService.updateEmployeeSkills(request.getEmployeeId(), request.getSkills());
        return ResponseEntity.ok("Skills updated successfully");
    }
    
    // Add skill endpoint
    @PostMapping("/{employeeId}/add-skill")
    public ResponseEntity<String> addSkill(@PathVariable Long employeeId, @RequestBody Map<String, String> request) {
        String newSkill = request.get("skill");
        if (newSkill == null || newSkill.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Skill cannot be empty.");
        }
        employeeService.addEmployeeSkill(employeeId, newSkill.trim());
        return ResponseEntity.ok("Skill added successfully");
    }
    
    // Delete employee
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeRepository.deleteById(id);
    }
}
