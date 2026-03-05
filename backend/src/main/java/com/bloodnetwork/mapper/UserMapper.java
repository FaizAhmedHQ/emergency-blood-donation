package com.bloodnetwork.mapper;

import com.bloodnetwork.dto.request.RegisterRequest;
import com.bloodnetwork.dto.response.JwtResponse;
import com.bloodnetwork.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", expression = "java(com.bloodnetwork.model.User.UserRole.valueOf(registerRequest.getRole().toUpperCase()))")
    @Mapping(target = "isVerified", constant = "true")
    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "lastLoginAt", ignore = true)
    User toEntity(RegisterRequest registerRequest);
    
    // This method creates a JwtResponse with the user, access token, and refresh token
    // The JwtResponse constructor will handle setting the token type to "Bearer"
    default JwtResponse toJwtResponse(User user, String accessToken, String refreshToken) {
        return new JwtResponse(accessToken, refreshToken, user);
    }
}