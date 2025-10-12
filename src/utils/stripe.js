import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Subscription plan configurations
export const SUBSCRIPTION_PLANS = {
  hobbyist: {
    monthly: {
      priceId: 'price_1SHT3CAkjLGPFlKZiBypgQzk', // Replace with actual Stripe price ID
      amount: 10.00,
      displayAmount: '£10',
    },
    yearly: {
      priceId: 'price_1SHT3dAkjLGPFlKZ9W6lSn9S', // Replace with actual Stripe price ID
      amount: 59.00, // £4.99/month * 12
      displayAmount: '£59.00',
      monthlyEquivalent: '£4.99/month',
    },
  },
  pro: {
    monthly: {
      priceId: 'price_1SHT3wAkjLGPFlKZmrTXpwjI',
      amount: 15.00,
      displayAmount: '£15.00',
    },
    yearly: {
      priceId: 'price_1SHT4WAkjLGPFlKZJPgTL4qr',
      amount: 99.00, // £12.50/month * 12
      displayAmount: '£99.00',
      monthlyEquivalent: '£12.50/month',
    },
  },
};

// No platform commission - sellers keep all revenue except payment processing fees
export const PLATFORM_COMMISSION_RATE = 0.00;

// Calculate seller payout (no commission, only Stripe fees)
export const calculateSellerPayout = (mealPrice) => {
  // Stripe fee: 1.5% + 20p for European cards
  const stripeFee = (mealPrice * 0.015) + 0.20;
  const sellerPayout = mealPrice - stripeFee;

  return {
    mealPrice: parseFloat(mealPrice.toFixed(2)),
    stripeFee: parseFloat(stripeFee.toFixed(2)),
    sellerPayout: parseFloat(sellerPayout.toFixed(2)),
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