package com.bloodnetwork.security;

import com.bloodnetwork.model.RefreshToken;
import com.bloodnetwork.repository.RefreshTokenRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Component
public class RefreshTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(RefreshTokenProvider.class);

    @Value("${jwt.refresh-secret}")
    private String refreshJwtSecret;

    @Value("${jwt.refresh-expiration}")
    private long refreshJwtExpirationMs;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(refreshJwtSecret.getBytes());
    }

    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + refreshJwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUserNameFromRefreshToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateRefreshToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid refresh JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("Refresh JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("Refresh JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("Refresh JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    public RefreshToken createRefreshToken(String userId) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUserId(userId);
        refreshToken.setToken(generateRefreshToken(userId));
        refreshToken.setExpiryDate(LocalDateTime.now().plusSeconds(refreshJwtExpirationMs / 1000));
        refreshToken.setRevoked(false);
        refreshToken.setCreatedAt(LocalDateTime.now());

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(LocalDateTime.now()) < 0 || token.getRevoked()) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token expired or revoked");
        }
        return token;
    }
}