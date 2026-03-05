package com.bloodnetwork.controller;

import com.bloodnetwork.dto.response.ApiResponse;
import com.bloodnetwork.dto.response.DashboardStatsResponse;
import com.bloodnetwork.model.User;
import com.bloodnetwork.repository.UserRepository;
import com.bloodnetwork.security.CustomUserDetails;
import com.bloodnetwork.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getDashboardStats() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        User user = userDetails.getUser();

        DashboardStatsResponse stats = dashboardService.getDashboardStats(user);
        return ResponseEntity.ok(ApiResponse.success("Dashboard stats retrieved successfully", stats));
    }

    @GetMapping("/recent-activity")
    public ResponseEntity<ApiResponse<Object>> getRecentActivity() {
        // Placeholder for recent activity
        return ResponseEntity.ok(ApiResponse.success("Recent activity retrieved", null));
    }
}