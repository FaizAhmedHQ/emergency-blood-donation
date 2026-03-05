package com.bloodnetwork.util;

import com.bloodnetwork.mapper.AuditLogMapper;
import com.bloodnetwork.model.AuditLog;
import com.bloodnetwork.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AuditLogger {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private AuditLogMapper auditLogMapper;

    public void logAction(String userId, String action, String entityType, String entityId, String oldValue, String newValue) {
        // For now, we'll use placeholder values for IP and user agent
        // In a real application, you'd capture these from the HTTP request
        String ipAddress = "unknown";
        String userAgent = "unknown";

        AuditLog auditLog = auditLogMapper.toEntity(userId, action, entityType, entityId, oldValue, newValue, ipAddress, userAgent);
        auditLogRepository.save(auditLog);
    }

    public void logActionWithDetails(String userId, String action, String entityType, String entityId, String oldValue, String newValue, String ipAddress, String userAgent) {
        AuditLog auditLog = auditLogMapper.toEntity(userId, action, entityType, entityId, oldValue, newValue, ipAddress, userAgent);
        auditLogRepository.save(auditLog);
    }
}