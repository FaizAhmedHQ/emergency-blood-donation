package com.bloodnetwork.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User {
    @Id
    private String id;
    
    private String name;
    
    private String email;
    
    private String password;
    
    private UserRole role;
    
    private Boolean isVerified;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime lastLoginAt;
    
    public enum UserRole {
        DONOR, HOSPITAL, ADMIN
    }
}