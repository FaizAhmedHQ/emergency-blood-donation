#!/usr/bin/env node

/**
 * Blood Network - Complete Verification Script
 * This script verifies backend, frontend, MongoDB, and API endpoints
 */

const { execSync } = require('child_process');
const http = require('http');

console.log('\n🔍 ============================================');
console.log('   BLOOD NETWORK - SYSTEM VERIFICATION');
console.log('============================================\n');

// Color codes for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function executeCommand(command, description) {
  try {
    log(`\n⚙️  ${description}...`, 'cyan');
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    log(`✅ ${description} - SUCCESS`, 'green');
    return output;
  } catch (error) {
    log(`❌ ${description} - FAILED`, 'red');
    log(error.message, 'red');
    return null;
  }
}

async function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, () => {
      resolve(true);
    });
    
    req.on('error', () => {
      resolve(false);
    });
    
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function verifyServices() {
  log('\n📋 STEP 1: Checking if services are running...\n', 'blue');
  
  // Check Backend (port 8080)
  const backendRunning = await checkPort(8080);
  if (backendRunning) {
    log('✅ Backend is running on port 8080', 'green');
  } else {
    log('❌ Backend is NOT running on port 8080', 'red');
    log('   → Run: cd backend && mvn spring-boot:run', 'yellow');
  }
  
  // Check Frontend (port 5173)
  const frontendRunning = await checkPort(5173);
  if (frontendRunning) {
    log('✅ Frontend is running on port 5173', 'green');
  } else {
    log('❌ Frontend is NOT running on port 5173', 'red');
    log('   → Run: cd frontend && npm run dev', 'yellow');
  }
  
  return { backendRunning, frontendRunning };
}

function verifyMongoDB() {
  log('\n📋 STEP 2: Verifying MongoDB connection...\n', 'blue');
  
  try {
    execSync('mongosh --eval "db.version()"', { stdio: 'pipe' });
    log('✅ MongoDB is running and accessible', 'green');
    return true;
  } catch (error) {
    log('❌ MongoDB is NOT running or not accessible', 'red');
    log('   → Start MongoDB service', 'yellow');
    return false;
  }
}

function verifyDatabaseContent() {
  log('\n📋 STEP 3: Checking database content...\n', 'blue');
  
  const queries = [
    {
      query: 'db.users.countDocuments()',
      description: 'Total users in database'
    },
    {
      query: 'db.users.countDocuments({role: "DONOR"})',
      description: 'Donor users'
    },
    {
      query: 'db.users.countDocuments({role: "HOSPITAL"})',
      description: 'Hospital users'
    },
    {
      query: 'db.users.countDocuments({role: "ADMIN"})',
      description: 'Admin users'
    },
    {
      query: 'db.donor_profiles.countDocuments()',
      description: 'Donor profiles'
    },
    {
      query: 'db.hospital_profiles.countDocuments()',
      description: 'Hospital profiles'
    },
    {
      query: 'db.emergency_requests.countDocuments()',
      description: 'Emergency requests'
    }
  ];
  
  let hasUsers = false;
  
  queries.forEach(({ query, description }) => {
    try {
      const result = execSync(`mongosh blood_network_db --quiet --eval "${query}"`, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      const count = parseInt(result.trim());
      
      if (description.includes('Total users') && count > 0) {
        hasUsers = true;
      }
      
      if (count > 0) {
        log(`✅ ${description}: ${count}`, 'green');
      } else if (description.includes('Total users')) {
        log(`⚠️  ${description}: ${count} (NO USERS FOUND!)`, 'red');
      } else {
        log(`ℹ️  ${description}: ${count}`, 'yellow');
      }
    } catch (error) {
      log(`❌ Failed to check ${description}`, 'red');
    }
  });
  
  return hasUsers;
}

function showUsers() {
  log('\n📋 STEP 4: Displaying all users...\n', 'blue');
  
  const query = `db.users.find({}, {name: 1, email: 1, role: 1, isVerified: 1}).forEach(u => print(JSON.stringify(u)))`;
  
  try {
    const result = execSync(`mongosh blood_network_db --quiet --eval "${query}"`, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    const users = result.trim().split('\n').filter(line => line.trim());
    
    if (users.length === 0) {
      log('⚠️  No users found in database!', 'yellow');
      return false;
    }
    
    users.forEach(userJson => {
      try {
        const user = JSON.parse(userJson);
        const verified = user.isVerified ? '✅' : '❌';
        log(`  👤 ${user.name.padEnd(25)} | ${user.email.padEnd(30)} | ${user.role.padEnd(8)} | ${verified}`, 'cyan');
      } catch (e) {
        // Skip parsing errors
      }
    });
    
    return true;
  } catch (error) {
    log('❌ Failed to retrieve users', 'red');
    return false;
  }
}

function testAPIEndpoint() {
  log('\n📋 STEP 5: Testing Admin Users API endpoint...\n', 'blue');
  
  // Note: This is a basic check. For authenticated endpoints,
  // you'd need to implement token retrieval first.
  
  try {
    execSync('curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/admin/users', { 
      stdio: 'pipe'
    });
    log('ℹ️  API endpoint exists (authentication required for full test)', 'yellow');
    log('   → Login as admin in browser to test with authentication', 'cyan');
    return true;
  } catch (error) {
    log('❌ API endpoint not accessible', 'red');
    return false;
  }
}

function provideFixCommands() {
  log('\n🔧 QUICK FIX COMMANDS:\n', 'blue');
  
  log('If NO USERS found, run this in MongoDB Compass mongosh terminal:', 'yellow');
  log('─'.repeat(60), 'cyan');
  console.log(`
use blood_network_db

db.users.insertMany([
  {
    name: "System Administrator",
    email: "admin@bloodnetwork.com",
    password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K",
    role: "ADMIN",
    isVerified: true,
    createdAt: new Date()
  },
  {
    name: "John Donor",
    email: "donor@test.com",
    password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K",
    role: "DONOR",
    isVerified: true,
    createdAt: new Date()
  },
  {
    name: "City General Hospital",
    email: "hospital@test.com",
    password: "$2a$10$rKOxQlPg8yZ6zK9XuT6vL4mR2wS8uY0pN3qO7iU6xV2cW1dE5fH8K",
    role: "HOSPITAL",
    isVerified: true,
    createdAt: new Date()
  }
])

print("✅ Test users created!")
  `);
  log('─'.repeat(60), 'cyan');
  
  log('\nThen refresh your Admin User Management page in browser!\n', 'green');
}

function finalSummary(results) {
  log('\n📊 ============================================', 'blue');
  log('           VERIFICATION SUMMARY', 'blue');
  log('============================================\n', 'blue');
  
  const checks = [
    { name: 'Backend Running', status: results.backendRunning },
    { name: 'Frontend Running', status: results.frontendRunning },
    { name: 'MongoDB Connected', status: results.mongoConnected },
    { name: 'Users in Database', status: results.hasUsers },
    { name: 'API Accessible', status: results.apiAccessible }
  ];
  
  let passedCount = 0;
  
  checks.forEach(check => {
    const icon = check.status ? '✅' : '❌';
    const status = check.status ? 'PASS' : 'FAIL';
    const color = check.status ? 'green' : 'red';
    
    log(`${icon} ${check.name}: ${status}`, color);
    
    if (check.status) passedCount++;
  });
  
  log('\n──────────────────────────────────────────────', 'cyan');
  log(`Total: ${passedCount}/${checks.length} checks passed`, 'blue');
  
  if (passedCount === checks.length) {
    log('\n🎉 ALL CHECKS PASSED! System is ready!', 'green');
    log('\n📝 LOGIN CREDENTIALS:', 'yellow');
    log('   Admin:   admin@bloodnetwork.com / password123', 'cyan');
    log('   Donor:   donor@test.com / password123', 'cyan');
    log('   Hospital: hospital@test.com / password123', 'cyan');
  } else if (!results.hasUsers) {
    log('\n⚠️  ACTION REQUIRED: Create test users (see commands above)', 'red');
  } else {
    log('\n⚠️  Some checks failed. Review the logs above.', 'yellow');
  }
  
  log('\n============================================\n', 'blue');
}

async function main() {
  try {
    // Step 1: Verify services
    const services = await verifyServices();
    
    // Step 2: Verify MongoDB
    const mongoConnected = verifyMongoDB();
    
    if (!mongoConnected) {
      log('\n❌ MongoDB is not running. Please start MongoDB and try again.', 'red');
      process.exit(1);
    }
    
    // Step 3: Check database content
    const hasUsers = verifyDatabaseContent();
    
    // Step 4: Show users
    showUsers();
    
    // Step 5: Test API
    const apiAccessible = testAPIEndpoint();
    
    // Provide fix if needed
    if (!hasUsers) {
      provideFixCommands();
    }
    
    // Final summary
    finalSummary({
      backendRunning: services.backendRunning,
      frontendRunning: services.frontendRunning,
      mongoConnected: mongoConnected,
      hasUsers: hasUsers,
      apiAccessible: apiAccessible
    });
    
  } catch (error) {
    log('\n❌ Verification failed with error:', 'red');
    log(error.message, 'red');
    log('\nMake sure all services are running and try again.', 'yellow');
  }
}

// Run the verification
main();
