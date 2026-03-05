package com.bloodnetwork.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "donorProfiles")
public class DonorProfile {
    @Id
    private String id;
    
    private String userId;
    
    private String bloodGroup;
    
    private Boolean organDonor;
    
    private AvailabilityStatus availabilityStatus;
    
    private LocalDate lastDonationDate;
    
    private Location location;
    
    private Integer donationCount;
    
    private EligibilityStatus eligibilityStatus;
    
    private LocalDate nextEligibleDate;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    public enum AvailabilityStatus {
        AVAILABLE, UNAVAILABLE
    }
    
    public enum EligibilityStatus {
        ELIGIBLE, NOT_ELIGIBLE
    }
    
    @lombok.Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Location {
        private String type; // Always "Point"
        private Double[] coordinates; // [longitude, latitude]
        
        public Location(Double longitude, Double latitude) {
            this.type = "Point";
            this.coordinates = new Double[]{longitude, latitude};
        }
    }
}