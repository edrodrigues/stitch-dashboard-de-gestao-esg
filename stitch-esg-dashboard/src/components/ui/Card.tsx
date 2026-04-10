import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  variant?: 'default' | 'chunky' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  headerAction,
  variant = 'default',
}) => {
  const baseStyles = 'rounded-3xl overflow-hidden transition-all duration-300';
  const variants = {
    default: 'bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 shadow-xl shadow-emerald-900/5',
    chunky: 'bg-white dark:bg-slate-900 chunky-card',
    glass: 'glass-surface shadow-2xl shadow-emerald-900/10',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="px-8 py-6 border-b-2 border-slate-50 dark:border-slate-800/50 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/10">
          <div>
            {title && <h3 className="font-black text-lg text-slate-900 dark:text-white uppercase tracking-tight font-display">{title}</h3>}
            {subtitle && <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mt-1 font-display">{subtitle}</p>}
          </div>
          {headerAction && <div className="flex items-center">{headerAction}</div>}
        </div>
      )}
      <div className="p-8">
        {children}
      </div>
    </div>
  );
};
