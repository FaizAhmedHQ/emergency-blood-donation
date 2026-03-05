package com.bloodnetwork.service;

import com.bloodnetwork.dto.request.UpdateAvailabilityRequest;
import com.bloodnetwork.dto.request.UpdateDonorProfileRequest;
import com.bloodnetwork.dto.response.DonorProfileResponse;
import com.bloodnetwork.dto.response.EmergencyRequestResponse;
import com.bloodnetwork.dto.response.PaginatedResponse;
import com.bloodnetwork.mapper.DonorProfileMapper;
import com.bloodnetwork.mapper.EmergencyRequestMapper;
import com.bloodnetwork.model.DonorProfile;
import com.bloodnetwork.util.EligibilityCalculator;
import com.bloodnetwork.model.EmergencyRequest;
import com.bloodnetwork.model.User;
import com.bloodnetwork.repository.DonorProfileRepository;
import com.bloodnetwork.repository.EmergencyRequestRepository;
import com.bloodnetwork.repository.UserRepository;
import com.bloodnetwork.repository.DonationRecordRepository;
import com.bloodnetwork.util.AuditLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonorService {

    @Autowired
    private DonorProfileRepository donorProfileRepository;

    @Autowired
    private EmergencyRequestRepository emergencyRequestRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private DonationRecordRepository donationRecordRepository;

    @Autowired
    private DonorProfileMapper donorProfileMapper;

    @Autowired
    private EmergencyRequestMapper emergencyRequestMapper;

    @Autowired
    private AuditLogger auditLogger;

    @Cacheable(value = "donorProfiles", key = "#userId")
    public DonorProfileResponse getDonorProfile(String userId) {
        DonorProfile profile = donorProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Donor profile not found"));

        return donorProfileMapper.toResponse(profile);
    }

    @CacheEvict(value = "donorProfiles", key = "#updateDonorProfileRequest.userId")
    public DonorProfileResponse updateDonorProfile(UpdateDonorProfileRequest updateDonorProfileRequest, String userId) {
        DonorProfile existingProfile = donorProfileRepository.findByUserId(userId)
                .orElse(null);

        DonorProfile profile;
        if (existingProfile == null) {
            // Create new profile if it doesn't exist
            profile = donorProfileMapper.toEntity(updateDonorProfileRequest);
            profile.setUserId(userId);
        } else {
            // Update existing profile
            profile = existingProfile;
            if (updateDonorProfileRequest.getBloodGroup() != null) {
                profile.setBloodGroup(updateDonorProfileRequest.getBloodGroup());
            }
            if (updateDonorProfileRequest.getOrganDonor() != null) {
                profile.setOrganDonor(updateDonorProfileRequest.getOrganDonor());
            }
            if (updateDonorProfileRequest.getAvailabilityStatus() != null) {
                profile.setAvailabilityStatus(
                    DonorProfile.AvailabilityStatus.valueOf(updateDonorProfileRequest.getAvailabilityStatus().toUpperCase())
                );
            }
            if (updateDonorProfileRequest.getLongitude() != null && updateDonorProfileRequest.getLatitude() != null) {
                profile.setLocation(new DonorProfile.Location(
                    updateDonorProfileRequest.getLongitude(), 
                    updateDonorProfileRequest.getLatitude()
                ));
            }
            profile.setUpdatedAt(java.time.LocalDateTime.now());
        }

        // Calculate eligibility
        calculateEligibility(profile);

        DonorProfile savedProfile = donorProfileRepository.save(profile);
        auditLogger.logAction(userId, "UPDATE_DONOR_PROFILE", "DonorProfile", savedProfile.getId(), null, null);

        return donorProfileMapper.toResponse(savedProfile);
    }

    @CacheEvict(value = "donorProfiles", key = "#userId")
    public DonorProfileResponse updateAvailability(UpdateAvailabilityRequest updateAvailabilityRequest, String userId) {
        DonorProfile profile = donorProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Donor profile not found"));

        profile.setAvailabilityStatus(
            DonorProfile.AvailabilityStatus.valueOf(updateAvailabilityRequest.getAvailabilityStatus().toUpperCase())
        );
        profile.setUpdatedAt(java.time.LocalDateTime.now());

        // Calculate eligibility
        calculateEligibility(profile);

        DonorProfile savedProfile = donorProfileRepository.save(profile);
        auditLogger.logAction(userId, "UPDATE_AVAILABILITY", "DonorProfile", savedProfile.getId(), null, null);

        return donorProfileMapper.toResponse(savedProfile);
    }

    public PaginatedResponse<EmergencyRequestResponse> getNearbyRequests(Pageable pageable, Double radiusInKm) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        DonorProfile donorProfile = donorProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Donor profile not found"));

        if (donorProfile.getLocation() == null || donorProfile.getLocation().getCoordinates() == null) {
            throw new RuntimeException("Donor location not set");
        }

        // Convert radius from km to meters (MongoDB uses meters)
        Double radiusInMeters = radiusInKm * 1000;

        List<EmergencyRequest> nearbyRequests = emergencyRequestRepository.findByBloodGroupAndPending(donorProfile.getBloodGroup());

        // Further filter by location using the repository method
        List<DonorProfile> nearbyDonors = donorProfileRepository.findNearbyByBloodGroupAndAvailable(
            donorProfile.getBloodGroup(),
            donorProfile.getLocation().getCoordinates()[0], // longitude
            donorProfile.getLocation().getCoordinates()[1], // latitude
            radiusInMeters
        );

        // For simplicity, we'll return all pending requests for the donor's blood group
        // In a real application, you'd want to properly match based on location
        Page<EmergencyRequest> requestPage = emergencyRequestRepository.findAll(pageable);

        List<EmergencyRequestResponse> responses = requestPage.getContent().stream()
                .map(emergencyRequestMapper::toResponse)
                .collect(Collectors.toList());

        // Since we can't directly map the Page, we'll build the PaginatedResponse directly
        return PaginatedResponse.<EmergencyRequestResponse>builder()
            .content(responses)
            .page(requestPage.getNumber())
            .size(requestPage.getSize())
            .totalElements(requestPage.getTotalElements())
            .totalPages(requestPage.getTotalPages())
            .first(requestPage.isFirst())
            .last(requestPage.isLast())
            .build();
    }

    private void calculateEligibility(DonorProfile profile) {
        EligibilityCalculator.calculateEligibility(profile);
    }

    public List<com.bloodnetwork.model.DonationRecord> getDonationHistory(String userId) {
        return donationRecordRepository.findByDonorId(userId);
    }
}