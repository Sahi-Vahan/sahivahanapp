import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'white' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const actualLeftIcon = leftIcon || icon;

  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98] hover:scale-[1.01]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-xs px-5 py-2.5 gap-2',
    lg: 'text-sm px-7 py-3.5 gap-2.5 shadow-md'
  };

  const variantStyles = {
    primary: 'bg-[#154D3F] hover:bg-[#0F382E] text-white shadow-sm focus:ring-[#154D3F]/40 shadow-[#154D3F]/20',
    secondary: 'bg-slate-900 hover:bg-slate-950 text-white focus:ring-slate-800',
    outline: 'border border-slate-300 hover:border-[#154D3F] text-slate-800 hover:bg-slate-50 bg-white focus:ring-[#154D3F]',
    ghost: 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-400',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-sm',
    white: 'bg-white hover:bg-emerald-50 text-[#154D3F] border border-white/80 shadow-md focus:ring-white/50',
    glass: 'bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md focus:ring-white/30'
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : actualLeftIcon ? (
        <span className="shrink-0 inline-flex items-center">{actualLeftIcon}</span>
      ) : null}
      <span className="inline-flex items-center">{children}</span>
      {!isLoading && rightIcon ? <span className="shrink-0 inline-flex items-center">{rightIcon}</span> : null}
    </button>
  );
};
