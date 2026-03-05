package com.bloodnetwork.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateAvailabilityRequest {
    @NotBlank(message = "Availability status is required")
    private String availabilityStatus; // AVAILABLE, UNAVAILABLE
}