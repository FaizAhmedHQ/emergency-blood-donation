$loginData = @{
    email = "admin@bloodnetwork.com"
    password = "password123"
} | ConvertTo-Json

Write-Host "Testing login with credentials:" -ForegroundColor Cyan
Write-Host "Email: admin@bloodnetwork.com" -ForegroundColor Yellow
Write-Host "Password: password123" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/login" -Method POST -Body $loginData -ContentType "application/json" -UseBasicParsing
    
    Write-Host "✅ LOGIN SUCCESSFUL!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Response Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Authorization Header Present: Yes" -ForegroundColor Green
    
    if ($response.Content) {
        Write-Host ""
        Write-Host "Response Body (first 200 chars):" -ForegroundColor Cyan
        Write-Host $response.Content.Substring(0, [Math]::Min(200, $response.Content.Length)) -ForegroundColor White
    }
    
} catch {
    Write-Host "❌ Login failed!" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode)" -ForegroundColor Yellow
    Write-Host ""
    
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "Invalid email or password!" -ForegroundColor Yellow
    } elseif ($_.Exception.Response.StatusCode -eq 403) {
        Write-Host "Access forbidden - check user status" -ForegroundColor Yellow
    } else {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}
