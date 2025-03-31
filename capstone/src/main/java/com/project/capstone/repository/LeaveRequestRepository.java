package com.project.capstone.repository;
import com.project.capstone.models.LeaveRequest;
import com.project.capstone.models.LeaveStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest,Long>
{
    List<LeaveRequest> findByEmployeeId(Long employeeId);

    List<LeaveRequest> findByStatus(LeaveStatus status);
}
