import React from 'react';
import { Search, Bell, Settings, User, Building2, LogOut, ChevronDown, WifiOff, Menu as MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useOfflineStatus } from '../../hooks/useOfflineStatus';
import { useUI } from '../../context/UIContext';
import { Menu, Transition, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { isOffline } = useOfflineStatus();
  const { toggleSidebar } = useUI();
  
  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 flex items-center justify-between z-40">
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          aria-label="Abrir menu"
        >
          <MenuIcon size={20} />
        </button>

        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm font-medium outline-none transition-all"
            placeholder="Buscar conquistas ou dados..."
            aria-label="Buscar"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Offline Indicator */}
        {isOffline && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-xl">
            <WifiOff size={16} className="text-amber-600 dark:text-amber-500" />
            <span className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider hidden sm:inline">
              Offline
            </span>
          </div>
        )}
        
        <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative group" aria-label="Notificações">
          <Bell size={20} className="text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
        
        {/* Profile Dropdown Container */}
        <Menu as="div" className="relative py-2">
          <MenuButton className="flex items-center gap-3 cursor-pointer outline-none group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-primary transition-colors">{user?.displayName || 'Mestre ESG'}</p>
              <p className="text-xs font-medium text-slate-500 opacity-80">Gerente de Impacto</p>
            </div>
            <div className="relative">
              <div 
                className="w-10 h-10 rounded-full bg-slate-200 bg-cover bg-center border-2 border-primary/20 shadow-lg shadow-emerald-500/10 group-hover:border-primary group-focus:border-primary transition-all duration-300 group-hover:scale-110 group-hover:emerald-glow"
                style={{ backgroundImage: `url('${user?.photoURL ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid || 'Felix'}`}')` }}
              />
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-0.5 border border-slate-200 dark:border-slate-800">
                <ChevronDown size={10} className="text-slate-400 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </MenuButton>

          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-2 border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl shadow-emerald-900/10 overflow-hidden p-2 focus:outline-none z-50">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sua Conta</p>
              </div>
              
              <MenuItem>
                {({ focus }) => (
                  <Link 
                    to="/profile" 
                    className={`${focus ? 'bg-emerald-500/10 text-primary' : 'text-slate-600 dark:text-slate-400'} flex items-center gap-3 px-4 py-3 rounded-xl transition-all group/item`}
                  >
                    <User size={18} className="group-hover/item:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-wider">Meu Perfil</span>
                  </Link>
                )}
              </MenuItem>
              
              <MenuItem>
                {({ focus }) => (
                  <Link 
                    to="/organization" 
                    className={`${focus ? 'bg-emerald-500/10 text-primary' : 'text-slate-600 dark:text-slate-400'} flex items-center gap-3 px-4 py-3 rounded-xl transition-all group/item`}
                  >
                    <Building2 size={18} className="group-hover/item:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-wider">Minha Organização</span>
                  </Link>
                )}
              </MenuItem>
              
              <MenuItem>
                {({ focus }) => (
                  <Link 
                    to="/settings" 
                    className={`${focus ? 'bg-emerald-500/10 text-primary' : 'text-slate-600 dark:text-slate-400'} flex items-center gap-3 px-4 py-3 rounded-xl transition-all group/item`}
                  >
                    <Settings size={18} className="group-hover/item:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-wider">Configurações</span>
                  </Link>
                )}
              </MenuItem>
              
              <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-1 mx-2"></div>
              
              <MenuItem>
                {({ focus }) => (
                  <button 
                    onClick={() => signOut()}
                    className={`${focus ? 'bg-rose-500/10 text-rose-500' : 'text-slate-400'} w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group/item`}
                  >
                    <LogOut size={18} className="group-hover/item:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-wider">Sair da Conta</span>
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};
