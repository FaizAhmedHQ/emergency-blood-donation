import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Users, Heart, Activity, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { isCollapsed, isVisible, toggleSidebar } = useSidebar();

  // Define navigation items based on user role
  const navItems = {
    DONOR: [
      { name: 'Dashboard', icon: Home, href: '/dashboard/donor' },
      { name: 'Profile', icon: User, href: '/dashboard/donor/profile' },
      { name: 'Emergency Alerts', icon: Activity, href: '/dashboard/donor/alerts' },
      { name: 'Donation History', icon: Heart, href: '/dashboard/donor/history' },
    ],
    HOSPITAL: [
      { name: 'Dashboard', icon: Home, href: '/dashboard/hospital' },
      { name: 'Request Blood', icon: Heart, href: '/dashboard/hospital/request' },
      { name: 'Find Donors', icon: Users, href: '/dashboard/hospital/donors' },
      { name: 'My Requests', icon: Activity, href: '/dashboard/hospital/requests' },
    ],
    ADMIN: [
      { name: 'Dashboard', icon: Home, href: '/dashboard/admin' },
      { name: 'Users', icon: Users, href: '/dashboard/admin/users' },
      { name: 'Requests', icon: Activity, href: '/dashboard/admin/requests' },
      { name: 'Analytics', icon: BarChart3, href: '/dashboard/admin/analytics' },
      { name: 'Settings', icon: Settings, href: '/dashboard/admin/settings' },
    ]
  };

  const currentNavItems = navItems[user?.role] || [];

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <>
      <aside 
        className={`bg-white shadow-md min-h-screen fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out overflow-hidden ${
          isVisible ? 'w-64 opacity-100' : 'w-0 opacity-0'
        } hidden md:block backdrop-blur-sm bg-opacity-80`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          {isVisible && (
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 text-white p-2 rounded-lg">
                <Heart className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 capitalize">{user?.role} Dashboard</h2>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        <nav className="mt-6">
          <ul>
            {currentNavItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                    isActive(item.href) ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : ''
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {isVisible && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 w-full p-4 border-t">
            <button
              onClick={logout}
              className="flex items-center w-full px-6 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              {isVisible && <span>Logout</span>}
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {!isCollapsed && isVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          !isCollapsed ? 'translate-x-0 w-64' : '-translate-x-full w-64'
        }`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-red-600 text-white p-2 rounded-lg">
              <Heart className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 capitalize">{user?.role} Dashboard</h2>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <nav className="mt-6">
          <ul>
            {currentNavItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                    isActive(item.href) ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : ''
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 w-full p-4 border-t">
            <button
              onClick={logout}
              className="flex items-center w-full px-6 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;