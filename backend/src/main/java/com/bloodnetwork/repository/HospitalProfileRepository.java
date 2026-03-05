package com.bloodnetwork.repository;

import com.bloodnetwork.model.HospitalProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HospitalProfileRepository extends MongoRepository<HospitalProfile, String> {
    Optional<HospitalProfile> findByUserId(String userId);
    Optional<HospitalProfile> findByLicenseNumber(String licenseNumber);
    Boolean existsByUserId(String userId);
}