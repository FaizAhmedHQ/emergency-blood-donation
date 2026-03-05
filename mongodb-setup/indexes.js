// MongoDB Index Setup Script for Blood Network Application

// Connect to the database
db = db.getSiblingDB('blood_network_db');

// Create unique index on email for users collection
db.users.createIndex({ "email": 1 }, { unique: true });

// Create 2dsphere index on location for donorProfiles collection
db.donorProfiles.createIndex({ "location": "2dsphere" });

// Create 2dsphere index on location for hospitalProfiles collection
db.hospitalProfiles.createIndex({ "location": "2dsphere" });

// Create compound index on bloodGroup and availabilityStatus for donorProfiles collection
db.donorProfiles.createIndex({ "bloodGroup": 1, "availabilityStatus": 1 });

// Create index on status for emergencyRequests collection
db.emergencyRequests.createIndex({ "status": 1 });

// Create index on createdAt for emergencyRequests collection
db.emergencyRequests.createIndex({ "createdAt": 1 });

// Create TTL index on refreshTokens expiryDate
db.refreshTokens.createIndex({ "expiryDate": 1 }, { expireAfterSeconds: 0 });

// Create index on hospitalId for emergencyRequests collection
db.emergencyRequests.createIndex({ "hospitalId": 1 });

// Create index on userId for various collections
db.donorProfiles.createIndex({ "userId": 1 });
db.hospitalProfiles.createIndex({ "userId": 1 });
db.auditLogs.createIndex({ "userId": 1 });

// Create index on action for auditLogs collection
db.auditLogs.createIndex({ "action": 1 });

console.log("Indexes created successfully!");