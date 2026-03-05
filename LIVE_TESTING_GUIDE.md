# 🧪 LIVE TESTING GUIDE - Blood Network Dashboard

## ✅ Prerequisites
- ✅ Backend running on `http://localhost:8080`
- ✅ Frontend running on `http://localhost:5173`
- ✅ MongoDB running on `mongodb://localhost:27017`

---

## 📋 Step-by-Step Testing Instructions

### STEP 1: Create Test Data in MongoDB ⚙️

#### Option A: Using MongoDB Compass (Recommended)

1. **Open MongoDB Compass**
2. **Connect to:** `mongodb://localhost:27017`
3. **Select database:** `blood_network_db`
4. **Open "MONGOSH" terminal** (bottom panel)
5. **Copy and paste** the entire content from `test-data-setup.js`
6. **Press Enter** to execute

OR

#### Option B: Manual Entry

1. Open MongoDB Compass → blood_network_db
2. Go to each collection and insert documents manually
3. Use the data structure from `test-data-setup.js`

---

### STEP 2: Verify Data Creation 🔍

Run these commands in MongoDB to verify:

```javascript
// Check all collections have data
db.users.countDocuments()           // Should return 6 (1 admin + 3 donors + 2 hospitals)
db.donor_profiles.countDocuments()  // Should return 3
db.hospital_profiles.countDocuments() // Should return 2
db.emergency_requests.countDocuments() // Should return 4
db.donation_records.countDocuments()   // Should return 4

// Verify specific data
db.users.find({role: "DONOR"})      // Should show 3 donors
db.users.find({role: "HOSPITAL"})   // Should show 2 hospitals
db.users.find({role: "ADMIN"})      // Should show 1 admin
```

---

### STEP 3: Test DONOR Dashboard 🎯

#### Login as Donor
1. Go to: `http://localhost:5173/login`
2. **Email:** `donor@test.com`
3. **Password:** `password123`
4. Click **Login**

#### Test 1: Profile Page ✅
**Expected Results:**
- ✅ Name shows: "John Donor"
- ✅ Email shows: "donor@test.com"
- ✅ Blood Group shows: "O+"
- ✅ Availability shows: "Available" or green badge
- ✅ Location shows: "New York"
- ✅ Phone shows: "555-0123"
- ✅ Verification badge shows: "Verified" (green)

**Actions to Test:**
1. Click **"Edit Profile"** button
2. Change phone number to: "555-9999"
3. Click **"Save Changes"**
4. Check if data updates in MongoDB:
   ```javascript
   db.donor_profiles.findOne({userId: ObjectId("YOUR_USER_ID")})
   ```
5. Refresh page - new phone should persist

#### Test 2: Emergency Alerts Page 🚨
**Expected Results:**
- ✅ Shows list of emergency requests
- ✅ Cards display with colors:
  - Red border = URGENT
  - Orange border = HIGH
  - Yellow border = NORMAL
- ✅ Each card shows:
  - Blood type (O+, A+, etc.)
  - Hospital name
  - Patient name
  - Units needed
  - Date and time
  - Description
  - Distance (if available)

**Filters to Test:**
1. Click **"All"** tab - shows all alerts
2. Click **"Urgent"** tab - shows only urgent requests
3. Click **"Pending"** tab - shows pending requests
4. Click **"Fulfilled"** tab - shows completed requests

**Action to Test:**
1. Find a PENDING request
2. Click **"I Can Donate"** button
3. Should see success message: "Thank you! Your response has been recorded."

#### Test 3: Donation History Page 📊
**Expected Results:**
- ✅ Stats cards show:
  - Total Donations: **3**
  - Units Donated: **3**
  - Lives Saved: **9** (3 × 3)
  - Streak: **3 months**
- ✅ "Last Donation" section shows date
- ✅ Timeline shows 3 donation records
- ✅ Each record displays:
  - Hospital name
  - Date
  - Blood type
  - Units donated
  - Duration
  - Notes
- ✅ Achievements section shows badges for 1 donation milestone

**Visual Checks:**
- ✅ Gradient colored stat cards
- ✅ Smooth animations when loading
- ✅ "Download Report" button visible

---

### STEP 4: Test HOSPITAL Dashboard 🏥

#### Login as Hospital
1. Logout from donor
2. Go to: `http://localhost:5173/login`
3. **Email:** `hospital@test.com`
4. **Password:** `password123`
5. Click **Login**

#### Test 1: Request Blood Form 📝
**Expected Results:**
- ✅ Form loads with all fields
- ✅ Warning box displays important information

**Actions to Test:**
1. Fill out the form:
   - Blood Type: Select "AB+"
   - Units Needed: 2
   - Patient Name: "Test Patient"
   - Patient Age: "45"
   - Urgency: "HIGH"
   - Date Needed: Today's date
   - Preferred Time: "10:00"
   - Location: "City General Hospital, Ward 5"
   - Description: "Testing emergency request system"
   - Contact Name: "Dr. Test User"
   - Contact Phone: "555-0999"
   - Contact Email: "test@hospital.com"
2. Click **"Submit Emergency Request"**
3. Should see success message
4. Should redirect to "My Requests" page
5. Verify in MongoDB:
   ```javascript
   db.emergency_requests.find({hospitalId: ObjectId("YOUR_HOSPITAL_ID")}).sort({createdAt: -1})
   ```
6. New request should appear at the top

#### Test 2: Find Donors Page 🔍
**Expected Results:**
- ✅ Search form loads
- ✅ Initial state shows "Start Your Search" message

**Search Tests:**

**Test A - Search by Blood Type:**
1. Select Blood Type: "O+"
2. Click **"Search Donors"**
3. Should show donors with O+ blood
4. Verify results match filter

**Test B - Search by Location:**
1. Clear blood type
2. Location: "Brooklyn"
3. Click **"Search Donors"**
4. Should show donors in Brooklyn area

**Test C - Combined Filters:**
1. Blood Type: "A+"
2. Location: "Brooklyn"
3. Availability: "Available Now"
4. Click **"Search Donors"**
5. Should show filtered results
6. Sarah Helper should appear

**Test D - All Donors:**
1. Clear all filters
2. Availability: "All Donors"
3. Click **"Search Donors"**
4. Should show all 3 donors

**Contact Test:**
1. Find an "Available" donor
2. Click **"Contact"** button
3. Should see alert: "Contact request sent to [Donor Name]"

#### Test 3: My Requests Page 📋
**Expected Results:**
- ✅ Stats cards show counts:
  - Total: Number of requests
  - Pending: Count of PENDING
  - Fulfilled: Count of FULFILLED
  - Urgent: Count of URGENT
- ✅ Request cards display properly
- ✅ Color-coded priority badges

**Filter Tests:**
1. Click **"All"** - shows all requests
2. Click **"Pending"** - shows only pending
3. Click **"In Progress"** - shows in-progress
4. Click **"Fulfilled"** - shows completed
5. Click **"Cancelled"** - shows cancelled

**Action Tests:**

**Test A - Update Status:**
1. Find a PENDING request
2. Click **Checkmark icon** (✓) to mark as fulfilled
3. Page should refresh
4. Status badge should change to green "FULFILLED"
5. Verify in MongoDB:
   ```javascript
   db.emergency_requests.findOne({_id: ObjectId("REQUEST_ID")})
   ```
6. Status field should be "FULFILLED"

**Test B - Delete Request:**
1. Find a request you created
2. Click **Trash icon** (🗑️)
3. Confirm deletion
4. Request should disappear from list
5. Verify in MongoDB - should be deleted

**Test C - View Details:**
1. Click **Eye icon** (👁️) on any request
2. Should show detailed view (if implemented)

---

### STEP 5: Test ADMIN Dashboard 👨‍💼

#### Login as Admin
1. Logout from hospital
2. Go to: `http://localhost:5173/login`
3. **Email:** `admin@bloodnetwork.com`
4. **Password:** `password123`
5. Click **Login**

#### Test 1: User Management Page 👥
**Expected Results:**
- ✅ Stats cards show:
  - Total Users: **6**
  - Donors: **3**
  - Hospitals: **2**
  - Admins: **1**
  - Unverified: **1** (Mike Champion)
- ✅ Table displays all users
- ✅ Each row shows:
  - Avatar with initial
  - Name and email
  - Role badge (color-coded)
  - Verification status
  - Join date
  - Action buttons

**Search Test:**
1. Type "john" in search box
2. Should filter to show John Donor
3. Clear search - all users reappear

**Filter Test:**
1. Select Role: "Donors"
2. Should show only 3 donors
3. Select Role: "Hospitals"
4. Should show only 2 hospitals

**Verification Test:**
1. Find "Mike Champion" (Unverified)
2. Click **Checkmark icon** (✓) to verify
3. Badge should change to green "Verified"
4. Verify in MongoDB:
   ```javascript
   db.users.findOne({email: "mike@test.com"})
   ```
5. isVerified should be true

**Unverify Test:**
1. Find a verified user
2. Click **X icon** to unverify
3. Badge should turn red "Unverified"

**View Details Test:**
1. Click **Eye icon** (👁️) on any user
2. Modal should open showing:
   - Full profile
   - Role and verification status
   - Member since date
   - Last login timestamp
3. Click **"Verify User"** or **"Unverify User"** button
4. Click **"Close"**

**Delete Test:**
1. Click **Trash icon** (🗑️) on a test user
2. Confirm deletion
3. User should disappear from table
4. Verify in MongoDB - should be deleted

#### Test 2: Request Management Page 📄
**Expected Results:**
- ✅ Stats cards show:
  - Total: **4+** (includes your test request)
  - Pending: Count
  - Fulfilled: Count
  - Urgent: Count
  - In Progress: Count
- ✅ Filter dropdowns work
- ✅ Table displays requests

**Filter Tests:**

**Test A - By Status:**
1. Select Status: "PENDING"
2. Should show only pending requests
3. Select Status: "FULFILLED"
4. Should show only fulfilled requests

**Test B - By Priority:**
1. Select Priority: "URGENT"
2. Should show only urgent requests
3. Select Priority: "NORMAL"
4. Should show normal priority requests

**Data Verification:**
1. Check that requests show:
   - Correct blood types
   - Patient names
   - Hospital locations
   - Status badges
   - Priority badges

#### Test 3: Analytics Page 📊
**Expected Results:**

**Key Metrics Cards:**
- ✅ Total Users: **6**
- ✅ Total Requests: **4+**
- ✅ Completed: Count matches FULFILLED requests
- ✅ Success Rate: Percentage calculated

**Blood Group Distribution:**
- ✅ Shows all 8 blood types
- ✅ Counts for each:
  - A+: some number
  - A-: some number
  - B+: 1 (Mike)
  - B-: 0
  - AB+: 0
  - AB-: 0
  - O+: 1 (John)
  - O-: 0

**User Role Breakdown:**
- ✅ Donors: **3**
- ✅ Hospitals: **2**
- ✅ Admins: **1**

**Recent Activity:**
- ✅ Shows recent system activities
- ✅ Timestamps displayed
- ✅ Activity descriptions shown

**System Health:**
- ✅ Shows "All systems operational"
- ✅ Database: Healthy
- ✅ API: Responsive
- ✅ Email Service: Active

---

## 🎯 Success Criteria Checklist

### DONOR Dashboard
- [ ] Profile loads with real data
- [ ] Can edit and save profile changes
- [ ] Emergency alerts display from database
- [ ] Can respond to alerts
- [ ] Donation history shows actual records
- [ ] Statistics calculate correctly
- [ ] Achievements display properly

### HOSPITAL Dashboard
- [ ] Can create new emergency requests
- [ ] Requests save to database
- [ ] Donor search works with filters
- [ ] Search results are accurate
- [ ] Can contact donors
- [ ] My Requests page shows hospital's requests
- [ ] Can update request status
- [ ] Can delete requests

### ADMIN Dashboard
- [ ] User management displays all users
- [ ] Can search and filter users
- [ ] Can verify/unverify users
- [ ] Can view user details
- [ ] Request monitoring shows all requests
- [ ] Filters work correctly
- [ ] Analytics display real statistics
- [ ] Blood group distribution accurate

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to backend"
**Solution:**
1. Check backend is running on port 8080
2. Check `frontend/src/utils/api.js` has correct URL
3. Check for CORS errors in browser console

### Issue: "401 Unauthorized"
**Solution:**
1. Clear localStorage: `localStorage.clear()`
2. Login again
3. Check token is being stored

### Issue: "No data showing"
**Solution:**
1. Verify test data was created in MongoDB
2. Run verification queries in mongosh
3. Check browser console for errors
4. Check network tab for failed API calls

### Issue: "Empty arrays in response"
**Solution:**
1. Ensure user role matches dashboard
2. Check authentication token is valid
3. Verify API endpoints in controller files

---

## ✅ Final Verification

After completing all tests, verify in MongoDB:

```javascript
// Check updated data
db.users.find()                    // All users present
db.donor_profiles.find()           // All donor profiles
db.hospital_profiles.find()        // All hospital profiles
db.emergency_requests.find()       // All requests (including new ones)
db.donation_records.find()         // All donation records

// Check specific updates
db.users.findOne({email: "donor@test.com"})  // Updated donor info
db.emergency_requests.find({status: "FULFILLED"}) // Fulfilled requests
```

---

## 🎉 Success!

If all checkboxes are checked and tests pass, your Blood Network application is **fully integrated** with real-time database connectivity! 🚀

**You now have:**
- ✅ Real-time data display
- ✅ CRUD operations working
- ✅ Search and filtering functional
- ✅ User actions persisted to database
- ✅ Professional dashboards with live data

**Congratulations!** 🩸❤️🎊
