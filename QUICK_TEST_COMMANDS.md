# 🚀 QUICK TEST COMMANDS - Blood Network

## ⚡ Fast Track Testing (5 Minutes)

### 1️⃣ Setup Test Data (30 seconds)

Open **MongoDB Compass** → **mongosh** terminal and run:

```javascript
use blood_network_db

// Quick test data
db.users.insertMany([
  {name: "Test Admin", email: "admin@test.com", password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K", role: "ADMIN", isVerified: true, createdAt: new Date()},
  {name: "Test Donor", email: "donor@test.com", password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K", role: "DONOR", isVerified: true, createdAt: new Date()},
  {name: "Test Hospital", email: "hospital@test.com", password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K", role: "HOSPITAL", isVerified: true, createdAt: new Date()}
])

db.donor_profiles.insertOne({userId: db.users.findOne({email: "donor@test.com"})._id, bloodGroup: "O+", isAvailable: true, location: "New York"})

db.emergency_requests.insertOne({hospitalId: db.users.findOne({email: "hospital@test.com"})._id, bloodType: "O+", unitsNeeded: 2, patientName: "Test Patient", urgency: "URGENT", status: "PENDING", date: new Date(), location: "Test Hospital", createdAt: new Date()})

print("✅ Test data created!")
```

---

### 2️⃣ Login Credentials

```
Admin:   admin@test.com / password123
Donor:   donor@test.com / password123
Hospital: hospital@test.com / password123
```

---

### 3️⃣ Test Each Dashboard (1 minute each)

#### DONOR Test
1. Login: `donor@test.com`
2. Check Profile page shows real data ✅
3. Check Emergency Alerts shows requests ✅
4. Check Donation History shows records ✅

#### HOSPITAL Test
1. Login: `hospital@test.com`
2. Create a new request ✅
3. Search for donors ✅
4. View My Requests ✅

#### ADMIN Test
1. Login: `admin@test.com`
2. View all users ✅
3. Verify a user ✅
4. View analytics ✅

---

## 🔍 MongoDB Quick Queries

```javascript
// Count all data
db.users.countDocuments()
db.donor_profiles.countDocuments()
db.emergency_requests.countDocuments()

// Find specific users
db.users.find({role: "DONOR"})
db.users.find({role: "HOSPITAL"})
db.users.find({isVerified: false})

// View requests
db.emergency_requests.find().sort({createdAt: -1})
db.emergency_requests.find({status: "PENDING"})
db.emergency_requests.find({urgency: "URGENT"})

// Update user verification
db.users.updateOne({email: "donor@test.com"}, {$set: {isVerified: true}})

// Delete test data
db.users.deleteMany({email: /test.com/})
```

---

## 🎯 Expected Results

### If Everything Works:
- ✅ Profile pages load with database data
- ✅ Emergency alerts show real requests
- ✅ Donation history displays actual records
- ✅ Can create new requests (saves to DB)
- ✅ Can search donors with filters
- ✅ Can verify/unverify users
- ✅ Analytics show real statistics

### If Something's Wrong:
- ❌ Check backend console for errors
- ❌ Check frontend console for errors
- ❌ Verify MongoDB connection string
- ❌ Check API base URL in `api.js`
- ❌ Ensure JWT token is being sent

---

## 📊 Visual Verification

**DONOR Dashboard should show:**
- Real name and email from DB
- Actual blood group
- Live emergency requests
- Donation records if any

**HOSPITAL Dashboard should show:**
- Ability to create requests
- Donor search results
- List of requests from DB

**ADMIN Dashboard should show:**
- All users in table
- Verification badges
- System-wide requests
- Analytics with counts

---

## 🆘 Quick Troubleshooting

**Can't login?**
- Check password hash matches
- Verify user exists in DB
- Check browser console for errors

**No data showing?**
- Run: `db.users.find()` to verify data
- Check API endpoint URLs
- Verify authentication token

**Can't save changes?**
- Check PUT/PATCH endpoints
- Verify CORS is enabled
- Check network tab for 4xx/5xx errors

---

## ✅ Success Indicators

You'll know it's working when:
1. Login redirects to dashboard
2. Pages load without errors
3. Real data from MongoDB displays
4. Actions (edit, create, delete) persist in DB
5. No console errors
6. Network requests return 200 OK

---

**Good luck with testing!** 🚀🩸❤️
