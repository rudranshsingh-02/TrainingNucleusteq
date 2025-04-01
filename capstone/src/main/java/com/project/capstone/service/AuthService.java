package com.project.capstone.service;

import com.project.capstone.models.Employee;
import com.project.capstone.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpSession;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String loginEmployee(String email, String password, String role, HttpSession session) {
        Optional<Employee> optionalEmployee = employeeRepository.findByEmail(email);

        if (optionalEmployee.isEmpty()) {
            return "Invalid email or password.";
        }

        Employee employee = optionalEmployee.get();

        // Use passwordEncoder to verify the password
        if (!passwordEncoder.matches(password, employee.getPassword())) {
            return "Invalid email or password.";
        }

        if (!employee.getRole().equals(role)) {
            return "Invalid role for this user.";
        }

        session.setAttribute("employee", employee);
        return "Login successful!";
    }

    public String registerEmployee(Employee employee) {
        if (employeeRepository.findByEmail(employee.getEmail()).isPresent()) {
            return "Email is already registered!";
        }

        // Encrypt password before saving
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));

        employeeRepository.save(employee);
        return "Registration successful!";
    }

    public Employee getCurrentEmployee(HttpSession session) {
        return (Employee) session.getAttribute("employee");
    }
}
