package com.project.capstone.controllers;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;
import com.project.capstone.models.Employee;
import com.project.capstone.models.Project;
import com.project.capstone.repository.EmployeeRepository;
import com.project.capstone.repository.ProjectRepository;
;

@RestController
@RequestMapping("/assign")
public class AssignmentController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private EmployeeRepository employeeRepository; // ✅ Fixed incorrect name

    @PostMapping("/{projectId}/{employeeId}")
    public ResponseEntity<String> assignEmployeeToProject(@PathVariable Long projectId, @PathVariable Long employeeId) {
        Optional<Project> projectOpt = projectRepository.findById(projectId);
        Optional<Employee> employeeOpt = employeeRepository.findById(employeeId);

        // ✅ Fixed Optional check
        if (!projectOpt.isPresent() || !employeeOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Project or Employee not found.");
        }

        Project project = projectOpt.get();
        Employee employee = employeeOpt.get();

        // ✅ Check if employee is already assigned
        if (employee.getAssignedProjects() == null) {
            employee.setAssignedProjects(new ArrayList<>());  // Ensure initialization
        }
        if (project.getAssignedEmployees() == null) {
            project.setAssignedEmployees(new ArrayList<>());  // Ensure initialization
        }
        if (employee.getAssignedProjects().contains(project)) {
            return ResponseEntity.badRequest().body("Employee is already assigned to this project.");
        }

        // ✅ Add project to employee
        employee.getAssignedProjects().add(project);

        // ✅ Add employee to project
        project.getAssignedEmployees().add(employee);

        // ✅ Save both entities
        employeeRepository.save(employee);
        projectRepository.save(project);

        return ResponseEntity.ok("Employee assigned successfully.");
    }
}
