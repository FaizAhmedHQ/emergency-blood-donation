// ============================================
// BLOOD NETWORK - TEST DATA SETUP SCRIPT
// ============================================
// How to use this script:
// 1. Open MongoDB Compass OR mongosh terminal
// 2. Connect to: mongodb://localhost:27017
// 3. Select database: blood_network_db
// 4. Copy and paste each section one by one
// 5. Note down the generated IDs for testing
// ============================================

// Switch to database
use blood_network_db

// ============================================
// STEP 1: Create Admin User
// ============================================
print("Creating Admin User...")

db.users.insertOne({
  name: "System Administrator",
  email: "admin@bloodnetwork.com",
  password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K", // password123
  role: "ADMIN",
  isVerified: true,
  createdAt: new Date(),
  lastLoginAt: null
})

print("✓ Admin created. Login: admin@bloodnetwork.com / password123")

// ============================================
// STEP 2: Create Donor Users
// ============================================
print("\nCreating Donor Users...")

// Get donor ID for reference
var donor1Result = db.users.insertOne({
  name: "John Donor",
  email: "donor@test.com",
  password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K", // password123
  role: "DONOR",
  isVerified: true,
  createdAt: new Date("2024-01-15"),
  lastLoginAt: new Date()
})

var donor1Id = donor1Result.insertedId

db.donor_profiles.insertOne({
  userId: donor1Id,
  bloodGroup: "O+",
  isAvailable: true,
  location: "New York",
  phone: "555-0123",
  dateOfBirth: "1990-01-15",
  medicalNotes: "No allergies, healthy donor",
  donationType: "Whole Blood",
  lastDonationDate: new Date("2024-01-15"),
  nextDonationDate: new Date("2024-03-01")
})

print("✓ Donor 1 created: donor@test.com / password123 (Blood: O+)")

// Create more donors
var donor2Id = db.users.insertOne({
  name: "Sarah Helper",
  email: "sarah@test.com",
  password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K",
  role: "DONOR",
  isVerified: true,
  createdAt: new Date("2024-02-01"),
  lastLoginAt: new Date()
}).insertedId

db.donor_profiles.insertOne({
  userId: donor2Id,
  bloodGroup: "A+",
  isAvailable: true,
  location: "Brooklyn",
  phone: "555-0124",
  dateOfBirth: "1992-05-20",
  medicalNotes: "Regular donor",
  donationType: "Plasma",
  lastDonationDate: new Date("2024-02-01"),
  nextDonationDate: new Date("2024-03-15")
})

print("✓ Donor 2 created: sarah@test.com / password123 (Blood: A+)")

var donor3Id = db.users.insertOne({
  name: "Mike Champion",
  email: "mike@test.com",
  password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K",
  role: "DONOR",
  isVerified: false,
  createdAt: new Date("2024-02-20"),
  lastLoginAt: null
}).insertedId

db.donor_profiles.insertOne({
  userId: donor3Id,
  bloodGroup: "B+",
  isAvailable: false,
  location: "Queens",
  phone: "555-0125",
  dateOfBirth: "1988-11-10",
  medicalNotes: "First time donor",
  donationType: "Whole Blood",
  lastDonationDate: null,
  nextDonationDate: null
})

print("✓ Donor 3 created: mike@test.com / password123 (Blood: B+, Unverified)")

// ============================================
// STEP 3: Create Hospital Users
// ============================================
print("\nCreating Hospital Users...")

var hospital1Id = db.users.insertOne({
  name: "City General Hospital",
  email: "hospital@test.com",
  password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K",
  role: "HOSPITAL",
  isVerified: true,
  createdAt: new Date("2024-01-01"),
  lastLoginAt: new Date()
}).insertedId

db.hospital_profiles.insertOne({
  userId: hospital1Id,
  hospitalName: "City General Hospital",
  address: "123 Medical Avenue, New York, NY 10001",
  phone: "555-0199",
  licenseNumber: "HOSP-NY-2024-001"
})

print("✓ Hospital 1 created: hospital@test.com / password123")

var hospital2Id = db.users.insertOne({
  name: "Community Medical Center",
  email: "community@hospital.com",
  password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K",
  role: "HOSPITAL",
  isVerified: true,
  createdAt: new Date("2024-01-20"),
  lastLoginAt: new Date()
}).insertedId

db.hospital_profiles.insertOne({
  userId: hospital2Id,
  hospitalName: "Community Medical Center",
  address: "456 Health Street, Brooklyn, NY 11201",
  phone: "555-0299",
  licenseNumber: "HOSP-NY-2024-002"
})

print("✓ Hospital 2 created: community@hospital.com / password123")

// ============================================
// STEP 4: Create Emergency Requests
// ============================================
print("\nCreating Emergency Requests...")

db.emergency_requests.insertMany([
  {
    hospitalId: hospital1Id,
    bloodType: "O+",
    unitsNeeded: 2,
    patientName: "Emily Johnson",
    patientAge: "35",
    urgency: "URGENT",
    status: "PENDING",
    date: new Date("2024-03-05"),
    time: "ASAP",
    location: "City General Hospital, ER Wing",
    description: "Emergency surgery required due to accident. Patient needs immediate transfusion.",
    contactName: "Dr. Robert Smith",
    contactPhone: "555-0199",
    contactEmail: "dr.smith@citygeneral.com",
    createdAt: new Date("2024-03-04T10:30:00"),
    updatedAt: new Date("2024-03-04T10:30:00")
  },
  {
    hospitalId: hospital1Id,
    bloodType: "A+",
    unitsNeeded: 1,
    patientName: "Michael Chen",
    patientAge: "42",
    urgency: "HIGH",
    status: "PENDING",
    date: new Date("2024-03-06"),
    time: "14:00",
    location: "City General Hospital, ICU Room 305",
    description: "Cancer treatment requires regular blood transfusions.",
    contactName: "Dr. Lisa Wong",
    contactPhone: "555-0200",
    contactEmail: "dr.wong@citygeneral.com",
    createdAt: new Date("2024-03-04T11:00:00"),
    updatedAt: new Date("2024-03-04T11:00:00")
  },
  {
    hospitalId: hospital2Id,
    bloodType: "B+",
    unitsNeeded: 3,
    patientName: "David Martinez",
    patientAge: "28",
    urgency: "NORMAL",
    status: "IN_PROGRESS",
    date: new Date("2024-03-07"),
    time: "09:00",
    location: "Community Medical Center, Surgery Unit",
    description: "Scheduled surgery. Donors already contacted.",
    contactName: "Nurse Patricia Brown",
    contactPhone: "555-0300",
    contactEmail: "nurse.brown@communitymed.com",
    createdAt: new Date("2024-03-03T09:00:00"),
    updatedAt: new Date("2024-03-04T08:00:00")
  },
  {
    hospitalId: hospital1Id,
    bloodType: "O-",
    unitsNeeded: 1,
    patientName: "Anna Kowalski",
    patientAge: "65",
    urgency: "URGENT",
    status: "FULFILLED",
    date: new Date("2024-03-03"),
    time: "16:00",
    location: "City General Hospital, Cardiology",
    description: "Heart surgery completed successfully. Blood received.",
    contactName: "Dr. James Wilson",
    contactPhone: "555-0201",
    contactEmail: "dr.wilson@citygeneral.com",
    createdAt: new Date("2024-03-03T08:00:00"),
    updatedAt: new Date("2024-03-03T17:00:00")
  }
])

print("✓ Created 4 emergency requests with various statuses")

// ============================================
// STEP 5: Create Donation Records
// ============================================
print("\nCreating Donation History Records...")

db.donation_records.insertMany([
  {
    donorId: donor1Id,
    hospitalId: hospital1Id,
    hospitalName: "City General Hospital",
    bloodType: "O+",
    units: 1,
    type: "Whole Blood",
    date: new Date("2024-01-15"),
    duration: "30 mins",
    location: "Downtown Blood Drive",
    notes: "Successful donation, no complications",
    certificate: true
  },
  {
    donorId: donor1Id,
    hospitalId: hospital2Id,
    hospitalName: "Community Medical Center",
    bloodType: "O+",
    units: 1,
    type: "Plasma",
    date: new Date("2023-12-01"),
    duration: "45 mins",
    location: "Community Center",
    notes: "Regular donor, excellent health",
    certificate: true
  },
  {
    donorId: donor1Id,
    hospitalId: hospital1Id,
    hospitalName: "City General Hospital",
    bloodType: "O+",
    units: 1,
    type: "Whole Blood",
    date: new Date("2023-10-20"),
    duration: "35 mins",
    location: "Main Hospital",
    notes: "Good response, will donate again",
    certificate: true
  },
  {
    donorId: donor2Id,
    hospitalId: hospital1Id,
    hospitalName: "City General Hospital",
    bloodType: "A+",
    units: 1,
    type: "Plasma",
    date: new Date("2024-02-01"),
    duration: "40 mins",
    location: "Mobile Blood Bank",
    notes: "First plasma donation",
    certificate: true
  }
])

print("✓ Created donation records for testing history page")

// ============================================
// VERIFICATION - Count All Data
// ============================================
print("\n============================================")
print("DATA VERIFICATION:")
print("============================================")
print("Total Users: " + db.users.countDocuments())
print("Total Donors: " + db.users.countDocuments({role: "DONOR"}))
print("Total Hospitals: " + db.users.countDocuments({role: "HOSPITAL"}))
print("Total Admins: " + db.users.countDocuments({role: "ADMIN"}))
print("Total Donor Profiles: " + db.donor_profiles.countDocuments())
print("Total Hospital Profiles: " + db.hospital_profiles.countDocuments())
print("Total Emergency Requests: " + db.emergency_requests.countDocuments())
print("Total Donation Records: " + db.donation_records.countDocuments())
print("============================================")
print("\n✅ TEST DATA SETUP COMPLETE!")
print("\nLOGIN CREDENTIALS:")
print("-------------------------------------------")
print("Admin:    admin@bloodnetwork.com / password123")
print("Donor 1:  donor@test.com / password123 (O+, Verified)")
print("Donor 2:  sarah@test.com / password123 (A+, Verified)")
print("Donor 3:  mike@test.com / password123 (B+, Unverified)")
print("Hospital: hospital@test.com / password123")
print("Hospital: community@hospital.com / password123")
print("-------------------------------------------")
print("\nNow you can test all dashboard pages!")
print("============================================")
