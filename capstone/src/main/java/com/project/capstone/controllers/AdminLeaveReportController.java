package com.project.capstone.controllers;

import com.project.capstone.models.LeaveRequest;
import com.project.capstone.service.AdminLeaveReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/leaves")
public class AdminLeaveReportController {
    @Autowired
    private AdminLeaveReportService adminLeaveReportService;

    @GetMapping
    public List<LeaveRequest> getAllLeaveRequests() 
    {
        return adminLeaveReportService.getAllLeaveRequests();
    }

    @GetMapping("/status/{status}")
    public List<LeaveRequest> getLeaveRequestsByStatus(@PathVariable String status)
    {
        return adminLeaveReportService.getLeaveRequestsByStatus(status);
    }

    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequest> getLeaveRequestsByEmployee(@PathVariable Long employeeId)
    {
        return adminLeaveReportService.getLeaveRequestsByEmployee(employeeId);
    }
    
}
