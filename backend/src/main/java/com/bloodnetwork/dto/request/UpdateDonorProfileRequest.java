package com.bloodnetwork.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateDonorProfileRequest {
    private String bloodGroup;
    
    private Boolean organDonor;
    
    @NotNull(message = "Availability status is required")
    private String availabilityStatus; // AVAILABLE, UNAVAILABLE
    
    private Double longitude;
    
    private Double latitude;
    
    private Boolean isOrganDonor;
}