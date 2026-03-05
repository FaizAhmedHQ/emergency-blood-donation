package com.bloodnetwork.service;

import com.bloodnetwork.dto.request.LoginRequest;
import com.bloodnetwork.dto.request.RegisterRequest;
import com.bloodnetwork.dto.response.JwtResponse;
import com.bloodnetwork.mapper.UserMapper;
import com.bloodnetwork.model.User;
import com.bloodnetwork.repository.UserRepository;
import com.bloodnetwork.security.CustomUserDetails;
import com.bloodnetwork.security.JwtUtils;
import com.bloodnetwork.security.RefreshTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private RefreshTokenProvider refreshTokenProvider;

    @Autowired
    private UserMapper userMapper;

    public JwtResponse register(RegisterRequest registerRequest) {
        // Check if user already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already taken!");
        }

        // Create new user
        User user = userMapper.toEntity(registerRequest);
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        User savedUser = userRepository.save(user);

        // Generate tokens
        String accessToken = jwtUtils.generateJwtToken(savedUser.getEmail());
        var refreshToken = refreshTokenProvider.createRefreshToken(savedUser.getId());

        return userMapper.toJwtResponse(savedUser, accessToken, refreshToken.getToken());
    }

    public JwtResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Get the custom user details
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = customUserDetails.getUser();
        
        // Update last login time
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        String accessToken = jwtUtils.generateJwtToken(user.getEmail());
        var refreshToken = refreshTokenProvider.createRefreshToken(user.getId());

        return new JwtResponse(accessToken, refreshToken.getToken(), user);
    }
}