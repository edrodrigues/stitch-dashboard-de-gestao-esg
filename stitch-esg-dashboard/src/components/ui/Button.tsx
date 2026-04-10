import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'chunky';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-bold uppercase tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] delight-spring';
  
  const variants = {
    primary: 'bg-primary text-slate-900 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30',
    secondary: 'bg-secondary text-white shadow-lg shadow-secondary/20 hover:shadow-secondary/30',
    chunky: 'chunky-button bg-primary text-slate-900 shadow-xl',
    outline: 'border-2 border-slate-200 dark:border-slate-800 bg-transparent hover:border-primary hover:text-primary dark:text-slate-100',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary',
  };

  const sizes = {
    sm: 'px-3 py-2 text-[10px]',
    md: 'px-5 py-3 text-xs',
    lg: 'px-8 py-4 text-sm',
    icon: 'p-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || disabled}
      aria-busy={isLoading}
      aria-disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-3 opacity-80" />
      ) : null}
      <span className="relative flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};
