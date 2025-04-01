package com.project.capstone.controllers;

import com.project.capstone.models.Employee;
import com.project.capstone.models.Project;
import com.project.capstone.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/dashboard")

public class AdminDashboardController {

    @Autowired
    private AdminDashboardService adminDashboardService;

    @GetMapping("/employees")
    public List<Employee> getAllEmployees()
    {
        return adminDashboardService.getAllEmployees();
    }

    @GetMapping("/projects")
    public List<Project> getAllProjects()
    {
        return adminDashboardService.getAllProjects();
    }
    
}
