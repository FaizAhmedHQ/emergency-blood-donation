package com.bloodnetwork.service;

import com.bloodnetwork.dto.response.RefreshTokenResponse;
import com.bloodnetwork.model.RefreshToken;
import com.bloodnetwork.model.User;
import com.bloodnetwork.repository.RefreshTokenRepository;
import com.bloodnetwork.repository.UserRepository;
import com.bloodnetwork.security.JwtUtils;
import com.bloodnetwork.security.RefreshTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private RefreshTokenProvider refreshTokenProvider;

    public RefreshTokenResponse refreshToken(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));

        refreshTokenProvider.verifyExpiration(refreshToken);

        User user = userRepository.findById(refreshToken.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String newAccessToken = jwtUtils.generateJwtToken(user.getEmail());
        String newRefreshToken = refreshTokenProvider.createRefreshToken(user.getId()).getToken();

        return new RefreshTokenResponse(newAccessToken, newRefreshToken);
    }

    public void deleteByUserId(String userId) {
        refreshTokenRepository.deleteByUserId(userId);
    }
}