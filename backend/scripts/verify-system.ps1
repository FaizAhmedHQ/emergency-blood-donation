# Blood Network - System Verification Script (PowerShell)
# Run this script to verify all services and database

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "   BLOOD NETWORK - SYSTEM VERIFICATION" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

# Step 1: Check if ports are in use
Write-Host "STEP 1: Checking if services are running...`n" -ForegroundColor Blue

$backendRunning = $false
$frontendRunning = $false

try {
    $backendPort = Get-NetTCPConnection -LocalPort 8080 -ErrorAction Stop
    Write-Host "✅ Backend is running on port 8080" -ForegroundColor Green
    $backendRunning = $true
} catch {
    Write-Host "❌ Backend is NOT running on port 8080" -ForegroundColor Red
    Write-Host "   → Run: cd backend; mvn spring-boot:run" -ForegroundColor Yellow
}

try {
    $frontendPort = Get-NetTCPConnection -LocalPort 5173 -ErrorAction Stop
    Write-Host "✅ Frontend is running on port 5173" -ForegroundColor Green
    $frontendRunning = $true
} catch {
    Write-Host "❌ Frontend is NOT running on port 5173" -ForegroundColor Red
    Write-Host "   → Run: cd frontend; npm run dev" -ForegroundColor Yellow
}

# Step 2: Check MongoDB
Write-Host "`nSTEP 2: Verifying MongoDB connection...`n" -ForegroundColor Blue

try {
    $mongoVersion = mongosh --quiet --eval "db.version()" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ MongoDB is running and accessible" -ForegroundColor Green
    } else {
        throw "MongoDB connection failed"
    }
} catch {
    Write-Host "❌ MongoDB is NOT running or not accessible" -ForegroundColor Red
    Write-Host "   → Start MongoDB service" -ForegroundColor Yellow
    exit 1
}

# Step 3: Check database content
Write-Host "`nSTEP 3: Checking database content...`n" -ForegroundColor Blue

$queries = @(
    @{ Query = 'db.users.countDocuments()'; Description = 'Total users' },
    @{ Query = 'db.users.countDocuments({role: "DONOR"})'; Description = 'Donor users' },
    @{ Query = 'db.users.countDocuments({role: "HOSPITAL"})'; Description = 'Hospital users' },
    @{ Query = 'db.users.countDocuments({role: "ADMIN"})'; Description = 'Admin users' },
    @{ Query = 'db.donor_profiles.countDocuments()'; Description = 'Donor profiles' },
    @{ Query = 'db.hospital_profiles.countDocuments()'; Description = 'Hospital profiles' },
    @{ Query = 'db.emergency_requests.countDocuments()'; Description = 'Emergency requests' }
)

$hasUsers = $false

foreach ($item in $queries) {
    try {
        $result = mongosh blood_network_db --quiet --eval $item.Query 2>&1
        $count = [int]::Parse($result.Trim())
        
        if ($item.Description -eq 'Total users' -and $count -gt 0) {
            $hasUsers = $true
        }
        
        if ($count -gt 0) {
            Write-Host "✅ $($item.Description): $count" -ForegroundColor Green
        } elseif ($item.Description -eq 'Total users') {
            Write-Host "⚠️  $($item.Description): $count (NO USERS FOUND!)" -ForegroundColor Red
        } else {
            Write-Host "ℹ️  $($item.Description): $count" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ Failed to check $($item.Description)" -ForegroundColor Red
    }
}

# Step 4: Show all users
Write-Host "`nSTEP 4: Displaying all users...`n" -ForegroundColor Blue

try {
    $usersQuery = 'db.users.find({}, {name: 1, email: 1, role: 1, isVerified: 1}).forEach(u => print(JSON.stringify(u)))'
    $usersResult = mongosh blood_network_db --quiet --eval $usersQuery 2>&1
    
    $users = $usersResult | Where-Object { $_.Trim() -ne '' }
    
    if ($users.Count -eq 0) {
        Write-Host "⚠️  No users found in database!" -ForegroundColor Yellow
    } else {
        foreach ($userJson in $users) {
            try {
                $user = $userJson | ConvertFrom-Json
                $verified = if ($user.isVerified) { "✅" } else { "❌" }
                Write-Host "  👤 $($user.name.PadRight(25)) | $($user.email.PadRight(30)) | $($user.role.PadRight(8)) | $verified" -ForegroundColor Cyan
            } catch {
                # Skip parsing errors
            }
        }
    }
} catch {
    Write-Host "❌ Failed to retrieve users" -ForegroundColor Red
}

# Step 5: Test API endpoint
Write-Host "`nSTEP 5: Testing API endpoint...`n" -ForegroundColor Blue

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/admin/users" -TimeoutSec 2 -UseBasicParsing 2>&1
    Write-Host "ℹ️  API endpoint exists (authentication required)" -ForegroundColor Yellow
    Write-Host "   → Login as admin in browser to test with authentication" -ForegroundColor Cyan
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "✅ API endpoint accessible (401 Unauthorized = working)" -ForegroundColor Green
        Write-Host "   → Login required to access data" -ForegroundColor Cyan
    } else {
        Write-Host "❌ API endpoint not accessible" -ForegroundColor Red
    }
}

# Provide fix commands if no users
if (-not $hasUsers) {
    Write-Host "`n🔧 QUICK FIX - Create Test Users:`n" -ForegroundColor Blue
    Write-Host "Copy and paste this into MongoDB Compass mongosh terminal:`n" -ForegroundColor Yellow
    Write-Host "─" * 60 -ForegroundColor Cyan
    Write-Host @"
use blood_network_db

db.users.insertMany([
  {
    name: "System Administrator",
    email: "admin@bloodnetwork.com",
    password: "`$2a`$10`$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K",
    role: "ADMIN",
    isVerified: true,
    createdAt: new Date()
  },
  {
    name: "John Donor",
    email: "donor@test.com",
    password: "`$2a`$10`$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K",
    role: "DONOR",
    isVerified: true,
    createdAt: new Date()
  },
  {
    name: "City General Hospital",
    email: "hospital@test.com",
    password: "`$2a`$10`$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K",
    role: "HOSPITAL",
    isVerified: true,
    createdAt: new Date()
  }
])

print("✅ Test users created!")
"@
    Write-Host "─" * 60 -ForegroundColor Cyan
    Write-Host "`nThen refresh your Admin User Management page!`n" -ForegroundColor Green
}

# Final Summary
Write-Host "`n📊 ============================================" -ForegroundColor Cyan
Write-Host "           VERIFICATION SUMMARY" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

$checks = @(
    @{ Name = 'Backend Running'; Status = $backendRunning },
    @{ Name = 'Frontend Running'; Status = $frontendRunning },
    @{ Name = 'MongoDB Connected'; Status = $true },
    @{ Name = 'Users in Database'; Status = $hasUsers }
)

$passedCount = ($checks | Where-Object { $_.Status }).Count
$totalCount = $checks.Count

foreach ($check in $checks) {
    $icon = if ($check.Status) { "✅" } else { "❌" }
    $status = if ($check.Status) { "PASS" } else { "FAIL" }
    $color = if ($check.Status) { "Green" } else { "Red" }
    
    Write-Host "$icon $($check.Name): $status" -ForegroundColor $color
}

Write-Host "`n──────────────────────────────────────────────" -ForegroundColor Cyan
Write-Host "Total: $passedCount/$totalCount checks passed" -ForegroundColor Cyan

if ($passedCount -eq $totalCount) {
    Write-Host "`n🎉 ALL CHECKS PASSED! System is ready!" -ForegroundColor Green
    Write-Host "`n📝 LOGIN CREDENTIALS:" -ForegroundColor Yellow
    Write-Host "   Admin:   admin@bloodnetwork.com / password123" -ForegroundColor Cyan
    Write-Host "   Donor:   donor@test.com / password123" -ForegroundColor Cyan
    Write-Host "   Hospital: hospital@test.com / password123" -ForegroundColor Cyan
} elseif (-not $hasUsers) {
    Write-Host "`n⚠️  ACTION REQUIRED: Create test users (see commands above)" -ForegroundColor Red
} else {
    Write-Host "`n⚠️  Some checks failed. Review the logs above." -ForegroundColor Yellow
}

Write-Host "`n============================================`n" -ForegroundColor Cyan
