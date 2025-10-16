import React from 'react';
import KinnButton from './KinnButton';

/**
 * CTA Button Component - Specialized button for call-to-action scenarios
 * 
 * Pre-configured button variants for common CTA use cases in the Kinn app
 */

/**
 * Primary CTA Button (Honey background)
 * Used for main actions like "Become a Seller", "Get Started"
 */
export const PrimaryCTA = ({ children, onClick, disabled, className, ...props }) => (
  <KinnButton
    variant="primary"
    size="lg"
    onClick={onClick}
    disabled={disabled}
    className={`font-semibold ${className}`}
    {...props}
  >
    {children}
  </KinnButton>
);

/**
 * Secondary CTA Button (Forest background)
 * Used for secondary actions like "Learn More", "Browse Food"
 */
export const SecondaryCTA = ({ children, onClick, disabled, className, ...props }) => (
  <KinnButton
    variant="secondary"
    size="lg"
    onClick={onClick}
    disabled={disabled}
    className={`font-semibold ${className}`}
    {...props}
  >
    {children}
  </KinnButton>
);

/**
 * Login Button - Subtle ghost button for auth actions
 */
export const LoginButton = ({ onClick, className, ...props }) => (
  <KinnButton
    variant="ghost"
    size="sm"
    onClick={onClick}
    className={`!border-none hover:bg-transparent hover:text-brand-honey-600 ${className}`}
    {...props}
  >
    Login
  </KinnButton>
);

/**
 * Join Button - Outline style for registration
 */
export const JoinButton = ({ onClick, className, ...props }) => (
  <KinnButton
    variant="outline"
    size="sm"
    onClick={onClick}
    className={`font-medium ${className}`}
    {...props}
  >
    Join Us
  </KinnButton>
);

/**
 * Checkout Button - Full width primary for checkout flows
 */
export const CheckoutButton = ({ onClick, disabled, className, ...props }) => (
  <KinnButton
    variant="primary"
    size="lg"
    fullWidth
    onClick={onClick}
    disabled={disabled}
    className={`font-semibold ${className}`}
    {...props}
  >
    Checkout
  </KinnButton>
);

/**
 * Dual CTA Section - Hero section with both primary and secondary CTAs
 */
export const DualCTASection = ({ 
  primaryText = "Become a Seller", 
  secondaryText = "Find Local Food",
  onPrimaryClick,
  onSecondaryClick,
  className = ""
}) => (
  <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
    <PrimaryCTA onClick={onPrimaryClick}>
      {primaryText}
    </PrimaryCTA>
    <SecondaryCTA onClick={onSecondaryClick}>
      {secondaryText}
    </SecondaryCTA>
  </div>
);
