import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Settings, Bell, Shield, Database, Mail, Globe, Lock, Save, RefreshCw, Download, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    systemName: 'Blood Network',
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    autoVerifyUsers: false,
    maxRequestUnits: 50,
    emergencyThreshold: 10,
    dataRetentionDays: 365
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Settings className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>
            <p className="text-gray-600">Configure system-wide settings and preferences</p>
          </div>
        </div>
      </motion.div>

      {/* General Settings */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Globe className="h-5 w-5 mr-2 text-blue-600" />
          General Settings
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Name
            </label>
            <input
              type="text"
              value={settings.systemName}
              onChange={(e) => setSettings({...settings, systemName: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Maintenance Mode</p>
              <p className="text-sm text-gray-600">Disable user access during maintenance</p>
            </div>
            <button
              onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.maintenanceMode ? 'bg-red-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Auto-Verify New Users</p>
              <p className="text-sm text-gray-600">Automatically verify new registrations</p>
            </div>
            <button
              onClick={() => setSettings({...settings, autoVerifyUsers: !settings.autoVerifyUsers})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoVerifyUsers ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoVerifyUsers ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-yellow-600" />
          Notification Settings
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Email Notifications</p>
              <p className="text-sm text-gray-600">Send email alerts for emergency requests</p>
            </div>
            <button
              onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">SMS Notifications</p>
              <p className="text-sm text-gray-600">Send SMS alerts for urgent requests</p>
            </div>
            <button
              onClick={() => setSettings({...settings, smsNotifications: !settings.smsNotifications})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.smsNotifications ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Blood Request Configuration */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Droplet className="h-5 w-5 mr-2 text-red-600" />
          Blood Request Configuration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Units Per Request
            </label>
            <input
              type="number"
              value={settings.maxRequestUnits}
              onChange={(e) => setSettings({...settings, maxRequestUnits: parseInt(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Threshold (units)
            </label>
            <input
              type="number"
              value={settings.emergencyThreshold}
              onChange={(e) => setSettings({...settings, emergencyThreshold: parseInt(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Data Management */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Database className="h-5 w-5 mr-2 text-purple-600" />
          Data Management
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Retention Period (days)
            </label>
            <input
              type="number"
              value={settings.dataRetentionDays}
              onChange={(e) => setSettings({...settings, dataRetentionDays: parseInt(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-5 w-5" />
              <span>Export Data</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Upload className="h-5 w-5" />
              <span>Import Data</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <RefreshCw className="h-5 w-5" />
              <span>Clear Cache</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Security Settings */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Lock className="h-5 w-5 mr-2 text-green-600" />
          Security Settings
        </h2>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div>
              <p className="font-medium text-gray-800">Change Admin Password</p>
              <p className="text-sm text-gray-600">Update your administrator password</p>
            </div>
            <Shield className="h-5 w-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div>
              <p className="font-medium text-gray-800">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Enable 2FA for enhanced security</p>
            </div>
            <Lock className="h-5 w-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div>
              <p className="font-medium text-gray-800">Session Management</p>
              <p className="text-sm text-gray-600">Manage active sessions</p>
            </div>
            <Settings className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-end"
      >
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
        >
          <Save className="h-5 w-5" />
          <span>Save All Settings</span>
        </button>
      </motion.div>
    </div>
  );
};

export default AdminSettings;
