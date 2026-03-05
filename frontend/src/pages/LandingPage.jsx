import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, MapPin } from 'lucide-react';
import Header from '../components/common/Header';
import AnimatedCounter from '../components/common/AnimatedCounter';
import Button from '../components/ui/Button';

const LandingPage = () => {
  const stats = [
    { value: 1500, label: 'Active Donors' },
    { value: 50, label: 'Partner Hospitals' },
    { value: 3000, label: 'Lives Saved' },
    { value: 24, label: 'Hours Response' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-blue-600 opacity-10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Save Lives with <span className="text-red-600">Emergency</span> Blood & Organ Network
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connecting donors, hospitals, and medical professionals in real-time to ensure life-saving blood and organ donations reach patients in critical need.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button className="px-8 py-3 text-lg">Join as Donor</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="px-8 py-3 text-lg">
                    Partner with Us
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-r from-red-500 to-blue-500 rounded-xl p-1 mb-6">
                  <div className="bg-white rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-red-100 p-3 rounded-full">
                          <Heart className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="ml-3 text-lg font-semibold text-gray-900">Emergency Request</h3>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        URGENT
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Hospital needs O+ blood units urgently for surgery.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">10 units needed</span>
                      <Button size="sm">Respond Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                  <AnimatedCounter to={stat.value} />
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Our Network Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A seamless ecosystem connecting donors, hospitals, and administrators to facilitate life-saving donations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="h-12 w-12 text-red-600" />,
                title: "Emergency Requests",
                description: "Hospitals can instantly broadcast urgent blood and organ needs to qualified donors in their geographic area."
              },
              {
                icon: <Users className="h-12 w-12 text-blue-600" />,
                title: "Smart Matching",
                description: "Advanced algorithms match donors with compatible recipients based on blood type, location, and availability."
              },
              {
                icon: <Shield className="h-12 w-12 text-green-600" />,
                title: "Secure Platform",
                description: "HIPAA-compliant infrastructure ensures patient privacy and secure communication between parties."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="bg-white rounded-xl shadow-lg p-8 text-center h-full">
                  <div className="flex justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-blue-600">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Be Part of Something Bigger
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Join our network today and help save lives by becoming a donor or partnering with us as a healthcare facility.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button className="px-8 py-3 text-lg bg-white text-red-600 hover:bg-gray-100">
                  Become a Donor
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="px-8 py-3 text-lg border-2 border-white text-white hover:bg-white hover:text-red-600">
                  Partner with Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;