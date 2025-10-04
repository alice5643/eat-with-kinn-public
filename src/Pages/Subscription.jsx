import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { SUBSCRIPTION_PLANS } from '../utils/stripe'

const Subscription = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [currentSubscription, setCurrentSubscription] = useState(null)
    const [sellerData, setSellerData] = useState(null)
    const [billingPeriod, setBillingPeriod] = useState('monthly') // 'monthly' or 'yearly'

    useEffect(() => {
        loadSubscriptionData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const loadSubscriptionData = async () => {
        if (!user) return

        try {
            // Get seller data
            const { data: seller } = await supabase
                .from('sellers')
                .select('*')
                .eq('user_id', user.id)
                .single()

            if (!seller) {
                window.location.href = '/seller/onboarding'
                return
            }

            setSellerData(seller)

            // Get current subscription
            const { data: subscription } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('seller_id', seller.id)
                .eq('status', 'active')
                .single()

            setCurrentSubscription(subscription)
        } catch (error) {
            console.error('Error loading subscription:', error)
        }
    }

    const handleSubscribe = async (planTier) => {
        if (!sellerData) return

        setLoading(true)

        try {
            // Call Edge Function to create subscription
            const { data, error } = await supabase.functions.invoke('create-subscription', {
                body: {
                    sellerId: sellerData.id,
                    planTier: planTier,
                    billingPeriod: billingPeriod,
                }
            })

            if (error) {
                throw error
            }

            // Redirect to Stripe checkout
            if (data.checkoutUrl) {
                window.location.href = data.checkoutUrl
            }
        } catch (error) {
            console.error('Error creating subscription:', error)
            alert('Failed to create subscription. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleManageSubscription = async () => {
        setLoading(true)

        try {
            const { data, error } = await supabase.functions.invoke('manage-subscription', {
                body: {
                    sellerId: sellerData.id,
                }
            })

            if (error) {
                throw error
            }

            // Redirect to Stripe billing portal
            if (data.portalUrl) {
                window.location.href = data.portalUrl
            }
        } catch (error) {
            console.error('Error opening billing portal:', error)
            alert('Failed to open billing portal. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const plans = [
        {
            tier: 'basic',
            name: 'Basic',
            description: 'Perfect for getting started',
            features: [
                'Up to 50 orders per month',
                '15% commission on sales',
                'Basic analytics',
                'Email support',
            ],
            popular: false,
        },
        {
            tier: 'pro',
            name: 'Pro',
            description: 'Most popular for growing businesses',
            features: [
                'Unlimited orders',
                '10% commission on sales',
                'Advanced analytics',
                'Priority support',
                'Featured listing',
            ],
            popular: true,
        },
        {
            tier: 'premium',
            name: 'Premium',
            description: 'For established restaurants',
            features: [
                'Unlimited orders',
                '5% commission on sales',
                'Advanced analytics',
                '24/7 priority support',
                'Top featured listing',
                'Dedicated account manager',
            ],
            popular: false,
        },
    ]

    return (
        <Fragment>
            <section className='pb-0 pt-[120px] bg-[#F8F8F8] min-h-screen'>
                <Container>
                    <div className="text-center mb-8">
                        <h2 className='text-h2 text-Mblack mb-3'>Choose Your Plan</h2>
                        <p className='text-body-lg text-gray-600 mb-6'>
                            Select the perfect plan for your business
                        </p>

                        {/* Billing Period Toggle */}
                        <div className="inline-flex items-center bg-white rounded-full p-1">
                            <button
                                onClick={() => setBillingPeriod('monthly')}
                                className={`px-6 py-2 rounded-full font-medium text__14 transition-all ${
                                    billingPeriod === 'monthly'
                                        ? 'bg-Mblack text-white'
                                        : 'text-gray-600 hover:text-Mblack'
                                }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingPeriod('yearly')}
                                className={`px-6 py-2 rounded-full font-medium text__14 transition-all ${
                                    billingPeriod === 'yearly'
                                        ? 'bg-Mblack text-white'
                                        : 'text-gray-600 hover:text-Mblack'
                                }`}
                            >
                                Yearly
                                <span className='ml-2 text-[#FEC51C]'>Save 17%</span>
                            </button>
                        </div>
                    </div>

                    <Row className='justify-content-center gap-y-4'>
                        {plans.map((plan) => {
                            const planPrice = SUBSCRIPTION_PLANS[plan.tier][billingPeriod].amount
                            const isCurrentPlan = currentSubscription?.plan_tier === plan.tier

                            return (
                                <Col key={plan.tier} lg={4} md={6}>
                                    <div className={`bg-white rounded-[20px] p-6 h-full relative ${
                                        plan.popular ? 'border-2 border-[#FEC51C] shadow-lg' : ''
                                    }`}>
                                        {plan.popular && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FEC51C] text-Mblack px-4 py-1 rounded-full text__12 font-medium">
                                                Most Popular
                                            </div>
                                        )}

                                        <div className="text-center mb-6">
                                            <h4 className='text-h4 text-Mblack mb-2'>{plan.name}</h4>
                                            <p className='text-body-sm text-gray-500 mb-4'>{plan.description}</p>
                                            <div className="mb-4">
                                                <span className='text-h2 text-Mblack font-bold'>£{planPrice}</span>
                                                <span className='text-body-md text-gray-500'>/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
                                            </div>
                                        </div>

                                        <ul className='space-y-3 mb-6'>
                                            {plan.features.map((feature, index) => (
                                                <li key={index} className='flex items-start gap-2'>
                                                    <svg className='w-5 h-5 text-[#FEC51C] mt-0.5 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                                    </svg>
                                                    <span className='text-body-md text-gray-700'>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {isCurrentPlan ? (
                                            <div className="text-center py-3 bg-gray-100 rounded-[12px] font-medium text__14 text-gray-700">
                                                Current Plan
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleSubscribe(plan.tier)}
                                                disabled={loading}
                                                className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                                            >
                                                {loading ? 'Loading...' : 'Subscribe Now'}
                                            </button>
                                        )}
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>

                    {currentSubscription && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={handleManageSubscription}
                                disabled={loading}
                                className='btn-secondary'
                            >
                                {loading ? 'Loading...' : 'Manage Subscription'}
                            </button>
                        </div>
                    )}

                    <div className="mt-8 p-6 bg-white rounded-[20px]">
                        <h5 className='text-h6 text-Mblack mb-3'>Platform Commission Structure</h5>
                        <p className='text-body-md text-gray-600 mb-4'>
                            In addition to your subscription, we charge a 10% platform commission on all orders. Your subscription plan determines the seller commission rate.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-[#FAFAFA] rounded-[12px]">
                                <h6 className='font-medium text__14 text-Mblack mb-1'>Basic Plan</h6>
                                <p className='text__12 text-gray-600'>15% seller commission + 10% platform fee</p>
                            </div>
                            <div className="p-4 bg-[#FAFAFA] rounded-[12px]">
                                <h6 className='font-medium text__14 text-Mblack mb-1'>Pro Plan</h6>
                                <p className='text__12 text-gray-600'>10% seller commission + 10% platform fee</p>
                            </div>
                            <div className="p-4 bg-[#FAFAFA] rounded-[12px]">
                                <h6 className='font-medium text__14 text-Mblack mb-1'>Premium Plan</h6>
                                <p className='text__12 text-gray-600'>5% seller commission + 10% platform fee</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </Fragment>
    )
}

export default Subscription