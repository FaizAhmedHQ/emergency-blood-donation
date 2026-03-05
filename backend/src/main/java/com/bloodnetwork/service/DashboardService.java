package com.bloodnetwork.service;

import com.bloodnetwork.dto.response.DashboardStatsResponse;
import com.bloodnetwork.model.EmergencyRequest;
import com.bloodnetwork.model.User;
import com.bloodnetwork.repository.EmergencyRequestRepository;
import com.bloodnetwork.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmergencyRequestRepository emergencyRequestRepository;

    public DashboardStatsResponse getDashboardStats(User currentUser) {
        // Get total counts
        long totalUsers = userRepository.count();
        long totalDonors = userRepository.countByRole(User.UserRole.DONOR);
        long totalHospitals = userRepository.countByRole(User.UserRole.HOSPITAL);
        long totalRequests = emergencyRequestRepository.count();
        
        // Get request status counts
        long activeRequests = emergencyRequestRepository.countByStatus(EmergencyRequest.RequestStatus.PENDING);
        long completedRequests = emergencyRequestRepository.countByStatus(EmergencyRequest.RequestStatus.COMPLETED);
        long pendingRequests = emergencyRequestRepository.countByStatus(EmergencyRequest.RequestStatus.PENDING);
        
        // Get verification status counts
        long verifiedUsers = userRepository.countByIsVerified(true);
        long unverifiedUsers = userRepository.countByIsVerified(false);

        return DashboardStatsResponse.builder()
                .totalUsers(totalUsers)
                .totalDonors(totalDonors)
                .totalHospitals(totalHospitals)
                .totalRequests(totalRequests)
                .activeRequests(activeRequests)
                .completedRequests(completedRequests)
                .pendingRequests(pendingRequests)
                .verifiedUsers(verifiedUsers)
                .unverifiedUsers(unverifiedUsers)
                .userRole(currentUser.getRole().name())
                .userName(currentUser.getName())
                .userEmail(currentUser.getEmail())
                .build();
    }
}