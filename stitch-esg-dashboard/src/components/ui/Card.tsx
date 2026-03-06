import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  variant?: 'default' | 'chunky';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  headerAction,
  variant = 'default',
}) => {
  const baseStyles = 'bg-white dark:bg-slate-900 rounded-xl overflow-hidden transition-all';
  const variants = {
    default: 'border border-slate-200 dark:border-slate-800 shadow-sm',
    chunky: 'chunky-card',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            {title && <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
