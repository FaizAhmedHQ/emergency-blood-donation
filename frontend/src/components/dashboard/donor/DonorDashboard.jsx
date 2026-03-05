import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, MapPin, UserCheck, AlertTriangle } from 'lucide-react';
import api from '../../../utils/api';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import LoadingSpinner from '../../common/LoadingSpinner';

const DonorDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState('AVAILABLE');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch donor profile
        const profileRes = await api.get('/donor/profile');
        setProfile(profileRes.data.data);
        setAvailability(profileRes.data.data.availabilityStatus);

        // Fetch nearby requests
        const requestsRes = await api.get('/donor/nearby-requests?page=0&size=5');
        setRequests(requestsRes.data.data.content || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleAvailability = async () => {
    try {
      const newStatus = availability === 'AVAILABLE' ? 'UNAVAILABLE' : 'AVAILABLE';
      await api.put('/donor/availability', { availabilityStatus: newStatus });
      setAvailability(newStatus);
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className={`text-lg font-semibold ${availability === 'AVAILABLE' ? 'text-green-600' : 'text-red-600'}`}>
                  {availability}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Blood Group</p>
                <p className="text-lg font-semibold text-gray-900">{profile?.bloodGroup || 'N/A'}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Donations</p>
                <p className="text-lg font-semibold text-gray-900">{profile?.donationCount || 0}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Urgent Requests</p>
                <p className="text-lg font-semibold text-gray-900">{requests.length}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Availability Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Your Availability</h3>
              <p className="text-gray-600">Toggle your availability to receive emergency requests</p>
            </div>
            <Button
              variant={availability === 'AVAILABLE' ? 'danger' : 'primary'}
              onClick={toggleAvailability}
            >
              {availability === 'AVAILABLE' ? 'Mark Unavailable' : 'Mark Available'}
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Nearby Emergency Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Emergency Requests</h3>
          {requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Blood Group: {request.bloodGroup}</h4>
                      <p className="text-sm text-gray-600">Units Required: {request.unitsRequired}</p>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          request.urgencyLevel === 'HIGH' 
                            ? 'bg-red-100 text-red-800' 
                            : request.urgencyLevel === 'MEDIUM'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {request.urgencyLevel} Priority
                        </span>
                      </div>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No emergency requests found in your area</p>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default DonorDashboard;