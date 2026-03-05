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
@Document(collection = "auditLogs")
public class AuditLog {
    @Id
    private String id;
    
    private String userId;
    
    private String action; // LOGIN, CREATE_REQUEST, UPDATE_PROFILE, etc.
    
    private String entityType; // User, DonorProfile, EmergencyRequest, etc.
    
    private String entityId;
    
    private String oldValue;
    
    private String newValue;
    
    private String ipAddress;
    
    private String userAgent;
    
    private LocalDateTime timestamp;
}