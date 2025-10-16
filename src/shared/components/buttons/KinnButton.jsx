import React from 'react';
import PropTypes from 'prop-types';

/**
 * Kinn Brand Button Component
 * 
 * A flexible, reusable button component following Kinn's design system
 * 
 * @param {Object} props - Component props
 * @param {'primary'|'secondary'|'ghost'|'outline'} props.variant - Button style variant
 * @param {'sm'|'md'|'lg'|'xl'} props.size - Button size
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.fullWidth - Full width button
 * @param {string} props.className - Additional CSS classes
 * @param {function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.type - Button type (button, submit, reset)
 */
const KinnButton = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  children,
  type = 'button',
  ...props
}) => {
  // Base button classes
  const baseClasses = 'btn-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant classes
  const variantClasses = {
    primary: 'bg-brand-honey text-brand-forest hover:bg-brand-honey-600 focus:ring-brand-honey-300 border border-brand-honey hover:border-brand-honey-600',
    secondary: 'bg-brand-forest text-brand-cream hover:bg-brand-forest-700 focus:ring-brand-slate-300 border border-brand-forest hover:border-brand-forest-700',
    ghost: 'text-brand-forest bg-transparent hover:bg-brand-cream focus:ring-brand-slate-300 border border-brand-forest hover:border-brand-forest-700',
    outline: 'text-brand-honey bg-transparent hover:bg-brand-honey hover:text-brand-forest focus:ring-brand-honey-300 border border-brand-honey'
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-lg',
    xl: 'px-10 py-5 text-xl rounded-xl'
  };

  // Combine all classes
  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

KinnButton.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default KinnButton;
