// MongoDB Script to Verify All Existing Users
// ================================================
// How to run this script:
// Option 1: Open MongoDB Compass, connect to localhost:27017, go to "Databases" > "blood_network_db" > "users" collection
//           Click on "FIND" and run the update command in the query bar
//
// Option 2: Use mongo shell
//           1. Open terminal/command prompt
//           2. Run: mongosh
//           3. Run: use blood_network_db
//           4. Copy and paste the commands below

// Connect to your database
use blood_network_db

// Update ALL users to set isVerified to true (fixes the "User is disabled" error)
db.users.updateMany(
  {},
  { $set: { isVerified: true } }
)

// Verify the update - show all users with their verification status
db.users.find({}, { name: 1, email: 1, role: 1, isVerified: 1 })

// Alternative: Verify a specific user by email
// Replace "user@example.com" with the actual email
// db.users.updateOne(
//   { email: "user@example.com" },
//   { $set: { isVerified: true } }
// )

// Check how many users were updated
// db.users.countDocuments({ isVerified: true })
