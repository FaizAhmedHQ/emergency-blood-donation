import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Heart, Users, Activity, UserCheck, UserX, Clock } from 'lucide-react';
import axios from '../../utils/api';

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get('/dashboard/stats');
        setStats(response.data.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const getWelcomeMessage = () => {
    switch(user?.role) {
      case 'DONOR':
        return {
          title: "Welcome Back, Hero!",
          subtitle: "Ready to save more lives today?",
          icon: Heart,
          color: "text-red-500",
          bgColor: "bg-red-100"
        };
      case 'HOSPITAL':
        return {
          title: "Welcome Back!",
          subtitle: "Managing life-saving requests efficiently",
          icon: Activity,
          color: "text-blue-500",
          bgColor: "bg-blue-100"
        };
      case 'ADMIN':
        return {
          title: "Welcome Administrator!",
          subtitle: "Managing the network ecosystem",
          icon: Users,
          color: "text-purple-500",
          bgColor: "bg-purple-100"
        };
      default:
        return {
          title: "Welcome!",
          subtitle: "Your dashboard awaits",
          icon: Heart,
          color: "text-gray-500",
          bgColor: "bg-gray-100"
        };
    }
  };

  const getRoleStats = () => {
    if (!stats) return [];
    
    switch(user?.role) {
      case 'DONOR':
        return [
          { label: "Total Donors", value: stats.totalDonors, icon: Heart, color: "text-red-500" },
          { label: "Active Requests", value: stats.activeRequests, icon: Activity, color: "text-blue-500" },
          { label: "Verified Users", value: stats.verifiedUsers, icon: UserCheck, color: "text-green-500" }
        ];
      case 'HOSPITAL':
        return [
          { label: "Total Hospitals", value: stats.totalHospitals, icon: Activity, color: "text-blue-500" },
          { label: "Pending Requests", value: stats.pendingRequests, icon: Clock, color: "text-yellow-500" },
          { label: "Completed Requests", value: stats.completedRequests, icon: UserCheck, color: "text-green-500" }
        ];
      case 'ADMIN':
        return [
          { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-purple-500" },
          { label: "Total Requests", value: stats.totalRequests, icon: Activity, color: "text-blue-500" },
          { label: "Unverified Users", value: stats.unverifiedUsers, icon: UserX, color: "text-red-500" }
        ];
      default:
        return [
          { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-gray-500" },
          { label: "Active Requests", value: stats.activeRequests, icon: Activity, color: "text-blue-500" }
        ];
    }
  };

  const { title, subtitle, icon: Icon, color, bgColor } = getWelcomeMessage();
  const roleStats = getRoleStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <div className="flex items-center space-x-4">
          <div className={`${bgColor} p-3 rounded-lg`}>
            <Icon className={`h-8 w-8 ${color}`} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
            {stats && (
              <p className="text-sm text-gray-500 mt-1">
                Hello, {stats.userName} ({stats.userEmail})
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roleStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.label}</h3>
                <span className="text-3xl font-bold text-gray-800">{stat.value?.toLocaleString() || '0'}</span>
              </div>
              <div className={`${stat.color} bg-opacity-10 p-3 rounded-lg`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer">
            <h3 className="font-medium text-gray-800">View Profile</h3>
            <p className="text-sm text-gray-600 mt-1">Update your personal information</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors cursor-pointer">
            <h3 className="font-medium text-gray-800">Check Notifications</h3>
            <p className="text-sm text-gray-600 mt-1">See latest updates and alerts</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors cursor-pointer">
            <h3 className="font-medium text-gray-800">View Analytics</h3>
            <p className="text-sm text-gray-600 mt-1">Check your performance metrics</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;