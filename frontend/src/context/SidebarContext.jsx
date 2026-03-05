import React, { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (isCollapsed) {
      setIsVisible(true);
    } else {
      // Delay hiding to allow animation
      setTimeout(() => setIsVisible(false), 300);
    }
  };

  const closeSidebar = () => {
    setIsCollapsed(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  const openSidebar = () => {
    setIsCollapsed(false);
    setIsVisible(true);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, isVisible, toggleSidebar, closeSidebar, openSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
