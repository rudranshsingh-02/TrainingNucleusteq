package com.project.capstone.controllers;

import com.project.capstone.models.Employee;
import com.project.capstone.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Login API for Employee or Admin
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginEmployee(@RequestBody Map<String, String> request, HttpSession session) {
        String email = request.get("email");
        String password = request.get("password");
        String role = request.get("role");
        
        String response = authService.loginEmployee(email, password, role, session);
        
        if (!response.equals("Login successful!")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", response));
        }
        
        Employee employee = authService.getCurrentEmployee(session);
        if (employee == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Employee retrieval failed!"));
        }

        return ResponseEntity.ok(Map.of(
            "message", response,
            "employeeId", employee.getId(),
            "name", employee.getName(),
            "email", employee.getEmail(),
            "role", employee.getRole(),
            "skills", employee.getSkills()
        ));
    }

    // Register API for Employee
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerEmployee(@RequestBody Employee employee) {
        String response = authService.registerEmployee(employee);

        if (!response.equals("Registration successful!")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", response));
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", response));
    }

    @GetMapping("/current")
public ResponseEntity<Map<String, Object>> getCurrentUser(HttpSession session) {
    Employee employee = authService.getCurrentEmployee(session);

    if (employee == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Please login first"));
    }

    return ResponseEntity.ok(Map.of(
        "employeeId", employee.getId(),
        "name", employee.getName(),
        "email", employee.getEmail(),
        "role", employee.getRole(),
        "skills", employee.getSkills()
    ));
}

}
