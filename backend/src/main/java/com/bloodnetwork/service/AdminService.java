package com.bloodnetwork.service;

import com.bloodnetwork.dto.response.AnalyticsResponse;
import com.bloodnetwork.dto.response.PaginatedResponse;
import com.bloodnetwork.dto.response.EmergencyRequestResponse;
import com.bloodnetwork.model.AuditLog;
import com.bloodnetwork.model.User;
import com.bloodnetwork.model.EmergencyRequest;
import com.bloodnetwork.repository.AuditLogRepository;
import com.bloodnetwork.repository.EmergencyRequestRepository;
import com.bloodnetwork.repository.UserRepository;
import com.bloodnetwork.mapper.EmergencyRequestMapper;
import com.bloodnetwork.util.AuditLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmergencyRequestRepository emergencyRequestRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private AuditLogger auditLogger;
    
    @Autowired
    private EmergencyRequestMapper emergencyRequestMapper;

    @Cacheable(value = "analytics", key = "'user_stats'")
    public PaginatedResponse<User> getUsers(Pageable pageable) {
        Page<User> userPage = userRepository.findAll(pageable);
        return PaginatedResponse.fromPage(userPage);
    }

    @CacheEvict(value = "analytics", key = "'user_stats'")
    public User verifyUser(String userId, Boolean verified) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setIsVerified(verified);
        User updatedUser = userRepository.save(user);

        auditLogger.logAction("SYSTEM", "VERIFY_USER", "User", updatedUser.getId(), null, null);

        return updatedUser;
    }

    @Cacheable(value = "analytics", key = "'system_analytics'")
    public AnalyticsResponse getAnalytics() {
        // Get counts
        Long totalDonors = userRepository.count();
        Long totalHospitals = userRepository.count(); // This is not quite right - in a real app you'd have separate counts
        Long totalRequests = emergencyRequestRepository.count();
        
        // For demonstration purposes, we'll calculate totals differently
        // In a real application, you'd have specific methods for these counts
        long donorCount = userRepository.findAll().stream()
                .filter(u -> u.getRole() == User.UserRole.DONOR)
                .count();
                
        long hospitalCount = userRepository.findAll().stream()
                .filter(u -> u.getRole() == User.UserRole.HOSPITAL)
                .count();

        // Get blood group distribution (this would come from the repository method)
        Map<String, Long> bloodGroupDistribution = new HashMap<>();
        // This would be populated from a repository method in a real application

        // Get monthly trends
        Map<String, Object> monthlyTrends = new HashMap<>();
        // This would be populated from a repository method in a real application

        // Get request status counts
        Map<String, Long> requestStatusCounts = new HashMap<>();
        // This would be populated from a repository method in a real application

        return AnalyticsResponse.builder()
                .totalDonors(donorCount)
                .totalHospitals(hospitalCount)
                .totalRequests(totalRequests)
                .totalCompletedRequests(0L) // Placeholder
                .bloodGroupDistribution(bloodGroupDistribution)
                .monthlyTrends(monthlyTrends)
                .requestStatusCounts(requestStatusCounts)
                .topUrgentRequests(null) // Placeholder
                .build();
    }

    @Cacheable(value = "analytics", key = "'audit_logs'")
    public PaginatedResponse<AuditLog> getAuditLogs(Pageable pageable) {
        Page<AuditLog> logPage = auditLogRepository.findAll(pageable);
        return PaginatedResponse.fromPage(logPage);
    }

    public List<com.bloodnetwork.dto.response.EmergencyRequestResponse> getAllEmergencyRequests() {
        List<EmergencyRequest> requests = emergencyRequestRepository.findAll(
            org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "createdAt")
        );
        return requests.stream()
                .map(emergencyRequestMapper::toResponse)
                .collect(Collectors.toList());
    }
}