import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';
import { LogOut, User, Shield, Menu } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-md backdrop-blur-sm bg-opacity-80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Sidebar toggle button - visible on desktop */}
          <button
            onClick={toggleSidebar}
            className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>

          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-red-600 text-white p-2 rounded-lg">
              <Shield className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-gray-800">Blood Network</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <span className="text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={toggleSidebar}
            className="text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;