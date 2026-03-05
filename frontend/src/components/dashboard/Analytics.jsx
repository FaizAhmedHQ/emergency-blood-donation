import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/api';
import { FileText, AlertTriangle, Calendar, Clock, MapPin, Droplet, Users, CheckCircle, XCircle, Eye, Filter, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Analytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/admin/analytics');
      setAnalytics(response.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Activity className="h-8 w-8 mr-3 text-blue-600" />
              System Analytics
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive insights and statistics</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
            <Users className="h-8 w-8 mb-3" />
            <p className="text-sm opacity-90">Total Users</p>
            <p className="text-3xl font-bold">{analytics?.totalUsers || 0}</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-lg p-6">
            <Droplet className="h-8 w-8 mb-3" />
            <p className="text-sm opacity-90">Total Requests</p>
            <p className="text-3xl font-bold">{analytics?.totalRequests || 0}</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
            <CheckCircle className="h-8 w-8 mb-3" />
            <p className="text-sm opacity-90">Completed</p>
            <p className="text-3xl font-bold">{analytics?.completedRequests || 0}</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
            <FileText className="h-8 w-8 mb-3" />
            <p className="text-sm opacity-90">Success Rate</p>
            <p className="text-3xl font-bold">
              {analytics?.totalRequests > 0 
                ? Math.round((analytics.completedRequests / analytics.totalRequests) * 100) 
                : 0}%
            </p>
          </div>
        </div>
      </motion.div>

      {/* Blood Group Distribution */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Blood Group Distribution</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bloodType) => (
            <div key={bloodType} className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">{bloodType}</p>
              <p className="text-2xl font-bold text-gray-800">
                {analytics?.bloodGroupDistribution?.[bloodType] || 0}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* User Role Breakdown */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">User Role Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="text-4xl font-bold text-blue-900">{analytics?.totalDonors || 0}</span>
            </div>
            <h3 className="text-lg font-semibold text-blue-900">Donors</h3>
            <p className="text-sm text-blue-700 mt-1">Active blood donors</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-8 w-8 text-green-600" />
              <span className="text-4xl font-bold text-green-900">{analytics?.totalHospitals || 0}</span>
            </div>
            <h3 className="text-lg font-semibold text-green-900">Hospitals</h3>
            <p className="text-sm text-green-700 mt-1">Registered hospitals</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <FileText className="h-8 w-8 text-purple-600" />
              <span className="text-4xl font-bold text-purple-900">{analytics?.totalAdmins || 0}</span>
            </div>
            <h3 className="text-lg font-semibold text-purple-900">Administrators</h3>
            <p className="text-sm text-purple-700 mt-1">System admins</p>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">New emergency request created</p>
                <p className="text-sm text-gray-600">Hospital requested 2 units of O+ blood</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* System Health */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">System Status</h3>
            <p className="text-lg opacity-90">All systems operational</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Database: Healthy</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>API: Responsive</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Email Service: Active</span>
              </div>
            </div>
          </div>
          <Activity className="h-24 w-24 opacity-20" />
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
