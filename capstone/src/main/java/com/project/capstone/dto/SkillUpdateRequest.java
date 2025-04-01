package com.project.capstone.dto;

import java.util.List;

public class SkillUpdateRequest {
    private Long employeeId;
    private List<String> skills;

    public SkillUpdateRequest() {}

    public SkillUpdateRequest(Long employeeId, List<String> skills) {
        this.employeeId = employeeId;
        this.skills = skills;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }
}
