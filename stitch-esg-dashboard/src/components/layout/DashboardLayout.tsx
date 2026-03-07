import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-80 transition-all duration-300 min-h-screen">
        <Header />
        <main className="p-4 md:p-8 max-w-7xl mx-auto flex-1 w-full">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};
