import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DonorDashboardPage from './pages/DonorDashboardPage';
import HospitalDashboardPage from './pages/HospitalDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Dashboard Components
import DonorProfile from './components/dashboard/DonorProfile';
import EmergencyAlerts from './components/dashboard/EmergencyAlerts';
import DonationHistory from './components/dashboard/DonationHistory';
import HospitalRequestForm from './components/dashboard/HospitalRequestForm';
import DonorSearch from './components/dashboard/DonorSearch';
import HospitalRequests from './components/dashboard/HospitalRequests';
import AdminUsers from './components/dashboard/AdminUsers';
import AdminRequests from './components/dashboard/AdminRequests';
import Analytics from './components/dashboard/Analytics';
import AdminSettings from './components/dashboard/AdminSettings';
import DashboardHome from './components/dashboard/DashboardHome';

const App = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard/donor" 
              element={
                <ProtectedRoute allowedRoles={['DONOR']}>
                  <DonorDashboardPage />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="profile" element={<DonorProfile />} />
              <Route path="alerts" element={<EmergencyAlerts />} />
              <Route path="history" element={<DonationHistory />} />
            </Route>
            
            <Route 
              path="/dashboard/hospital" 
              element={
                <ProtectedRoute allowedRoles={['HOSPITAL']}>
                  <HospitalDashboardPage />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="request" element={<HospitalRequestForm />} />
              <Route path="donors" element={<DonorSearch />} />
              <Route path="requests" element={<HospitalRequests />} />
            </Route>
            
            <Route 
              path="/dashboard/admin" 
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="requests" element={<AdminRequests />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default App;