package com.bloodnetwork.repository;

import com.bloodnetwork.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    long countByRole(User.UserRole role);
    long countByIsVerified(boolean verified);
}