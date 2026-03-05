package com.bloodnetwork.mapper;

import com.bloodnetwork.dto.request.UpdateDonorProfileRequest;
import com.bloodnetwork.dto.response.DonorProfileResponse;
import com.bloodnetwork.model.DonorProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface DonorProfileMapper {
    DonorProfileMapper INSTANCE = Mappers.getMapper(DonorProfileMapper.class);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "availabilityStatus", expression = "java(com.bloodnetwork.model.DonorProfile.AvailabilityStatus.valueOf(updateDonorProfileRequest.getAvailabilityStatus().toUpperCase()))")
    @Mapping(target = "location", expression = "java(new com.bloodnetwork.model.DonorProfile.Location(updateDonorProfileRequest.getLongitude(), updateDonorProfileRequest.getLatitude()))")
    @Mapping(target = "donationCount", constant = "0")
    @Mapping(target = "lastDonationDate", ignore = true)
    @Mapping(target = "eligibilityStatus", ignore = true)
    @Mapping(target = "nextEligibleDate", ignore = true)
    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "updatedAt", expression = "java(java.time.LocalDateTime.now())")
    DonorProfile toEntity(UpdateDonorProfileRequest updateDonorProfileRequest);
    
    @Mapping(target = "availabilityStatus", source = "availabilityStatus")
    @Mapping(target = "eligibilityStatus", source = "eligibilityStatus")
    DonorProfileResponse toResponse(DonorProfile donorProfile);
}