@echo off
REM ============================================
REM Blood Network - Quick Start Script
REM ============================================

echo.
echo ============================================
echo    BLOOD NETWORK - STARTING ALL SERVICES
echo ============================================
echo.

REM Check if MongoDB is running
echo [CHECK] Verifying MongoDB...
mongosh --quiet --eval "db.version()" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] MongoDB is running
) else (
    echo [WARN] MongoDB may not be running. Please start MongoDB service.
)
echo.

REM Start Backend
echo [START] Starting Backend Server...
echo       This may take 30-60 seconds for first startup...
start cmd /k "cd backend ^&^& echo Starting Backend... ^&^& mvn spring-boot:run"
timeout /t 3 /nobreak >nul
echo.

REM Start Frontend  
echo [START] Starting Frontend Development Server...
start cmd /k "cd frontend ^&^& echo Starting Frontend... ^&^& npm run dev"
timeout /t 2 /nobreak >nul
echo.

echo ============================================
echo          SERVICES ARE STARTING
echo ============================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo Wait for both services to fully start...
echo.
echo Backend will show: "Started BloodNetworkApplication"
echo Frontend will show: "Local: http://localhost:5173"
echo.
echo Then open browser and login as admin!
echo.
echo Login credentials:
echo   Admin: admin@demo.com / password123
echo.
echo ============================================
echo.
pause
