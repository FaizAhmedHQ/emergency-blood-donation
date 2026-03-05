package com.bloodnetwork.controller;

import com.bloodnetwork.dto.request.CreateEmergencyRequest;
import com.bloodnetwork.dto.response.ApiResponse;
import com.bloodnetwork.dto.response.EmergencyRequestResponse;
import com.bloodnetwork.dto.response.PaginatedResponse;
import com.bloodnetwork.model.User;
import com.bloodnetwork.repository.UserRepository;
import com.bloodnetwork.service.HospitalService;
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
@RequestMapping("/api/hospital")
@CrossOrigin(origins = "*", maxAge = 3600)
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/request")
    public ResponseEntity<ApiResponse<EmergencyRequestResponse>> createEmergencyRequest(@Valid @RequestBody CreateEmergencyRequest createEmergencyRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        EmergencyRequestResponse response = hospitalService.createEmergencyRequest(createEmergencyRequest);
        return ResponseEntity.ok(ApiResponse.success("Emergency request created successfully", response));
    }

    @GetMapping("/requests")
    public ResponseEntity<ApiResponse<PaginatedResponse<EmergencyRequestResponse>>> getHospitalRequests(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        PaginatedResponse<EmergencyRequestResponse> response = hospitalService.getHospitalRequests(user.getId(), pageable);
        return ResponseEntity.ok(ApiResponse.success("Requests retrieved successfully", response));
    }

    @GetMapping("/matching-donors/{requestId}")
    public ResponseEntity<ApiResponse<List<com.bloodnetwork.model.DonorProfile>>> getMatchingDonors(@PathVariable String requestId) {
        List<com.bloodnetwork.model.DonorProfile> matchingDonors = hospitalService.getMatchingDonors(requestId);
        return ResponseEntity.ok(ApiResponse.success("Matching donors retrieved successfully", matchingDonors));
    }

    @GetMapping("/donors")
    public ResponseEntity<ApiResponse<List<com.bloodnetwork.model.DonorProfile>>> searchDonors(
            @RequestParam(required = false) String bloodType,
            @RequestParam(required = false) String location,
            @RequestParam(defaultValue = "available") String availability) {
        
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        
        List<com.bloodnetwork.model.DonorProfile> donors = hospitalService.searchDonors(bloodType, location, availability, user.getId());
        return ResponseEntity.ok(ApiResponse.success("Donors retrieved successfully", donors));
    }
}