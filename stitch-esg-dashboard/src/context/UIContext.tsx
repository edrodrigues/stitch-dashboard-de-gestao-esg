import React, { createContext, useContext, useState, useEffect } from 'react';

interface UIContextType {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (value: boolean) => void;
  toggleSidebar: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    return saved === 'true';
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
