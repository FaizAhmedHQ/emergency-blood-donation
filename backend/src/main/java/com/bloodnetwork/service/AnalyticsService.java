package com.bloodnetwork.service;

import com.bloodnetwork.dto.response.AnalyticsResponse;
import com.bloodnetwork.repository.EmergencyRequestRepository;
import com.bloodnetwork.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmergencyRequestRepository emergencyRequestRepository;

    @Cacheable(value = "analytics", key = "'system_analytics_full'")
    public AnalyticsResponse getFullAnalytics() {
        // Get counts
        long totalDonors = userRepository.findAll().stream()
                .filter(u -> u.getRole() == com.bloodnetwork.model.User.UserRole.DONOR)
                .count();
                
        long totalHospitals = userRepository.findAll().stream()
                .filter(u -> u.getRole() == com.bloodnetwork.model.User.UserRole.HOSPITAL)
                .count();
                
        long totalRequests = emergencyRequestRepository.count();
        
        // Count completed requests
        long totalCompletedRequests = 0; // Would need a method to count completed requests
        
        // Get blood group distribution from repository
        Map<String, Long> bloodGroupDistribution = new HashMap<>();
        try {
            List<EmergencyRequestRepository.BloodGroupCount> bloodGroupCounts = 
                emergencyRequestRepository.getBloodGroupDistribution();
            for (var count : bloodGroupCounts) {
                bloodGroupDistribution.put(count.get_id(), count.getCount());
            }
        } catch (Exception e) {
            // Handle exception or return empty map
        }

        // Get monthly trends
        Map<String, Object> monthlyTrends = new HashMap<>();
        try {
            List<EmergencyRequestRepository.MonthlyCount> monthlyCounts = 
                emergencyRequestRepository.getMonthlyTrends();
            for (var count : monthlyCounts) {
                monthlyTrends.put(count.get_id().toString(), count.getCount());
            }
        } catch (Exception e) {
            // Handle exception or return empty map
        }

        // Get request status counts
        Map<String, Long> requestStatusCounts = new HashMap<>();
        try {
            List<EmergencyRequestRepository.StatusCount> statusCounts = 
                emergencyRequestRepository.getRequestStatusCounts();
            for (var count : statusCounts) {
                requestStatusCounts.put(count.get_id(), count.getCount());
            }
        } catch (Exception e) {
            // Handle exception or return empty map
        }

        return AnalyticsResponse.builder()
                .totalDonors(totalDonors)
                .totalHospitals(totalHospitals)
                .totalRequests(totalRequests)
                .totalCompletedRequests(totalCompletedRequests)
                .bloodGroupDistribution(bloodGroupDistribution)
                .monthlyTrends(monthlyTrends)
                .requestStatusCounts(requestStatusCounts)
                .topUrgentRequests(null) // Placeholder
                .build();
    }
}