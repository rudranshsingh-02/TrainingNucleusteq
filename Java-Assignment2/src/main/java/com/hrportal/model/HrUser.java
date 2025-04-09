package com.hrportal.model;

import jakarta.persistence.*;

@Entity
@Table(name = "hr_users")
public class HrUser {

    @Id
    private String email;

    @Column(nullable = false)
    private String password;

    public HrUser() {}

    public HrUser(String email, String password) {
        this.email = email;
        this.password = password;
    }

    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}