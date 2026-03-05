package com.bloodnetwork.mapper;

import com.bloodnetwork.dto.request.CreateEmergencyRequest;
import com.bloodnetwork.dto.response.EmergencyRequestResponse;
import com.bloodnetwork.model.EmergencyRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface EmergencyRequestMapper {
    EmergencyRequestMapper INSTANCE = Mappers.getMapper(EmergencyRequestMapper.class);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "hospitalId", ignore = true)
    @Mapping(target = "urgencyLevel", expression = "java(com.bloodnetwork.model.EmergencyRequest.UrgencyLevel.valueOf(createEmergencyRequest.getUrgencyLevel().toUpperCase()))")
    @Mapping(target = "status", expression = "java(com.bloodnetwork.model.EmergencyRequest.RequestStatus.PENDING)")
    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "updatedAt", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "expiresAt", expression = "java(java.time.LocalDateTime.now().plusDays(7))")
    EmergencyRequest toEntity(CreateEmergencyRequest createEmergencyRequest);
    
    @Mapping(target = "urgencyLevel", source = "urgencyLevel")
    @Mapping(target = "status", source = "status")
    EmergencyRequestResponse toResponse(EmergencyRequest emergencyRequest);
}