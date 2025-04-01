package com.project.capstone.service;

import com.project.capstone.models.LeaveRequest;
import com.project.capstone.models.LeaveStatus;
import com.project.capstone.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminLeaveReportService 
{
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    public List<LeaveRequest> getAllLeaveRequests()
    {
        return leaveRequestRepository.findAll();
    }

    public List<LeaveRequest> getLeaveRequestsByStatus(String status)
    {
        return leaveRequestRepository.findByStatus(LeaveStatus.valueOf(status.toUpperCase()));
    }

    public List<LeaveRequest> getLeaveRequestsByEmployee(Long employeeId)
    {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }
    
}
