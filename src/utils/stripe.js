import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Subscription plan configurations
export const SUBSCRIPTION_PLANS = {
  basic: {
    monthly: {
      priceId: 'price_basic_monthly', // Replace with actual Stripe price ID
      amount: 29.99,
      commissionRate: 15.00, // 15% commission on sales
    },
    yearly: {
      priceId: 'price_basic_yearly', // Replace with actual Stripe price ID
      amount: 299.99,
      commissionRate: 15.00,
    },
  },
  pro: {
    monthly: {
      priceId: 'price_pro_monthly',
      amount: 79.99,
      commissionRate: 10.00, // 10% commission on sales
    },
    yearly: {
      priceId: 'price_pro_yearly',
      amount: 799.99,
      commissionRate: 10.00,
    },
  },
  premium: {
    monthly: {
      priceId: 'price_premium_monthly',
      amount: 149.99,
      commissionRate: 5.00, // 5% commission on sales
    },
    yearly: {
      priceId: 'price_premium_yearly',
      amount: 1499.99,
      commissionRate: 5.00,
    },
  },
};

// Platform commission rate (always 10%)
export const PLATFORM_COMMISSION_RATE = 10.00;

// Calculate commission breakdown for an order
export const calculateCommissions = (mealPrice, sellerCommissionRate) => {
  const platformCommission = (mealPrice * PLATFORM_COMMISSION_RATE) / 100;
  const sellerCommission = (mealPrice * sellerCommissionRate) / 100;
  const sellerPayout = mealPrice - sellerCommission;
  const totalCharge = mealPrice + platformCommission;

  return {
    mealPrice: parseFloat(mealPrice.toFixed(2)),
    platformCommission: parseFloat(platformCommission.toFixed(2)),
    sellerCommission: parseFloat(sellerCommission.toFixed(2)),
    sellerPayout: parseFloat(sellerPayout.toFixed(2)),
    totalCharge: parseFloat(totalCharge.toFixed(2)),
  };
};

// Stripe API helper functions (to be called from Edge Functions)
export const stripeHelpers = {
  // Format amount for Stripe (convert to smallest currency unit)
  formatAmountForStripe: (amount, currency = 'gbp') => {
    return Math.round(amount * 100);
  },

  // Format amount for display (convert from smallest currency unit)
  formatAmountFromStripe: (amount, currency = 'gbp') => {
    return amount / 100;
  },
};