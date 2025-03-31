package com.hrportal.repository;

import com.hrportal.model.HrUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HrUserRepository extends JpaRepository<HrUser, String> {
    HrUser findByEmail(String email); 
}