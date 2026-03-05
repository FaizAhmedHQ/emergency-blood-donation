package com.bloodnetwork.repository;

import com.bloodnetwork.model.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditLogRepository extends MongoRepository<AuditLog, String> {
    List<AuditLog> findByUserId(String userId);
    Page<AuditLog> findByUserId(String userId, Pageable pageable);
    List<AuditLog> findByAction(String action);
    Page<AuditLog> findByAction(String action, Pageable pageable);
    Page<AuditLog> findAll(Pageable pageable);
}