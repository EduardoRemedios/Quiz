import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseClasses = 'font-semibold rounded-xl transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green disabled:opacity-40 disabled:cursor-not-allowed';
    
    const variantClasses = {
      primary: 'bg-accent-green text-white hover:bg-[#00a042] active:bg-[#008c3a] shadow-lg shadow-accent-green/25 hover:shadow-xl hover:shadow-accent-green/30',
      secondary: 'bg-white text-accent-green border-2 border-accent-green hover:bg-accent-green/5 active:bg-accent-green/10 transition-colors shadow-sm',
      outline: 'border-2 border-accent-green text-accent-green bg-transparent hover:bg-accent-green hover:text-white active:bg-accent-green/90 transition-all shadow-sm',
    };
    
    const sizeClasses = {
      sm: 'px-4 py-2.5 text-sm min-h-[44px]',
      md: 'px-5 py-3.5 text-base min-h-[48px]',
      lg: 'px-6 py-4.5 text-lg min-h-[56px] w-full',
    };
    
    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
