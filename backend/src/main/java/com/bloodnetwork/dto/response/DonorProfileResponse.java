package com.bloodnetwork.dto.response;

import com.bloodnetwork.model.DonorProfile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonorProfileResponse {
    private String id;
    private String userId;
    private String bloodGroup;
    private Boolean organDonor;
    private String availabilityStatus;
    private LocalDate lastDonationDate;
    private DonorProfile.Location location;
    private Integer donationCount;
    private String eligibilityStatus;
    private LocalDate nextEligibleDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static DonorProfileResponse fromEntity(DonorProfile donorProfile) {
        return DonorProfileResponse.builder()
                .id(donorProfile.getId())
                .userId(donorProfile.getUserId())
                .bloodGroup(donorProfile.getBloodGroup())
                .organDonor(donorProfile.getOrganDonor())
                .availabilityStatus(donorProfile.getAvailabilityStatus().name())
                .lastDonationDate(donorProfile.getLastDonationDate())
                .location(donorProfile.getLocation())
                .donationCount(donorProfile.getDonationCount())
                .eligibilityStatus(donorProfile.getEligibilityStatus().name())
                .nextEligibleDate(donorProfile.getNextEligibleDate())
                .createdAt(donorProfile.getCreatedAt())
                .updatedAt(donorProfile.getUpdatedAt())
                .build();
    }
}