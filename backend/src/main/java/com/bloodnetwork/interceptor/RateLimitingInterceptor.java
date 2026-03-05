package com.bloodnetwork.interceptor;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitingInterceptor implements HandlerInterceptor {

    @Value("${rate-limiting.capacity:10}")
    private int capacity;

    @Value("${rate-limiting.refill-tokens:10}")
    private int refillTokens;

    @Value("${rate-limiting.refill-interval-minutes:1}")
    private int refillIntervalMinutes;

    private final ConcurrentHashMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    private Bucket createNewBucket() {
        Bandwidth limit = Bandwidth.classic(capacity, Refill.intervally(refillTokens, Duration.ofMinutes(refillIntervalMinutes)));
        return Bucket.builder().addLimit(limit).build();
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Skip rate limiting for auth endpoints and GET requests
        if ("GET".equalsIgnoreCase(request.getMethod()) || request.getRequestURI().startsWith("/api/auth")) {
            return true;
        }

        String clientIP = getClientIpAddress(request);
        Bucket bucket = buckets.computeIfAbsent(clientIP, k -> createNewBucket());

        if (bucket.tryConsume(1)) {
            return true;
        } else {
            response.setStatus(429); // Too Many Requests
            response.setContentType("application/json");
            response.getWriter().write("{\"success\": false, \"message\": \"Rate limit exceeded\"}");
            return false;
        }
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedForHeader = request.getHeader("X-Forwarded-For");
        if (xForwardedForHeader == null) {
            return request.getRemoteAddr();
        } else {
            // As per standards, the first IP in the list is the original client IP
            return xForwardedForHeader.split(",")[0].trim();
        }
    }
}