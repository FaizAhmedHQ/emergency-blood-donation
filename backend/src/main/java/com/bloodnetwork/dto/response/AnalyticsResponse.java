package com.bloodnetwork.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsResponse {
    private Long totalDonors;
    private Long totalHospitals;
    private Long totalRequests;
    private Long totalCompletedRequests;
    private Map<String, Long> bloodGroupDistribution;
    private Map<String, Object> monthlyTrends;
    private Map<String, Long> requestStatusCounts;
    private List<RequestStat> topUrgentRequests;
    
    @lombok.Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RequestStat {
        private String bloodGroup;
        private Long count;
    }
}