package com.bloodnetwork.service;

import com.bloodnetwork.model.DonorProfile;
import com.bloodnetwork.model.EmergencyRequest;
import com.bloodnetwork.repository.DonorProfileRepository;
import com.bloodnetwork.repository.EmergencyRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchingService {

    @Autowired
    private DonorProfileRepository donorProfileRepository;

    @Autowired
    private EmergencyRequestRepository emergencyRequestRepository;

    /**
     * Find matching donors for an emergency request based on blood group, availability, and location
     */
    public List<DonorProfile> findMatchingDonors(String requestId, double radiusInKm) {
        EmergencyRequest request = emergencyRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Emergency request not found"));

        // Convert radius from km to meters (MongoDB uses meters)
        Double radiusInMeters = radiusInKm * 1000;

        // For now, we'll return donors based on blood group and availability
        // In a real application, we'd also factor in location
        return donorProfileRepository.findByBloodGroupAndAvailable(request.getBloodGroup());
    }

    /**
     * Find matching donors within a specific radius for a given blood group
     */
    public List<DonorProfile> findMatchingDonorsByLocation(String bloodGroup, double longitude, double latitude, double radiusInKm) {
        // Convert radius from km to meters (MongoDB uses meters)
        Double radiusInMeters = radiusInKm * 1000;

        return donorProfileRepository.findNearbyByBloodGroupAndAvailable(bloodGroup, longitude, latitude, radiusInMeters);
    }
}