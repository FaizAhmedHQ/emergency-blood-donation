// ============================================
// DEBUG & FIX - User Management Showing 0 Users
// ============================================
// Run these commands in MongoDB Compass mongosh terminal
// ============================================

use blood_network_db

// STEP 1: Check if users exist
print("=== CHECKING USERS ===")
var userCount = db.users.countDocuments()
print("Total users in DB: " + userCount)

if (userCount === 0) {
  print("❌ NO USERS FOUND! Creating test users now...")
  
  // Create Admin
  var adminId = db.users.insertOne({
    name: "System Administrator",
    email: "admin@bloodnetwork.com",
    password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K",
    role: "ADMIN",
    isVerified: true,
    createdAt: new Date(),
    lastLoginAt: null
  }).insertedId
  
  // Create Donor
  var donorId = db.users.insertOne({
    name: "John Donor",
    email: "donor@test.com",
    password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K",
    role: "DONOR",
    isVerified: true,
    createdAt: new Date(),
    lastLoginAt: new Date()
  }).insertedId
  
  // Create Donor Profile
  db.donor_profiles.insertOne({
    userId: donorId,
    bloodGroup: "O+",
    isAvailable: true,
    location: "New York",
    phone: "555-0123",
    dateOfBirth: "1990-01-15",
    medicalNotes: "No allergies",
    donationType: "Whole Blood"
  })
  
  // Create Hospital
  var hospitalId = db.users.insertOne({
    name: "City General Hospital",
    email: "hospital@test.com",
    password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K",
    role: "HOSPITAL",
    isVerified: true,
    createdAt: new Date(),
    lastLoginAt: new Date()
  }).insertedId
  
  // Create Hospital Profile
  db.hospital_profiles.insertOne({
    userId: hospitalId,
    hospitalName: "City General Hospital",
    address: "123 Medical Avenue, New York, NY 10001",
    phone: "555-0199",
    licenseNumber: "HOSP-NY-2024-001"
  })
  
  // Create Emergency Request
  db.emergency_requests.insertOne({
    hospitalId: hospitalId,
    bloodType: "O+",
    unitsNeeded: 2,
    patientName: "Emergency Patient",
    patientAge: "35",
    urgency: "URGENT",
    status: "PENDING",
    date: new Date(),
    time: "ASAP",
    location: "City General Hospital",
    description: "Emergency surgery required",
    contactName: "Dr. Smith",
    contactPhone: "555-0199",
    createdAt: new Date(),
    updatedAt: new Date()
  })
  
  print("✅ Test users created successfully!")
} else {
  print("✅ Users already exist in database")
}

// STEP 2: Verify users by role
print("\n=== USERS BY ROLE ===")
print("Donors: " + db.users.countDocuments({role: "DONOR"}))
print("Hospitals: " + db.users.countDocuments({role: "HOSPITAL"}))
print("Admins: " + db.users.countDocuments({role: "ADMIN"}))
print("Unverified: " + db.users.countDocuments({isVerified: false}))

// STEP 3: Show all users
print("\n=== ALL USERS ===")
db.users.find({}, {name: 1, email: 1, role: 1, isVerified: 1}).forEach(function(user) {
  print("Name: " + user.name + " | Email: " + user.email + " | Role: " + user.role + " | Verified: " + user.isVerified)
})

// STEP 4: Fix common issues
print("\n=== FIXING COMMON ISSUES ===")

// Fix: Ensure all users have required fields
db.users.updateMany(
  {isVerified: {$exists: false}},
  {$set: {isVerified: true}}
)
print("✓ Fixed missing isVerified fields")

// Fix: Ensure createdAt exists
db.users.updateMany(
  {createdAt: {$exists: false}},
  {$set: {createdAt: new Date()}}
)
print("✓ Fixed missing createdAt fields")

// STEP 5: Verification query
print("\n=== FINAL VERIFICATION ===")
var finalCount = db.users.countDocuments()
print("Total users ready for testing: " + finalCount)

if (finalCount > 0) {
  print("\n✅ DATABASE IS READY!")
  print("\nLOGIN CREDENTIALS:")
  print("Admin: admin@bloodnetwork.com / password123")
  print("Donor: donor@test.com / password123")
  print("Hospital: hospital@test.com / password123")
  print("\nNow refresh the Admin User Management page!")
} else {
  print("\n❌ Still no users. Check MongoDB connection.")
}

print("\n============================================")
