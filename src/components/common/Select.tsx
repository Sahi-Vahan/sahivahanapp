import React, { forwardRef } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  options?: SelectOption[];
  placeholder?: string;
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      options,
      placeholder,
      className = '',
      containerClassName = '',
      disabled,
      children,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`space-y-1.5 ${containerClassName}`}>
        {label && (
          <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            {label}
          </label>
        )}

        <div className="relative group">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              {leftIcon}
            </div>
          )}

          <select
            ref={ref}
            id={id}
            disabled={disabled}
            className={`w-full appearance-none rounded-xl border text-sm font-medium transition-all focus:outline-hidden ${
              leftIcon ? 'pl-10' : 'pl-3.5'
            } pr-10 py-2.5 ${
              disabled
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed select-none'
                : error
                ? 'border-red-400 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'bg-white border-slate-300 text-slate-800 hover:border-slate-400/80 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15 shadow-2xs'
            } ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-slate-400">
                {placeholder}
              </option>
            )}
            {options
              ? options.map(opt => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          {/* Custom Modern Chevron Arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 group-hover:text-slate-600 transition-colors">
            <ChevronDown className={`w-4 h-4 stroke-[2.2] ${disabled ? 'text-slate-300' : ''}`} />
          </div>
        </div>

        {error ? (
          <p className="text-xs font-semibold text-red-600 flex items-center gap-1.5 mt-1 animate-in fade-in duration-150">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="text-[11px] text-slate-400 mt-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

