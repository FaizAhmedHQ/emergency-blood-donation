package com.bloodnetwork.controller;

import com.bloodnetwork.dto.response.ApiResponse;
import com.bloodnetwork.dto.response.AnalyticsResponse;
import com.bloodnetwork.dto.response.PaginatedResponse;
import com.bloodnetwork.model.AuditLog;
import com.bloodnetwork.model.User;
import com.bloodnetwork.service.AdminService;
import com.bloodnetwork.service.AnalyticsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<PaginatedResponse<User>>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        PaginatedResponse<User> response = adminService.getUsers(pageable);
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", response));
    }

    @PutMapping("/verify-user")
    public ResponseEntity<ApiResponse<User>> verifyUser(@Valid @RequestBody com.bloodnetwork.dto.request.VerifyUserRequest verifyUserRequest) {
        User user = adminService.verifyUser(verifyUserRequest.getUserId(), verifyUserRequest.getVerified());
        return ResponseEntity.ok(ApiResponse.success("User verification updated successfully", user));
    }

    @GetMapping("/analytics")
    public ResponseEntity<ApiResponse<AnalyticsResponse>> getAnalytics() {
        AnalyticsResponse response = analyticsService.getFullAnalytics();
        return ResponseEntity.ok(ApiResponse.success("Analytics retrieved successfully", response));
    }

    @GetMapping("/logs")
    public ResponseEntity<ApiResponse<PaginatedResponse<AuditLog>>> getAuditLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "timestamp") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        PaginatedResponse<AuditLog> response = adminService.getAuditLogs(pageable);
        return ResponseEntity.ok(ApiResponse.success("Audit logs retrieved successfully", response));
    }

    @GetMapping("/requests")
    public ResponseEntity<ApiResponse<List<com.bloodnetwork.dto.response.EmergencyRequestResponse>>> getAllRequests() {
        List<com.bloodnetwork.dto.response.EmergencyRequestResponse> requests = adminService.getAllEmergencyRequests();
        return ResponseEntity.ok(ApiResponse.success("All emergency requests retrieved successfully", requests));
    }
}