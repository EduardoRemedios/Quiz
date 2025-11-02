import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseClasses = 'font-medium rounded-lg transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      primary: 'bg-accent-green text-white hover:bg-opacity-90 active:bg-opacity-80',
      secondary: 'bg-bg-card text-accent-green border-2 border-accent-green hover:bg-opacity-90',
      outline: 'border-2 border-accent-green text-accent-green hover:bg-accent-green hover:bg-opacity-10',
    };
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm min-h-10',
      md: 'px-4 py-3 text-base min-h-12',
      lg: 'px-6 py-4 text-lg min-h-14 w-full',
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
