import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Leaf, 
  Users, 
  Gavel, 
  BarChart3, 
  ClipboardCheck, 
  Download,
  LeafyGreen,
  LogOut,
  Lock,
  Trophy,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/useAuth';
import { useUI } from '../../context/UIContext';

export const Sidebar: React.FC = () => {
  const { signOut, isDiagnosticCompleted } = useAuth();
  const { isSidebarCollapsed, toggleSidebar } = useUI();

  const navItems = [
    { icon: LayoutDashboard, label: 'Início', path: '/dashboard', protected: false },
    { icon: ClipboardCheck, label: 'Questionário', path: '/diagnostic', protected: false },
    { icon: Leaf, label: 'Ambiental', path: '/environmental', protected: true },
    { icon: Users, label: 'Social', path: '/social', protected: true },
    { icon: Gavel, label: 'Governança', path: '/governance', protected: true },
    { icon: BarChart3, label: 'Relatórios', path: '/reports', protected: false },
    { icon: Trophy, label: 'Ranking', path: '/ranking', protected: false },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {!isSidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed left-4 top-4 bottom-4 transition-transform duration-300 ease-in-out glass-surface rounded-3xl flex flex-col z-50 shadow-2xl shadow-emerald-900/10
        lg:translate-x-0
        ${isSidebarCollapsed ? 'w-20 -translate-x-[calc(100%+1rem)] lg:w-20 lg:translate-x-0' : 'w-72 translate-x-0 lg:w-72'}
      `}>
        {/* Toggle Button - Only visible on Desktop or for closing on Mobile */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-10 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-full p-1.5 shadow-lg text-slate-400 hover:text-primary transition-all z-[60]"
        >
          {isSidebarCollapsed ? <Menu size={14} /> : <ChevronLeft size={14} />}
        </button>

      <div className={`p-8 flex items-center gap-4 ${isSidebarCollapsed ? 'justify-center p-6' : ''}`}>
        <div className="w-12 h-12 rounded-2xl bg-primary text-slate-900 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
          <LeafyGreen size={28} />
        </div>
        {!isSidebarCollapsed && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300">
            <h1 className="text-xl font-black leading-tight uppercase tracking-tighter text-slate-900 dark:text-white">GUIA ESG</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary italic">Enterprise Hub</p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isLocked = item.protected && !isDiagnosticCompleted;
          
          return (
            <NavLink
              key={item.path}
              to={isLocked ? '#' : item.path}
              onClick={(e) => {
                if (isLocked) {
                  e.preventDefault();
                }
              }}
              className={({ isActive }) => `
                flex items-center transition-all font-bold uppercase text-xs tracking-wider rounded-2xl
                ${isSidebarCollapsed ? 'justify-center p-4' : 'px-5 py-4 gap-4'}
                ${isActive && !isLocked
                  ? 'bg-primary text-slate-900 shadow-xl shadow-emerald-500/20 translate-x-1' 
                  : isLocked 
                    ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-40'
                    : 'text-slate-500 hover:bg-emerald-500/10 hover:text-primary'}
              `}
              title={isSidebarCollapsed ? item.label : ''}
            >
              {isLocked ? <Lock size={18} /> : <item.icon size={18} />}
              {!isSidebarCollapsed && <span className="animate-in fade-in slide-in-from-left-2 duration-300">{item.label}</span>}
              {!isSidebarCollapsed && isLocked && (
                <span className="ml-auto text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-400 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 font-bold uppercase tracking-widest">
                  Lock
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className={`p-6 border-t border-slate-100 dark:border-slate-800 space-y-3 ${isSidebarCollapsed ? 'items-center p-4' : ''}`}>
        {!isSidebarCollapsed ? (
          <Button variant="outline" className="w-full gap-3 py-4 rounded-2xl font-bold uppercase text-xs tracking-wider border-2 border-slate-100 dark:border-slate-800">
            <Download size={18} />
            <span>Exportar</span>
          </Button>
        ) : (
          <button className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-slate-400 hover:text-primary mx-auto">
            <Download size={18} />
          </button>
        )}
        
        <button 
          onClick={() => signOut()}
          className={`
            w-full flex items-center transition-all font-bold uppercase text-xs tracking-wider text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 rounded-2xl
            ${isSidebarCollapsed ? 'justify-center p-4' : 'justify-center gap-3 py-4'}
          `}
          title={isSidebarCollapsed ? 'Sair' : ''}
        >
          <LogOut size={18} />
          {!isSidebarCollapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
};
