package com.bloodnetwork.repository;

import com.bloodnetwork.model.DonorProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonorProfileRepository extends MongoRepository<DonorProfile, String> {
    Optional<DonorProfile> findByUserId(String userId);
    
    @Query("{'userId': ?0}")
    DonorProfile findByUserIdWithLocation(String userId);
    
    @Query("{'bloodGroup': ?0, 'availabilityStatus': 'AVAILABLE'}")
    List<DonorProfile> findByBloodGroupAndAvailable(String bloodGroup);
    
    @Aggregation(pipeline = {
        "{ $match: { bloodGroup: ?0, availabilityStatus: 'AVAILABLE' } }",
        "{ $geoNear: { near: { type: 'Point', coordinates: [?1, ?2] }, distanceField: 'distance', spherical: true, maxDistance: ?3 } }"
    })
    List<DonorProfile> findNearbyByBloodGroupAndAvailable(String bloodGroup, Double longitude, Double latitude, Double maxDistanceInMeters);
    
    @Query("{'availabilityStatus': 'AVAILABLE'}")
    Page<DonorProfile> findAllAvailable(Pageable pageable);
}