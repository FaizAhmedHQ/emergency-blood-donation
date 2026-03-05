package com.bloodnetwork.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateEmergencyRequest {
    @NotBlank(message = "Blood group is required")
    private String bloodGroup;
    
    @NotNull(message = "Units required is required")
    @Min(value = 1, message = "Units required must be at least 1")
    private Integer unitsRequired;
    
    @NotNull(message = "Urgency level is required")
    private String urgencyLevel; // LOW, MEDIUM, HIGH
    
    private String notes;
}