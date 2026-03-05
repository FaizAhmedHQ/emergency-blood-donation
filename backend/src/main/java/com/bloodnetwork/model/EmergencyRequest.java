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
@Document(collection = "emergencyRequests")
public class EmergencyRequest {
    @Id
    private String id;
    
    private String hospitalId;
    
    private String bloodGroup;
    
    private Integer unitsRequired;
    
    private UrgencyLevel urgencyLevel;
    
    private RequestStatus status;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    private LocalDateTime expiresAt;
    
    public enum UrgencyLevel {
        LOW, MEDIUM, HIGH
    }
    
    public enum RequestStatus {
        PENDING, ACCEPTED, COMPLETED, CANCELLED
    }
}