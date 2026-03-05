package com.bloodnetwork.dto.response;

import com.bloodnetwork.model.EmergencyRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmergencyRequestResponse {
    private String id;
    private String hospitalId;
    private String bloodGroup;
    private Integer unitsRequired;
    private String urgencyLevel;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime expiresAt;
    
    public static EmergencyRequestResponse fromEntity(EmergencyRequest request) {
        return EmergencyRequestResponse.builder()
                .id(request.getId())
                .hospitalId(request.getHospitalId())
                .bloodGroup(request.getBloodGroup())
                .unitsRequired(request.getUnitsRequired())
                .urgencyLevel(request.getUrgencyLevel().name())
                .status(request.getStatus().name())
                .createdAt(request.getCreatedAt())
                .updatedAt(request.getUpdatedAt())
                .expiresAt(request.getExpiresAt())
                .build();
    }
}