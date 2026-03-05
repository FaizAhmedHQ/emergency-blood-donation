package com.bloodnetwork.controller;

import com.bloodnetwork.dto.request.UpdateAvailabilityRequest;
import com.bloodnetwork.dto.request.UpdateDonorProfileRequest;
import com.bloodnetwork.dto.response.ApiResponse;
import com.bloodnetwork.dto.response.DonorProfileResponse;
import com.bloodnetwork.dto.response.EmergencyRequestResponse;
import com.bloodnetwork.dto.response.PaginatedResponse;
import com.bloodnetwork.model.User;
import com.bloodnetwork.repository.UserRepository;
import com.bloodnetwork.service.DonorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donor")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DonorController {

    @Autowired
    private DonorService donorService;
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<DonorProfileResponse>> getDonorProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        DonorProfileResponse response = donorService.getDonorProfile(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", response));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<DonorProfileResponse>> updateDonorProfile(@Valid @RequestBody UpdateDonorProfileRequest updateDonorProfileRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        DonorProfileResponse response = donorService.updateDonorProfile(updateDonorProfileRequest, user.getId());
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", response));
    }

    @PutMapping("/availability")
    public ResponseEntity<ApiResponse<DonorProfileResponse>> updateAvailability(@Valid @RequestBody UpdateAvailabilityRequest updateAvailabilityRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        DonorProfileResponse response = donorService.updateAvailability(updateAvailabilityRequest, user.getId());
        return ResponseEntity.ok(ApiResponse.success("Availability updated successfully", response));
    }

    @GetMapping("/nearby-requests")
    public ResponseEntity<ApiResponse<PaginatedResponse<EmergencyRequestResponse>>> getNearbyRequests(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(defaultValue = "10.0") Double radius) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        PaginatedResponse<EmergencyRequestResponse> response = donorService.getNearbyRequests(pageable, radius);
        return ResponseEntity.ok(ApiResponse.success("Nearby requests retrieved successfully", response));
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<com.bloodnetwork.model.DonationRecord>>> getDonationHistory() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        List<com.bloodnetwork.model.DonationRecord> history = donorService.getDonationHistory(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Donation history retrieved successfully", history));
    }
}