import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (value: boolean) => void;
  toggleSidebar: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    // Check if on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    const saved = localStorage.getItem('sidebar_collapsed');
    
    if (saved !== null) {
      return saved === 'true';
    }
    
    // Default to collapsed on mobile, expanded on desktop
    return isMobile;
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      const newValue = !prev;
      localStorage.setItem('sidebar_collapsed', String(newValue));
      return newValue;
    });
  };

  const setCollapsed = (value: boolean) => {
    setIsSidebarCollapsed(value);
    localStorage.setItem('sidebar_collapsed', String(value));
  };

  return (
    <UIContext.Provider value={{ 
      isSidebarCollapsed, 
      setIsSidebarCollapsed: setCollapsed, 
      toggleSidebar 
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
