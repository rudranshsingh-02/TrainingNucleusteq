package com.hrportal.controller;

import com.hrportal.service.AuthService;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody Map<String, String> credentials,
            HttpSession session 
    ) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (authService.validateHrUser(email, password)) {
            session.setAttribute("hr_user", email); 
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @GetMapping("/check")
    public ResponseEntity<String> checkSession(HttpSession session) {
        String user = (String) session.getAttribute("hr_user");
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.status(401).build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate(); 
        return ResponseEntity.ok().build();
    }
}