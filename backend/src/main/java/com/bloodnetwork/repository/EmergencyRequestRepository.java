package com.bloodnetwork.repository;

import com.bloodnetwork.model.EmergencyRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmergencyRequestRepository extends MongoRepository<EmergencyRequest, String> {
    List<EmergencyRequest> findByHospitalId(String hospitalId);
    
    @Query("{'hospitalId': ?0}")
    Page<EmergencyRequest> findByHospitalId(String hospitalId, Pageable pageable);
    
    @Query("{'bloodGroup': ?0, 'status': 'PENDING'}")
    List<EmergencyRequest> findByBloodGroupAndPending(String bloodGroup);
    
    @Query("{'status': 'PENDING', 'urgencyLevel': ?0}")
    List<EmergencyRequest> findByStatusAndUrgencyLevel(EmergencyRequest.UrgencyLevel urgencyLevel);
    
    long countByStatus(EmergencyRequest.RequestStatus status);
    
    @Aggregation(pipeline = {
        "{ $group: { _id: '$bloodGroup', count: { $sum: 1 } } }",
        "{ $sort: { count: -1 } }"
    })
    List<BloodGroupCount> getBloodGroupDistribution();
    
    @Aggregation(pipeline = {
        "{ $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } }",
        "{ $sort: { '_id': 1 } }"
    })
    List<MonthlyCount> getMonthlyTrends();
    
    @Aggregation(pipeline = {
        "{ $group: { _id: '$status', count: { $sum: 1 } } }"
    })
    List<StatusCount> getRequestStatusCounts();
    
    interface BloodGroupCount {
        String get_id();
        Long getCount();
    }
    
    interface MonthlyCount {
        Integer get_id();
        Long getCount();
    }
    
    interface StatusCount {
        String get_id();
        Long getCount();
    }
}