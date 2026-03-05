# Dashboard Pages Visual Guide

## 🎨 What Each Page Looks Like

---

## DONOR DASHBOARD

### 1. Profile Page
```
┌─────────────────────────────────────────────────────────────┐
│  [Avatar] John Doe                               [Edit]     │
│           Blood Donor                                       │
│                                                             │
│  ┌──────────┬──────────┬──────────┐                        │
│  │ O+       │ Available│ Verified │                        │
│  │Blood Grp │ Status   │ Badge    │                        │
│  └──────────┴──────────┴──────────┘                        │
│                                                             │
│  Personal Information                                       │
│  ┌─────────────────┬─────────────────┐                     │
│  │ Name: John Doe  │ Email: john@..  │                     │
│  │ Phone: 123...   │ DOB: 01/01/1990 │                     │
│  └─────────────────┴─────────────────┘                     │
│                                                             │
│  Blood & Medical Information                                │
│  ┌─────────────────┬─────────────────┐                     │
│  │ Blood Group: O+ │ Available: Yes  │                     │
│  │ Location: NYC   │ Notes: ...      │                     │
│  └─────────────────┴─────────────────┘                     │
│                                                             │
│  Donation Preferences                                       │
│  • Preferred Type: Whole Blood                             │
│  • Last Donation: Jan 15, 2024                             │
│  • Next Eligible: Mar 1, 2024                              │
└─────────────────────────────────────────────────────────────┘
```

### 2. Emergency Alerts Page
```
┌─────────────────────────────────────────────────────────────┐
│  🔔 Emergency Alerts                    ⚠️ 3 Active         │
│  Urgent blood requests in your area                         │
│                                                             │
│  [All] [Urgent] [Pending] [Fulfilled]                      │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 🔴 URGENT - O+ Blood Needed                         │  │
│  │ City Hospital - Patient: Sarah M.                   │  │
│  │                                                     │  │
│  │ 💉 Blood Type: O+    📍 Location: Downtown          │  │
│  │ 📅 Date: Mar 5, 2024 ⏰ Time: ASAP                  │  │
│  │ 👤 Patient: Sarah M. (35 yrs)                       │  │
│  │ 🩸 Units Needed: 2                                  │  │
│  │                                                     │  │
│  │ Note: Emergency surgery scheduled                   │  │
│  │                                                     │  │
│  │ Posted 2 hours ago • 5 miles away                   │  │
│  │                               [📞 I Can Donate] ✓   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 🟠 HIGH - A+ Blood Needed                           │  │
│  │ General Hospital                                    │  │
│  │ ... (more alerts)                                   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ℹ️ How Emergency Alerts Work                              │
│  • You receive alerts for matching blood types            │
│  • Click "I Can Donate" to respond                        │
│  • Hospital will contact you directly                     │
└─────────────────────────────────────────────────────────────┘
```

### 3. Donation History Page
```
┌─────────────────────────────────────────────────────────────┐
│  ┌──────┬──────┬──────┬──────┐                             │
│  │ ❤️ 12│ 💉 15│ 🏆 45│ ⭐ 3 │                             │
│  │Total │Units │Lives │Streak│                             │
│  │Donat.│Donat.|Saved |Months│                             │
│  └──────┴──────┴──────┴──────┘                             │
│                                                             │
│  🕐 Last Donation: Jan 15, 2024                            │
│  Next eligible in: 45 days                                  │
│                                                             │
│  📄 Donation History              [⬇ Download Report]      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  │                                                         │
│  ● City Hospital - Whole Blood                            │
│    Jan 15, 2024 • Downtown Clinic                         │
│    Units: 1 | Blood Type: O+ | Duration: 30 mins          │
│    Notes: Felt great, no complications                    │
│                                                             │
│  ● Community Blood Drive - Plasma                         │
│    Dec 1, 2023 • Mall Location                            │
│    Units: 1 | Blood Type: O+ | Duration: 45 mins          │
│    [View Certificate]                                      │
│                                                             │
│  🏆 Achievements & Milestones                              │
│  ┌──────────┬──────────┬──────────┐                       │
│  │ ⭐ 1     │ ⭐ 5     │ ⭐ 10    │                       │
│  │Donations │Donations │Donations │                       │
│  │Achieved! │Achieved! │2 more to │                       │
│  │          │          │go!       │                       │
│  └──────────┴──────────┴──────────┘                       │
│                                                             │
│  💜 Your Total Impact                                     │
│  You've helped save 45 lives with your donations!          │
└─────────────────────────────────────────────────────────────┘
```

---

## HOSPITAL DASHBOARD

### 4. Request Blood Form
```
┌─────────────────────────────────────────────────────────────┐
│  ⚠️ Create Emergency Request                                │
│  Submit urgent blood request to find donors                 │
│                                                             │
│  ⚠️ Important Information                                   │
│  • Double-check all information before submitting          │
│  • Urgent requests sent to donors immediately              │
│  • Keep contact info accessible                            │
│  • Update status once fulfilled                            │
│                                                             │
│  📄 Request Details                                         │
│  ┌─────────────────┬─────────────────┐                     │
│  │ Blood Type *    │ Units Needed *  │                     │
│  │ [Select ▼]      │ [1      ]       │                     │
│  │ A+              │                 │                     │
│  │ A-              │                 │                     │
│  │ B+              │                 │                     │
│  └─────────────────┴─────────────────┘                     │
│                                                             │
│  ┌─────────────────┬─────────────────┐                     │
│  │ Patient Name *  │ Patient Age     │                     │
│  │ [             ] │ [            ]  │                     │
│  └─────────────────┴─────────────────┘                     │
│                                                             │
│  ┌─────────────────┬─────────────────┐                     │
│  │ Urgency Level * │ Date Needed *   │                     │
│  │ [Normal    ▼]   │ [2024-03-05]    │                     │
│  │ High            │                 │                     │
│  │ Urgent-Critical │                 │                     │
│  └─────────────────┴─────────────────┘                     │
│                                                             │
│  ┌─────────────────┬─────────────────┐                     │
│  │ Preferred Time  │ Hospital Loc *  │                     │
│  │ [14:00    ]     │ [City Hospital] │                     │
│  └─────────────────┴─────────────────┘                     │
│                                                             │
│  Additional Notes / Medical Condition                       │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Patient requires emergency surgery...               │  │
│  │                                                     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  Contact Information                                        │
│  ┌──────────────┬──────────────┬──────────────┐           │
│  │ Contact *    │ Phone *      │ Email        │           │
│  │ Dr. Smith    │ 555-0123     │ doc@hosp.com │           │
│  └──────────────┴──────────────┴──────────────┘           │
│                                                             │
│                          [Cancel] [💾 Submit Request]      │
└─────────────────────────────────────────────────────────────┘
```

### 5. Find Donors Page
```
┌─────────────────────────────────────────────────────────────┐
│  🔍 Find Donors                                             │
│  Search for compatible blood donors                         │
│                                                             │
│  📋 Search Criteria                                         │
│  ┌──────────────┬──────────────┬──────────────┐           │
│  │ Blood Type   │ Location     │ Availability │           │
│  │ [All     ▼]  │ [NYC     ]   │ [Available▼] │           │
│  └──────────────┴──────────────┴──────────────┘           │
│                              [🔍 Search Donors]            │
│                                                             │
│  Found 12 Compatible Donors                                 │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 👤 John D.                          [Available]     │  │
│  │    Age: 28                                          │  │
│  │                                                     │  │
│  │ 💉 O+        📍 Manhattan (2 mi)                    │  │
│  │ 📅 Last: Jan 10, 2024                               │  │
│  │ Note: Regular donor, excellent health               │  │
│  │                                                     │  │
│  │ [📞 Contact] [✉️]                                   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 👤 Sarah M.                        [Unavailable]    │  │
│  │    Age: 35                                          │  │
│  │                                                     │  │
│  │ 💉 A+        📍 Brooklyn (5 mi)                     │  │
│  │ 📅 Last: Dec 15, 2023                               │  │
│  │                                                     │  │
│  │ [📞 Contact] [✉️] (disabled)                        │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ℹ️ How to Use Donor Search                                │
│  • Select blood type needed                                │
│  • Enter location to find nearby donors                    │
│  • Filter by availability                                  │
│  • Click Contact to reach out                              │
└─────────────────────────────────────────────────────────────┘
```

### 6. My Requests Page
```
┌─────────────────────────────────────────────────────────────┐
│  📄 My Requests                        [+ Create New]       │
│  Manage and track your hospital's blood requests            │
│                                                             │
│  ┌──────┬──────┬─────────┬──────┐                          │
│  │Total │Pend. │Fulfilled│Urgent│                          │
│  │  25  │  5   │   18    │  2   │                          │
│  └──────┴──────┴─────────┴──────┘                          │
│                                                             │
│  [All] [Pending] [In Progress] [Fulfilled] [Cancelled]     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 🔴 URGENT - O+ Blood Request         [FULFILLED]    │  │
│  │ Patient: Michael R.                                 │  │
│  │                                                     │  │
│  │ 💉 Blood: O+    👤 Units: 2                         │  │
│  │ 📅 Date: Mar 1, 2024                                │  │
│  │ 📍 Location: City Hospital                          │  │
│  │ 📞 Contact: 555-0123                                │  │
│  │                                                     │  │
│  │ Note: Emergency trauma case                         │  │
│  │                                                     │  │
│  │ Created Feb 28 • 3 responses                        │  │
│  │ [👁️] [✏️] [✅] [❌] [🗑️]                           │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 🟠 HIGH - A+ Blood Request           [PENDING]      │  │
│  │ Patient: Emma T.                                    │  │
│  │ ... (more requests)                                 │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## ADMIN DASHBOARD

### 7. User Management Page
```
┌─────────────────────────────────────────────────────────────┐
│  👥 User Management                    📊 150 Total Users   │
│  Manage all users and verification status                   │
│                                                             │
│  ┌──────┬──────────┬────────┬──────────┐                  │
│  │Donors│Hospitals │Admins  │Unverified│                  │
│  │  95  │    45    │   10   │    12    │                  │
│  └──────┴──────────┴────────┴──────────┘                  │
│                                                             │
│  🔍 [Search by name or email... ]  [Role: All Roles ▼]    │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ User        │ Role     │ Verified  │ Joined  │ Actions│ │
│  ├──────────────────────────────────────────────────────┤ │
│  │ 👤 John Doe │ 🟦 DONOR │ ✅Verified│ Jan 15  │ 👁 ✏ 🗑│ │
│  │ john@..com  │          │           │ 2024    │        │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │ 👤 Jane S.  │ 🟩 HOSP  │ ❌Unverif │ Feb 1   │ 👁 ✓ 🗑│ │
│  │ jane@..com  │          │           │ 2024    │        │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │ 👤 Admin    │ 🟪 ADMIN  │ ✅Verified│ Mar 1   │ 👁 ✏ 🗑│ │
│  │ admin@..com │          │           │ 2023    │        │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  [Modal: User Details]                                     │
│  ┌────────────────────────────────────────────────────┐   │
│  │  👤 John Doe                                       │   │
│  │  john.doe@email.com                                │   │
│  │                                                    │   │
│  │  Role: DONOR        Status: ✅ Verified            │   │
│  │  Member Since: Jan 15, 2024                        │   │
│  │  Last Login: 2 hours ago                           │   │
│  │                                                    │   │
│  │         [Close]        [❌ Unverify User]          │   │
│  └────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 8. Request Management Page
```
┌─────────────────────────────────────────────────────────────┐
│  📄 Emergency Requests Overview        📊 85 Total Requests │
│  Monitor all emergency requests across the network          │
│                                                             │
│  ┌─────┬──────┬─────────┬──────┬───────────┐              │
│  │Total│Pend. │Fulfilled│Urgent│In Progress│              │
│  │  85 │  12  │    65   │  8   │     5     │              │
│  └─────┴──────┴─────────┴──────┴───────────┘              │
│                                                             │
│  [Status: All ▼]  [Priority: All ▼]                       │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Request    │ Patient  │ Hospital  │ Status  │ Priority│ │
│  ├──────────────────────────────────────────────────────┤ │
│  │ 💉 O+ - 2u │ Michael  │ City      │ 🟢Done  │ 🔴Urgent│ │
│  │ Mar 1, 2024│ R.       │ Hosp      │         │         │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │ 💉 A+ - 1u │ Sarah T. │ General   │ 🟡Pend  │ 🟠High  │ │
│  │ Mar 3, 2024│          │ Hosp      │         │         │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │ 💉 B+ - 3u │ James K. │ Community │ 🔵Prog  │ 🔵Norm  │ │
│  │ Mar 2, 2024│          │ Clinic    │         │         │ │
│  └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 9. Analytics Page
```
┌─────────────────────────────────────────────────────────────┐
│  📊 System Analytics                                        │
│  Comprehensive insights and statistics                      │
│                                                             │
│  ┌──────────┬──────────┬──────────┬──────────┐            │
│  │ 👥 150   │ 💉 85    │ ✅ 65    │ 📈 76%   │            │
│  │Total Usrs│Total Req │Completed │Success   │            │
│  └──────────┴──────────┴──────────┴──────────┘            │
│                                                             │
│  🩸 Blood Group Distribution                                │
│  ┌────┬────┬────┬────┬────┬────┬────┬────┐               │
│  │A+  │A-  │B+  │B-  │AB+ │AB- │O+  │O-  │               │
│  │ 25 │ 10 │ 20 │ 8  │ 15 │ 5  │ 45 │ 22 │               │
│  └────┴────┴────┴────┴────┴────┴────┴────┘               │
│                                                             │
│  👥 User Role Breakdown                                     │
│  ┌────────────┬────────────┬────────────┐                 │
│  │ 👥 95      │ 🏥 45      │ 👨‍💼 10      │                 │
│  │ DONORS     │ HOSPITALS  │ ADMINS     │                 │
│  │Active blood│Registered  │System      │                 │
│  │donors      │hospitals   │administrators                │
│  └────────────┴────────────┴────────────┘                 │
│                                                             │
│  🕐 Recent Activity                                         │
│  • 🏥 New emergency request created (2 hours ago)          │
│  • ❤️ Donor responded to alert (3 hours ago)               │
│  • ✅ Request marked as fulfilled (5 hours ago)            │
│  • 👤 New user registered (6 hours ago)                    │
│                                                             │
│  💚 System Status                                           │
│  All systems operational                                    │
│  ✓ Database: Healthy                                        │
│  ✓ API: Responsive                                          │
│  ✓ Email Service: Active                                    │
└─────────────────────────────────────────────────────────────┘
```

### 10. System Settings Page
```
┌─────────────────────────────────────────────────────────────┐
│  ⚙️ System Settings                                         │
│  Configure system-wide settings and preferences             │
│                                                             │
│  🌐 General Settings                                        │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ System Name                                         │  │
│  │ [Blood Network                                  ]   │  │
│  │                                                     │  │
│  │ Maintenance Mode                           [OFF]    │  │
│  │ Disable user access during maintenance              │  │
│  │                                                     │  │
│  │ Auto-Verify New Users                      [OFF]    │  │
│  │ Automatically verify new registrations              │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  🔔 Notification Settings                                   │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Email Notifications                        [ON] ✓   │  │
│  │ Send email alerts for emergency requests            │  │
│  │                                                     │  │
│  │ SMS Notifications                          [OFF]    │  │
│  │ Send SMS alerts for urgent requests                 │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  🩸 Blood Request Configuration                             │
│  ┌─────────────────┬─────────────────┐                    │
│  │ Max Units/Req   │ Emergency Thresh│                    │
│  │ [50       ]     │ [10       ]     │                    │
│  └─────────────────┴─────────────────┘                    │
│                                                             │
│  💾 Data Management                                         │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Data Retention (days)                               │  │
│  │ [365                                            ]   │  │
│  │                                                     │  │
│  │ [⬇ Export] [⬆ Import] [🔄 Clear Cache]             │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  🔒 Security Settings                                       │
│  • Change Admin Password                          →        │
│  • Two-Factor Authentication                      →        │
│  • Session Management                             →        │
│                                                             │
│                              [💾 Save All Settings]        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Coding Legend

### Status Colors
- 🟢 **Green** = Success, Fulfilled, Available, Verified
- 🟡 **Yellow** = Pending, Warning
- 🔴 **Red** = Urgent, Error, Unavailable
- 🟠 **Orange** = High Priority
- 🔵 **Blue** = Normal, Info
- 🟣 **Purple** = Admin
- ⚪ **Gray** = Neutral, Disabled

### Role Icons
- ❤️ / 👤 = Donor
- 🏥 = Hospital
- 👨‍💼 = Admin
- 🩸 / 💉 = Blood/Medical
- 📄 = Document/Request
- 📊 = Analytics
- ⚙️ = Settings

---

## 📱 Responsive Behavior

### Desktop (> 1024px)
- 3-4 column grids
- Full tables visible
- Side-by-side forms
- Expanded layouts

### Tablet (768px - 1024px)
- 2 column grids
- Scrollable tables
- Stacked form sections
- Compact layouts

### Mobile (< 768px)
- 1 column grids
- Card-based tables
- Single-column forms
- Collapsed sections

---

**All pages are fully responsive and production-ready!** 🚀
