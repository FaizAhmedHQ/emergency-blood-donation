import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/api';
import { Heart, AlertTriangle, Droplet, Calendar, Clock, MapPin, User, Phone, Mail, FileText, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

const HospitalRequestForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bloodType: '',
    unitsNeeded: 1,
    patientName: '',
    patientAge: '',
    urgency: 'NORMAL',
    date: new Date().toISOString().split('T')[0],
    time: '',
    location: '',
    description: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/hospital/request', formData);
      alert('Emergency request created successfully!');
      navigate('/dashboard/hospital/requests');
    } catch (error) {
      alert('Error creating request: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Create Emergency Request</h1>
            <p className="text-gray-600">Submit urgent blood request to find donors</p>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mt-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900">Important Information</p>
              <ul className="text-sm text-yellow-800 mt-1 space-y-1">
                <li>• Double-check all information before submitting</li>
                <li>• Urgent requests will be sent to matching donors immediately</li>
                <li>• Keep your contact information accessible for donor coordination</li>
                <li>• Update request status once fulfilled</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Request Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          Request Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blood Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Droplet className="h-4 w-4 inline mr-1 text-red-600" />
              Blood Type Required *
            </label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Units Needed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Heart className="h-4 w-4 inline mr-1 text-red-600" />
              Units Needed *
            </label>
            <input
              type="number"
              name="unitsNeeded"
              value={formData.unitsNeeded}
              onChange={handleChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Patient Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-1 text-blue-600" />
              Patient Name *
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              placeholder="Enter patient's full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Patient Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-1 text-blue-600" />
              Patient Age
            </label>
            <input
              type="text"
              name="patientAge"
              value={formData.patientAge}
              onChange={handleChange}
              placeholder="e.g., 45 years"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <AlertTriangle className="h-4 w-4 inline mr-1 text-orange-600" />
              Urgency Level *
            </label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="NORMAL">Normal</option>
              <option value="HIGH">High Priority</option>
              <option value="URGENT">Urgent - Critical</option>
            </select>
          </div>

          {/* Date Needed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-1 text-green-600" />
              Date Needed *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="h-4 w-4 inline mr-1 text-purple-600" />
              Preferred Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1 text-red-600" />
              Hospital/Clinic Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Hospital name and address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="h-4 w-4 inline mr-1 text-blue-600" />
            Additional Notes / Medical Condition
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the emergency situation, patient condition, or any special requirements..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Contact Information */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-1 text-blue-600" />
                Contact Person *
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                placeholder="Doctor/Staff name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 inline mr-1 text-green-600" />
                Contact Phone *
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
                placeholder="Emergency contact number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-1 text-blue-600" />
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="hospital@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/dashboard/hospital/requests')}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-5 w-5" />
            <span>{loading ? 'Submitting...' : 'Submit Emergency Request'}</span>
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default HospitalRequestForm;