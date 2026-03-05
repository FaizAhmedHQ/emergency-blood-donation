import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/api';
import { Users, Search, MapPin, Droplet, Phone, Mail, Calendar, Heart, Filter, UserCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const DonorSearch = () => {
  const { user } = useAuth();
  const [searchCriteria, setSearchCriteria] = useState({
    bloodType: '',
    location: '',
    availability: 'available'
  });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);

    try {
      const response = await axios.get('/hospital/donors', {
        params: searchCriteria
      });
      setDonors(response.data.data || []);
    } catch (error) {
      console.error('Error searching donors:', error);
      alert('Error searching donors');
    } finally {
      setLoading(false);
    }
  };

  const handleContactDonor = (donor) => {
    // In a real app, this would send a message through the system
    alert(`Contact request sent to ${donor.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Find Donors</h1>
            <p className="text-gray-600">Search for compatible blood donors</p>
          </div>
        </div>
      </motion.div>

      {/* Search Form */}
      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-blue-600" />
          Search Criteria
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Blood Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Droplet className="h-4 w-4 inline mr-1 text-red-600" />
              Blood Type
            </label>
            <select
              value={searchCriteria.bloodType}
              onChange={(e) => setSearchCriteria({...searchCriteria, bloodType: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Blood Types</option>
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

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1 text-blue-600" />
              Location/City
            </label>
            <input
              type="text"
              value={searchCriteria.location}
              onChange={(e) => setSearchCriteria({...searchCriteria, location: e.target.value})}
              placeholder="Enter city or area"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <UserCheck className="h-4 w-4 inline mr-1 text-green-600" />
              Availability Status
            </label>
            <select
              value={searchCriteria.availability}
              onChange={(e) => setSearchCriteria({...searchCriteria, availability: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="available">Available Now</option>
              <option value="all">All Donors</option>
              <option value="unavailable">Currently Unavailable</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Search className="h-5 w-5" />
            <span>{loading ? 'Searching...' : 'Search Donors'}</span>
          </button>
        </div>
      </motion.form>

      {/* Search Results */}
      {!hasSearched ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-12 border border-gray-100 text-center"
        >
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Start Your Search</h3>
          <p className="text-gray-600">Use the filters above to find compatible donors in your area.</p>
        </motion.div>
      ) : donors.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-12 border border-gray-100 text-center"
        >
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Donors Found</h3>
          <p className="text-gray-600">No donors match your search criteria. Try adjusting your filters.</p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Found {donors.length} Compatible Donor{donors.length !== 1 ? 's' : ''}
            </h2>
            <div className="text-sm text-gray-600">
              Showing results based on your criteria
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.map((donor, index) => (
              <motion.div
                key={donor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-3 rounded-full">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{donor.name}</h3>
                      <p className="text-sm text-gray-600">{donor.age || 'Age not specified'}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    donor.isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {donor.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Droplet className="h-4 w-4 text-red-600" />
                    <span className="font-semibold">{donor.bloodGroup}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>{donor.location || 'Location not specified'}</span>
                  </div>
                  {donor.lastDonationDate && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span>Last donation: {new Date(donor.lastDonationDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {donor.distance && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span>{donor.distance} away</span>
                    </div>
                  )}
                </div>

                {donor.medicalNotes && (
                  <div className="mb-4 p-2 bg-gray-50 rounded text-xs text-gray-700">
                    <strong>Note:</strong> {donor.medicalNotes}
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleContactDonor(donor)}
                    disabled={!donor.isAvailable}
                    className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      donor.isAvailable
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <Phone className="h-4 w-4" />
                    <span>Contact</span>
                  </button>
                  <button className="flex items-center justify-center p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                    <Mail className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Information Box */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 rounded-xl p-6 border border-blue-100"
      >
        <h3 className="font-bold text-blue-900 mb-2">How to Use Donor Search</h3>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>• Select the blood type you need from the dropdown</li>
          <li>• Enter your location to find nearby donors</li>
          <li>• Filter by availability to find ready donors</li>
          <li>• Click "Contact" to reach out to potential donors</li>
          <li>• Always verify donor eligibility before scheduling</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default DonorSearch;