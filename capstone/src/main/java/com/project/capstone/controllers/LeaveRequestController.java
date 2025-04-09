package com.project.capstone.controllers;

import com.project.capstone.models.LeaveRequest;
import com.project.capstone.models.LeaveStatus;
import com.project.capstone.repository.LeaveRequestRepository;
import com.project.capstone.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/leaves")

public class LeaveRequestController {
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/{employeeId}")
    public ResponseEntity<String> requestLeave(@PathVariable Long employeeId, @RequestBody LeaveRequest leaveRequest) {
        leaveRequest.setEmployee(employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found")));
        leaveRequest.setStatus(LeaveStatus.PENDING);
        leaveRequestRepository.save(leaveRequest);
        return ResponseEntity.ok("Leave request submitted successfully.");
    }

    @GetMapping
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequest> getEmployeeLeaves(@PathVariable Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    @PutMapping("/{leaveId}/{status}")
    public LeaveRequest updateLeaveStatus(@PathVariable Long leaveId, @PathVariable LeaveStatus status) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("leave not found"));
        leaveRequest.setStatus(status);
        return leaveRequestRepository.save(leaveRequest);
    }
}
