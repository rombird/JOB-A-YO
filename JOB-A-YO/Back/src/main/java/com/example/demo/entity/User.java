package com.example.demo.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @Column(length=255, unique = true)
    private String email_id;

    @Column(length=255)
    private String username;

    @Column(length=255, nullable=false)
    private String password;

    private String role;
    // private String addr;
}
