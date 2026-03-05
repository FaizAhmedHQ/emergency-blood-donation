import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/api';
import { User, MapPin, Phone, Mail, Calendar, Droplet, Activity, CheckCircle, Edit2, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

const DonorProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/donor/profile');
      setProfile(response.data.data);
      setFormData(response.data.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put('/donor/profile', formData);
      setProfile(formData);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile');
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
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-4 rounded-full">
              <User className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{profile?.name || user?.name}</h1>
              <p className="text-gray-600">Blood Donor</p>
            </div>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {editing ? <X className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
            <span>{editing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <Droplet className="h-6 w-6 text-blue-600 mb-2" />
            <p className="text-sm text-gray-600">Blood Group</p>
            <p className="text-xl font-bold text-gray-800">{profile?.bloodGroup || 'O+'}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <Activity className="h-6 w-6 text-green-600 mb-2" />
            <p className="text-sm text-gray-600">Availability</p>
            <p className="text-xl font-bold text-gray-800">{profile?.isAvailable ? 'Available' : 'Not Available'}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <CheckCircle className="h-6 w-6 text-purple-600 mb-2" />
            <p className="text-sm text-gray-600">Verification</p>
            <p className="text-xl font-bold text-gray-800">{user?.isVerified ? 'Verified' : 'Pending'}</p>
          </div>
        </div>
      </motion.div>

      {/* Personal Information */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <User className="h-5 w-5 mr-2 text-blue-600" />
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            {editing ? (
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{profile?.name || user?.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-400" />
              <p className="text-gray-800">{profile?.email || user?.email}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-gray-400" />
              {editing ? (
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800">{profile?.phone || 'Not provided'}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              {editing ? (
                <input
                  type="date"
                  value={formData.dateOfBirth || ''}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800">{profile?.dateOfBirth || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        {editing && (
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setEditing(false)}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="h-5 w-5" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </motion.div>

      {/* Medical Information */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Droplet className="h-5 w-5 mr-2 text-red-600" />
          Blood & Medical Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
            {editing ? (
              <select
                value={formData.bloodGroup || ''}
                onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            ) : (
              <p className="text-gray-800 font-semibold">{profile?.bloodGroup || 'Not specified'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability Status</label>
            {editing ? (
              <select
                value={formData.isAvailable ? 'true' : 'false'}
                onChange={(e) => setFormData({...formData, isAvailable: e.target.value === 'true'})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="true">Available to Donate</option>
                <option value="false">Currently Unavailable</option>
              </select>
            ) : (
              <p className={`font-semibold ${profile?.isAvailable ? 'text-green-600' : 'text-gray-600'}`}>
                {profile?.isAvailable ? '✓ Available to Donate' : '✗ Currently Unavailable'}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Location/City</label>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              {editing ? (
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your city"
                />
              ) : (
                <p className="text-gray-800">{profile?.location || 'Not provided'}</p>
              )}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Medical Notes/Conditions</label>
            {editing ? (
              <textarea
                value={formData.medicalNotes || ''}
                onChange={(e) => setFormData({...formData, medicalNotes: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Any medical conditions or notes..."
              />
            ) : (
              <p className="text-gray-800">{profile?.medicalNotes || 'No medical notes on file'}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Donation Preferences */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Donation Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Preferred Donation Type</p>
              <p className="text-sm text-gray-600">Whole Blood, Plasma, Platelets, etc.</p>
            </div>
            <span className="text-gray-800 font-semibold">{profile?.donationType || 'Whole Blood'}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Last Donation Date</p>
              <p className="text-sm text-gray-600">When you last donated blood</p>
            </div>
            <span className="text-gray-800 font-semibold">{profile?.lastDonationDate || 'Never'}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Next Eligible Date</p>
              <p className="text-sm text-gray-600">When you can donate again</p>
            </div>
            <span className="text-gray-800 font-semibold">{profile?.nextDonationDate || 'Immediately'}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DonorProfile;