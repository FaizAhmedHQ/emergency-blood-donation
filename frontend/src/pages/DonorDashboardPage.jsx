import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { useSidebar } from '../context/SidebarContext';

const DonorDashboardPage = () => {
  const { isVisible } = useSidebar();
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div 
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isVisible ? 'md:ml-64' : 'ml-0'
        }`}
      >
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DonorDashboardPage;