package com.bloodnetwork.mapper;

import com.bloodnetwork.model.AuditLog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface AuditLogMapper {
    AuditLogMapper INSTANCE = Mappers.getMapper(AuditLogMapper.class);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "timestamp", expression = "java(java.time.LocalDateTime.now())")
    AuditLog toEntity(String userId, String action, String entityType, String entityId, String oldValue, String newValue, String ipAddress, String userAgent);
}