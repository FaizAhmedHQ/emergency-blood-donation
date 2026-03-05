package com.bloodnetwork.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsResponse {
    private Long totalUsers;
    private Long totalDonors;
    private Long totalHospitals;
    private Long totalRequests;
    private Long activeRequests;
    private Long completedRequests;
    private Long pendingRequests;
    private Long verifiedUsers;
    private Long unverifiedUsers;
    private String userRole;
    private String userName;
    private String userEmail;
}