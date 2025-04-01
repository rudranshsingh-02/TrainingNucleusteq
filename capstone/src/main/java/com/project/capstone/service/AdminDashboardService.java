package com.project.capstone.service;
import com.project.capstone.models.Employee;
import com.project.capstone.models.Project;
import com.project.capstone.repository.EmployeeRepository;
import com.project.capstone.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service

public class AdminDashboardService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<Employee> getAllEmployees()
    {
        return employeeRepository.findAll();
    }

    public List<Project> getAllProjects()
    {
        return projectRepository.findAll();
    }
    
}
