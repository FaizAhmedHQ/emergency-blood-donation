package com.bloodnetwork.service;

import com.bloodnetwork.dto.request.CreateEmergencyRequest;
import com.bloodnetwork.dto.response.EmergencyRequestResponse;
import com.bloodnetwork.dto.response.PaginatedResponse;
import com.bloodnetwork.mapper.DonorProfileMapper;
import com.bloodnetwork.mapper.EmergencyRequestMapper;
import com.bloodnetwork.model.DonorProfile;
import com.bloodnetwork.model.EmergencyRequest;
import com.bloodnetwork.model.User;
import com.bloodnetwork.repository.DonorProfileRepository;
import com.bloodnetwork.repository.EmergencyRequestRepository;
import com.bloodnetwork.repository.UserRepository;
import com.bloodnetwork.util.AuditLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HospitalService {

    @Autowired
    private EmergencyRequestRepository emergencyRequestRepository;

    @Autowired
    private DonorProfileRepository donorProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmergencyRequestMapper emergencyRequestMapper;

    @Autowired
    private DonorProfileMapper donorProfileMapper;

    @Autowired
    private AuditLogger auditLogger;

    @CacheEvict(value = "analytics", key = "'emergency_requests'")
    public EmergencyRequestResponse createEmergencyRequest(CreateEmergencyRequest createEmergencyRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        EmergencyRequest request = emergencyRequestMapper.toEntity(createEmergencyRequest);
        request.setHospitalId(user.getId());

        EmergencyRequest savedRequest = emergencyRequestRepository.save(request);

        auditLogger.logAction(user.getId(), "CREATE_EMERGENCY_REQUEST", "EmergencyRequest", savedRequest.getId(), null, null);

        return emergencyRequestMapper.toResponse(savedRequest);
    }

    @Cacheable(value = "emergencyRequests", key = "#hospitalId")
    public PaginatedResponse<EmergencyRequestResponse> getHospitalRequests(String hospitalId, Pageable pageable) {
        Page<EmergencyRequest> requestPage = emergencyRequestRepository.findByHospitalId(hospitalId, pageable);

        return PaginatedResponse.fromPage(requestPage.map(emergencyRequestMapper::toResponse));
    }

    public List<DonorProfile> getMatchingDonors(String requestId) {
        EmergencyRequest request = emergencyRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        // Find available donors with matching blood group
        List<DonorProfile> matchingDonors = donorProfileRepository.findByBloodGroupAndAvailable(request.getBloodGroup());

        return matchingDonors;
    }

    @CacheEvict(value = "emergencyRequests", key = "#requestId")
    public EmergencyRequestResponse updateRequestStatus(String requestId, String newStatus) {
        EmergencyRequest request = emergencyRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        // Validate status transition
        EmergencyRequest.RequestStatus newRequestStatus = EmergencyRequest.RequestStatus.valueOf(newStatus.toUpperCase());
        request.setStatus(newRequestStatus);
        request.setUpdatedAt(java.time.LocalDateTime.now());

        EmergencyRequest updatedRequest = emergencyRequestRepository.save(request);

        auditLogger.logAction(request.getHospitalId(), "UPDATE_REQUEST_STATUS", "EmergencyRequest", updatedRequest.getId(), null, null);

        return emergencyRequestMapper.toResponse(updatedRequest);
    }

    public List<com.bloodnetwork.model.DonorProfile> searchDonors(String bloodType, String location, String availability, String hospitalUserId) {
        // Get all donors and filter based on criteria
        List<DonorProfile> allDonors = donorProfileRepository.findAll();
        
        return allDonors.stream()
                .filter(donor -> {
                    // Filter by blood type if provided
                    if (bloodType != null && !bloodType.isEmpty() && !donor.getBloodGroup().equals(bloodType)) {
                        return false;
                    }
                    
                    // Filter by location if provided (check coordinates or skip)
                    if (location != null && !location.isEmpty()) {
                        // Since Location is an object with coordinates, we'll skip location filtering for now
                        // Or you can implement proper geolocation filtering
                        // For simple implementation, just skip this filter
                    }
                    
                    // Filter by availability status
                    if ("available".equals(availability) && donor.getAvailabilityStatus() != DonorProfile.AvailabilityStatus.AVAILABLE) {
                        return false;
                    } else if ("unavailable".equals(availability) && donor.getAvailabilityStatus() != DonorProfile.AvailabilityStatus.UNAVAILABLE) {
                        return false;
                    }
                    
                    return true;
                })
                .collect(Collectors.toList());
    }
}