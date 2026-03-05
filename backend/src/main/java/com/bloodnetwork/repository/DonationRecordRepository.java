package com.bloodnetwork.repository;

import com.bloodnetwork.model.DonationRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRecordRepository extends MongoRepository<DonationRecord, String> {
    List<DonationRecord> findByDonorId(String donorId);
    List<DonationRecord> findByHospitalId(String hospitalId);
    List<DonationRecord> findByDonorIdAndHospitalId(String donorId, String hospitalId);
}