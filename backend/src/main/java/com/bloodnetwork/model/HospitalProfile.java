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
@Document(collection = "hospitalProfiles")
public class HospitalProfile {
    @Id
    private String id;
    
    private String userId;
    
    private String hospitalName;
    
    private String licenseNumber;
    
    private Boolean verified;
    
    private DonorProfile.Location location;
    
    private ContactInfo contactInfo;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    @lombok.Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ContactInfo {
        private String phone;
        private String email;
        private String address;
    }
}