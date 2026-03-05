import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/api';
import { FileText, AlertTriangle, Calendar, Clock, MapPin, Droplet, User, Phone, CheckCircle, XCircle, Edit2, Trash2, Eye, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HospitalRequests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/hospital/requests');
      setRequests(response.data.data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (requestId) => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    
    try {
      await axios.delete(`/hospital/request/${requestId}`);
      alert('Request deleted successfully');
      fetchRequests();
    } catch (error) {
      alert('Error deleting request');
    }
  };

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      await axios.put(`/hospital/request/${requestId}`, { status: newStatus });
      alert(`Request marked as ${newStatus}`);
      fetchRequests();
    } catch (error) {
      alert('Error updating status');
    }
  };

  const filteredRequests = filterStatus === 'all' 
    ? requests 
    : requests.filter(req => req.status === filterStatus);

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
              <FileText className="h-8 w-8 mr-3 text-blue-600" />
              My Requests
            </h1>
            <p className="text-gray-600 mt-2">Manage and track your hospital's blood requests</p>
          </div>
          <button
            onClick={() => navigate('/dashboard/hospital/request')}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Request</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-600 font-medium">Total Requests</p>
            <p className="text-2xl font-bold text-blue-900">{requests.length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <p className="text-sm text-yellow-600 font-medium">Pending</p>
            <p className="text-2xl font-bold text-yellow-900">
              {requests.filter(r => r.status === 'PENDING').length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <p className="text-sm text-green-600 font-medium">Fulfilled</p>
            <p className="text-2xl font-bold text-green-900">
              {requests.filter(r => r.status === 'FULFILLED').length}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <p className="text-sm text-red-600 font-medium">Urgent</p>
            <p className="text-2xl font-bold text-red-900">
              {requests.filter(r => r.urgency === 'URGENT').length}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 border-b mt-6">
          {['all', 'PENDING', 'IN_PROGRESS', 'FULFILLED', 'CANCELLED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 font-medium transition-colors ${
                filterStatus === status
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-12 border border-gray-100 text-center"
        >
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {filterStatus === 'all' ? 'No Requests Yet' : `No ${filterStatus} Requests`}
          </h3>
          <p className="text-gray-600 mb-4">
            {filterStatus === 'all' 
              ? "You haven't created any blood requests yet." 
              : `No requests with ${filterStatus} status.`}
          </p>
          {filterStatus === 'all' && (
            <button
              onClick={() => navigate('/dashboard/hospital/request')}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Create Your First Request</span>
            </button>
          )}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full ${
                    request.urgency === 'URGENT' ? 'bg-red-600' :
                    request.urgency === 'HIGH' ? 'bg-orange-600' : 'bg-blue-600'
                  }`}>
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {request.bloodType} Blood Request
                    </h3>
                    <p className="text-gray-600">Patient: {request.patientName}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  request.status === 'FULFILLED' ? 'bg-green-100 text-green-800' :
                  request.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {request.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Droplet className="h-5 w-5 text-red-600" />
                  <span><strong>Blood Type:</strong> {request.bloodType}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-5 w-5 text-blue-600" />
                  <span><strong>Units:</strong> {request.unitsNeeded}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <span><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <span><strong>Location:</strong> {request.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Phone className="h-5 w-5 text-orange-600" />
                  <span><strong>Contact:</strong> {request.contactPhone}</span>
                </div>
              </div>

              {request.description && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700"><strong>Note:</strong> {request.description}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Created {new Date(request.createdAt).toLocaleDateString()}</span>
                  </span>
                  {request.responses && (
                    <span className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{request.responses.length} responses</span>
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Details">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Edit">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  {request.status !== 'FULFILLED' && (
                    <button 
                      onClick={() => handleUpdateStatus(request.id, 'FULFILLED')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" 
                      title="Mark as Fulfilled"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                  )}
                  {request.status === 'PENDING' && (
                    <button 
                      onClick={() => handleUpdateStatus(request.id, 'CANCELLED')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" 
                      title="Cancel Request"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(request.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" 
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HospitalRequests;