import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/api';
import { AlertTriangle, Bell, MapPin, Droplet, Calendar, Clock, Phone, Mail, CheckCircle, XCircle, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const EmergencyAlerts = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('/donor/nearby-requests');
      setAlerts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (alertId) => {
    try {
      await axios.post(`/emergency/${alertId}/respond`);
      alert('Thank you! Your response has been recorded.');
      fetchAlerts();
    } catch (error) {
      alert('Error responding to alert');
    }
  };

  const filteredAlerts = filterStatus === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.status === filterStatus);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Bell className="h-8 w-8 mr-3 text-red-600" />
              Emergency Alerts
            </h1>
            <p className="text-gray-600 mt-2">Urgent blood requests in your area</p>
          </div>
          <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="font-bold text-red-700">{alerts.length} Active Requests</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 border-b">
          {['all', 'urgent', 'pending', 'fulfilled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 font-medium transition-colors ${
                filterStatus === status
                  ? 'border-b-2 border-red-600 text-red-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Alerts List */}
      {filteredAlerts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-12 border border-gray-100 text-center"
        >
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Alerts Found</h3>
          <p className="text-gray-600">
            {filterStatus === 'all' 
              ? "There are no emergency requests in your area right now."
              : `No ${filterStatus} alerts at the moment.`}
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${
                alert.priority === 'URGENT' 
                  ? 'border-red-600 bg-red-50' 
                  : alert.priority === 'HIGH' 
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-yellow-600'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full ${
                    alert.priority === 'URGENT' 
                      ? 'bg-red-600' 
                      : alert.priority === 'HIGH'
                      ? 'bg-orange-600'
                      : 'bg-yellow-600'
                  }`}>
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {alert.bloodType} Blood Needed
                    </h3>
                    <p className="text-gray-600">{alert.hospitalName || 'Hospital Request'}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  alert.status === 'FULFILLED'
                    ? 'bg-green-100 text-green-800'
                    : alert.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {alert.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Droplet className="h-5 w-5 text-red-600" />
                  <span><strong>Blood Type:</strong> {alert.bloodType}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span><strong>Location:</strong> {alert.location || 'Not specified'}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <span><strong>Date:</strong> {new Date(alert.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span><strong>Time:</strong> {alert.time || 'Anytime'}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                <strong>Patient:</strong> {alert.patientName || 'Anonymous'} - 
                <strong> Units Needed:</strong> {alert.unitsNeeded || 1}
              </p>

              {alert.description && (
                <div className="bg-white p-4 rounded-lg mb-4">
                  <p className="text-gray-700"><strong>Note:</strong> {alert.description}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Posted {new Date(alert.createdAt).toLocaleDateString()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{alert.distance || 'Unknown'} away</span>
                  </span>
                </div>

                {alert.status !== 'FULFILLED' && (
                  <button
                    onClick={() => handleRespond(alert.id)}
                    className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    <Phone className="h-5 w-5" />
                    <span>I Can Donate</span>
                  </button>
                )}

                {alert.status === 'FULFILLED' && (
                  <span className="flex items-center space-x-2 text-green-600 font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    <span>Fulfilled</span>
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Information Box */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 rounded-xl p-6 border border-blue-100"
      >
        <h3 className="font-bold text-blue-900 mb-2">How Emergency Alerts Work</h3>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>• You receive alerts for blood requests matching your blood type in your area</li>
          <li>• Click "I Can Donate" to respond to an urgent request</li>
          <li>• The hospital will contact you directly with next steps</li>
          <li>• Keep your contact information updated in your profile</li>
          <li>• Only respond if you're eligible and available to donate</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default EmergencyAlerts;