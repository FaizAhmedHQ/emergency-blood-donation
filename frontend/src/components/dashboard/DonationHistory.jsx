import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/api';
import { Heart, Calendar, Award, TrendingUp, Clock, MapPin, Droplet, Star, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const DonationHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/donor/history');
      setHistory(response.data.data || []);
      // Calculate stats from history
      calculateStats(response.data.data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (donations) => {
    const totalDonations = donations.length;
    const totalUnits = donations.reduce((sum, d) => sum + (d.units || 1), 0);
    const lastDonation = donations.length > 0 ? donations[0] : null;
    
    setStats({
      totalDonations,
      totalUnits,
      livesSaved: totalUnits * 3, // Each unit can save up to 3 lives
      lastDonationDate: lastDonation?.date || null,
      streak: calculateStreak(donations)
    });
  };

  const calculateStreak = (donations) => {
    if (donations.length === 0) return 0;
    // Simple streak calculation - months with at least one donation
    const months = new Set(donations.map(d => new Date(d.date).getMonth()));
    return months.size;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Achievement Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-lg p-6">
          <Heart className="h-8 w-8 mb-3" />
          <p className="text-sm opacity-90">Total Donations</p>
          <p className="text-3xl font-bold">{stats?.totalDonations || 0}</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
          <Droplet className="h-8 w-8 mb-3" />
          <p className="text-sm opacity-90">Units Donated</p>
          <p className="text-3xl font-bold">{stats?.totalUnits || 0}</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
          <Award className="h-8 w-8 mb-3" />
          <p className="text-sm opacity-90">Lives Saved</p>
          <p className="text-3xl font-bold">{stats?.livesSaved || 0}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
          <Star className="h-8 w-8 mb-3" />
          <p className="text-sm opacity-90">Donation Streak</p>
          <p className="text-3xl font-bold">{stats?.streak || 0} months</p>
        </div>
      </motion.div>

      {/* Last Donation Info */}
      {stats?.lastDonationDate && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Last Donation</h3>
                <p className="text-gray-600">{new Date(stats.lastDonationDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Next eligible in</p>
              <p className="text-xl font-bold text-green-600">45 days</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Donation Timeline */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FileText className="h-6 w-6 mr-2 text-blue-600" />
            Donation History
          </h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Download Report</span>
          </button>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Donations Yet</h3>
            <p className="text-gray-600">Your donation history will appear here once you start donating.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((donation, index) => (
              <motion.div
                key={donation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-l-4 border-red-600 pl-4 py-2 relative"
              >
                <div className="absolute left-0 top-0 w-3 h-3 bg-red-600 rounded-full transform -translate-x-1.5"></div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800">{donation.hospitalName || 'Blood Donation'}</h3>
                      <p className="text-sm text-gray-600">{donation.type || 'Whole Blood'}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      Completed
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>{new Date(donation.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span>{donation.location || 'Not specified'}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Units Donated</p>
                    <p className="font-bold text-gray-800">{donation.units || 1}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Blood Type</p>
                    <p className="font-bold text-gray-800">{donation.bloodType || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-bold text-gray-800">{donation.duration || '30 mins'}</p>
                  </div>
                </div>

                {donation.notes && (
                  <div className="mt-3 bg-white p-3 rounded border">
                    <p className="text-sm text-gray-700"><strong>Notes:</strong> {donation.notes}</p>
                  </div>
                )}

                {donation.certificate && (
                  <div className="mt-3 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Certificate
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Achievements & Milestones */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Award className="h-6 w-6 mr-2 text-yellow-600" />
          Achievements & Milestones
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 5, 10, 25, 50, 100].map((milestone) => {
            const achieved = (stats?.totalDonations || 0) >= milestone;
            return (
              <div 
                key={milestone}
                className={`p-4 rounded-lg border-2 ${
                  achieved 
                    ? 'border-yellow-600 bg-yellow-50' 
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Star className={`h-6 w-6 ${achieved ? 'text-yellow-600' : 'text-gray-400'}`} />
                  <h3 className="font-bold text-gray-800">{milestone} Donations</h3>
                </div>
                <p className="text-sm text-gray-600">
                  {achieved 
                    ? `Achieved on ${new Date(history[milestone-1]?.date).toLocaleDateString()}`
                    : `${milestone - (stats?.totalDonations || 0)} more to go!`}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Impact Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Your Total Impact</h3>
            <p className="text-lg opacity-90">You've helped save {stats?.livesSaved || 0} lives with your generous donations!</p>
          </div>
          <TrendingUp className="h-16 w-16 opacity-50" />
        </div>
      </motion.div>
    </div>
  );
};

export default DonationHistory;