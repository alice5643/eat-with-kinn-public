import React, { Fragment, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { SUBSCRIPTION_PLANS } from '../utils/stripe'

const KinnSeller = () => {
    const [billingPeriod, setBillingPeriod] = useState('yearly') // 'yearly' or 'monthly'
    const { isAuthenticated, user } = useAuth()
    const [loading, setLoading] = useState(false)

    const handleSelectPlan = async (planType) => {
        if (!isAuthenticated) {
            // Redirect to signup with plan info in URL params
            window.location.href = `/auth/signup?plan=${planType}&billing=${billingPeriod}`
            return
        }

        // User is authenticated - create Stripe checkout session directly
        setLoading(true)

        try {
            const planConfig = SUBSCRIPTION_PLANS[planType][billingPeriod]

            // Create Stripe Checkout Session via Edge Function
            const { data, error } = await supabase.functions.invoke('create-checkout-session', {
                body: {
                    priceId: planConfig.priceId,
                    planTier: planType,
                    billingPeriod: billingPeriod,
                    userId: user.id,
                    userEmail: user.email,
                    successUrl: `${window.location.origin}/subscription?success=true&session_id={CHECKOUT_SESSION_ID}`,
                    cancelUrl: `${window.location.origin}/kinn-seller#pricing`,
                }
            })

            if (error) {
                let serverMessage = ''
                if (error.context) {
                    try {
                        const cloned = error.context.clone()
                        const body = await cloned.json()
                        serverMessage = body?.error ?? JSON.stringify(body)
                    } catch (parseError) {
                        serverMessage = `Status ${error.context.status}`
                    }
                }
                console.error('Checkout error:', error, serverMessage)
                alert(serverMessage || 'Failed to start checkout. Please try again.')
                setLoading(false)
                return
            }

            // Redirect to Stripe Checkout
            if (data?.url) {
                window.location.href = data.url
            } else {
                alert('Failed to create checkout session. Please try again.')
                setLoading(false)
            }
        } catch (error) {
            console.error('Error creating checkout session:', error)
            alert('Failed to start checkout. Please try again.')
            setLoading(false)
        }
    }

    return (
        <Fragment>
            {/* Hero Section */}
            <section className='relative overflow-hidden min-h-screen pt-[88px] lg:pt-[98px] -mt-[88px] lg:-mt-[98px] bg-gradient-to-br from-Myellow to-Koffwhite flex flex-wrap pb-0'>
                <Container className='relative z-[2] w-full pt-[80px]'>
                    {/* Hero Banner - Recreating seller-banner.png in HTML */}
                    <div className="w-full max-w-[1300px] mx-auto px-4 mb-16">
                        <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-xl relative overflow-hidden">
                            {/* Decorative background pattern */}
                            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
                                <div className="grid grid-cols-4 gap-4 h-full">
                                    {[...Array(16)].map((_, i) => (
                                        <div key={i} className="bg-Myellow rounded-full"></div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative z-10">
                                <Row className="items-center gap-y-8">
                                    <Col lg={6}>
                                        <div className="mb-6">
                                            <span className="inline-block bg-Myellow text-Mblack px-4 py-2 rounded-full text-body-md font-semibold mb-4">
                                                📱 New: Kinn Seller App
                                            </span>
                                        </div>
                                        <h1 className='text-h1 text-Mblack mb-6'>
                                            Manage Your Food Business.<br/>
                                            <span className="text-Myellow">Grow With Confidence.</span>
                                        </h1>
                                        <p className='text-body-xl-regular text-Mgray mb-8'>
                                            The all-in-one platform for small food sellers. Manage your shop, track orders, and reach more customers—all from your phone.
                                        </p>
                                        <div className="flex flex-col sm:flex-row items-start gap-4">
                                            <NavLink to="/auth/signup" className="btn-primary">
                                                Start Free Trial
                                            </NavLink>
                                            <button
                                                className="btn-secondary"
                                                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                            >
                                                View Pricing
                                            </button>
                                        </div>
                                        <p className="text-body-sm-regular text-Mgray mt-4">
                                            ✨ No credit card required • Cancel anytime
                                        </p>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="relative">
                                            <img
                                                src="/images/seller_section.png"
                                                className='w-full h-auto rounded-[20px] shadow-2xl'
                                                alt="Kinn Seller app interface"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Features Section */}
            <section className='bg-white py-[80px]'>
                <Container>
                    <div className="text-center mb-12">
                        <h2 className='text-h2-normal text-Mblack mb-4'>Everything You Need to Run Your Food Business</h2>
                        <p className='text-body-lg-regular text-Mgray max-w-2xl mx-auto'>
                            Professional tools designed for small food sellers, home bakers, caterers, and food entrepreneurs.
                        </p>
                    </div>

                    <Row className='gap-y-8'>
                        <Col md={6} lg={4}>
                            <div className="bg-Koffwhite rounded-[20px] p-6 h-full">
                                <div className="w-16 h-16 bg-Myellow rounded-full flex items-center justify-center mb-4">
                                    <span className="text-3xl">🏪</span>
                                </div>
                                <h3 className='text-body-xl font-semibold text-Mblack mb-3'>Shop Management</h3>
                                <p className='text-body-md-regular text-Mgray'>
                                    Update your menu, prices, and availability in real-time. Customers always see what's fresh.
                                </p>
                            </div>
                        </Col>

                        <Col md={6} lg={4}>
                            <div className="bg-Koffwhite rounded-[20px] p-6 h-full">
                                <div className="w-16 h-16 bg-Myellow rounded-full flex items-center justify-center mb-4">
                                    <span className="text-3xl">📦</span>
                                </div>
                                <h3 className='text-body-xl font-semibold text-Mblack mb-3'>Order Tracking</h3>
                                <p className='text-body-md-regular text-Mgray'>
                                    Receive instant notifications, manage orders, and communicate with customers seamlessly.
                                </p>
                            </div>
                        </Col>

                        <Col md={6} lg={4}>
                            <div className="bg-Koffwhite rounded-[20px] p-6 h-full">
                                <div className="w-16 h-16 bg-Myellow rounded-full flex items-center justify-center mb-4">
                                    <span className="text-3xl">📊</span>
                                </div>
                                <h3 className='text-body-xl font-semibold text-Mblack mb-3'>Inventory Control</h3>
                                <p className='text-body-md-regular text-Mgray'>
                                    Track stock levels, get low-stock alerts, and never run out of your best sellers.
                                </p>
                            </div>
                        </Col>

                        <Col md={6} lg={4}>
                            <div className="bg-Koffwhite rounded-[20px] p-6 h-full">
                                <div className="w-16 h-16 bg-Myellow rounded-full flex items-center justify-center mb-4">
                                    <span className="text-3xl">💳</span>
                                </div>
                                <h3 className='text-body-xl font-semibold text-Mblack mb-3'>Payment Management</h3>
                                <p className='text-body-md-regular text-Mgray'>
                                    Secure payments via Stripe. Get paid fast with automatic payouts to your bank account.
                                </p>
                            </div>
                        </Col>

                        <Col md={6} lg={4}>
                            <div className="bg-Koffwhite rounded-[20px] p-6 h-full">
                                <div className="w-16 h-16 bg-Myellow rounded-full flex items-center justify-center mb-4">
                                    <span className="text-3xl">⭐</span>
                                </div>
                                <h3 className='text-body-xl font-semibold text-Mblack mb-3'>Reviews & Ratings</h3>
                                <p className='text-body-md-regular text-Mgray'>
                                    Build trust with customer reviews and showcase your 5-star service.
                                </p>
                            </div>
                        </Col>

                        <Col md={6} lg={4}>
                            <div className="bg-Koffwhite rounded-[20px] p-6 h-full">
                                <div className="w-16 h-16 bg-Myellow rounded-full flex items-center justify-center mb-4">
                                    <span className="text-3xl">📱</span>
                                </div>
                                <h3 className='text-body-xl font-semibold text-Mblack mb-3'>Mobile First</h3>
                                <p className='text-body-md-regular text-Mgray'>
                                    Manage your business on the go. iOS and Android apps coming soon.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Pricing Section */}
            <section className='bg-Koffwhite py-[100px]' id="pricing">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className='text-h2-normal text-Mblack mb-4'>Simple, Transparent Pricing</h2>
                        <p className='text-body-lg-regular text-Mgray max-w-2xl mx-auto mb-8'>
                            Choose the plan that fits your business. All plans include verification and shop management.
                        </p>

                        {/* Billing Period Toggle */}
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <span className={`text-body-md ${billingPeriod === 'monthly' ? 'font-semibold text-Mblack' : 'text-Mgray'}`}>Monthly</span>
                            <button
                                onClick={() => setBillingPeriod(billingPeriod === 'yearly' ? 'monthly' : 'yearly')}
                                className={`relative w-14 h-7 rounded-full transition-colors ${billingPeriod === 'yearly' ? 'bg-Myellow' : 'bg-gray-300'}`}
                            >
                                <span className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${billingPeriod === 'yearly' ? 'right-1' : 'left-1'}`}></span>
                            </button>
                            <span className={`text-body-md ${billingPeriod === 'yearly' ? 'font-semibold text-Mblack' : 'text-Mgray'}`}>
                                Yearly <span className="text-green-600 text-sm">(Save 41%)</span>
                            </span>
                        </div>
                    </div>

                    <Row className='justify-center gap-y-8'>
                        {/* Kinn Hobbyist Plan */}
                        <Col lg={5}>
                            <div className="bg-white rounded-[30px] p-8 shadow-lg h-full flex flex-col border-2 border-gray-200 hover:border-Myellow transition-all">
                                <div className="mb-6">
                                    <h3 className='text-h3 text-Mblack mb-2'>Kinn Hobbyist</h3>
                                    <p className='text-body-md-regular text-Mgray'>Home cooks, side hustlers, first-time sellers</p>
                                </div>

                                <div className="mb-6">
                                    {billingPeriod === 'yearly' ? (
                                        <>
                                            <div className="flex items-baseline gap-2">
                                                <span className='text-5xl font-bold text-Mblack'>£4.92</span>
                                                <span className='text-body-lg-regular text-Mgray'>/month</span>
                                            </div>
                                            <p className='text-body-sm-regular text-Mgray mt-2'>£59 billed yearly</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-baseline gap-2">
                                                <span className='text-5xl font-bold text-Mblack'>£10</span>
                                                <span className='text-body-lg-regular text-Mgray'>/month</span>
                                            </div>
                                            <p className='text-body-sm-regular text-Mgray mt-2'>Billed monthly</p>
                                        </>
                                    )}
                                </div>

                                <div className="space-y-3 mb-8 flex-grow">
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 text-xl mt-1 flex-shrink-0">✓</span>
                                        <p className='text-body-md-regular text-Mblack'>Verified seller badge (safety + trust)</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 text-xl mt-1 flex-shrink-0">✓</span>
                                        <p className='text-body-md-regular text-Mblack'>Get discovered on Kinn marketplace</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 text-xl mt-1 flex-shrink-0">✓</span>
                                        <p className='text-body-md-regular text-Mblack'>Personalised shopfront</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 text-xl mt-1 flex-shrink-0">✓</span>
                                        <p className='text-body-md-regular text-Mblack'>Simple order and product management tools</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 text-xl mt-1 flex-shrink-0">✓</span>
                                        <p className='text-body-md-regular text-Mblack'>Stripe/Apple/Google Pay integration</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 text-xl mt-1 flex-shrink-0">✓</span>
                                        <p className='text-body-md-regular text-Mblack'>In-app chat with buyers</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 text-xl mt-1 flex-shrink-0">✓</span>
                                        <p className='text-body-md-regular text-Mblack'>Access to Kinn community tips & updates</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleSelectPlan('hobbyist')}
                                    disabled={loading}
                                    className="btn-secondary w-full text-center"
                                >
                                    {loading ? 'Loading...' : 'Start with Hobbyist'}
                                </button>
                            </div>
                        </Col>

                        {/* Kinn Pro Plan */}
                        <Col lg={5}>
                            <div className="bg-gradient-to-br from-Myellow to-yellow-300 rounded-[30px] p-8 shadow-2xl h-full flex flex-col relative border-4 border-Myellow">
                                {/* Popular badge */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-Mblack text-white px-6 py-2 rounded-full text-body-sm font-semibold">
                                        ⭐ MOST POPULAR
                                    </span>
                                </div>

                                <div className="mb-6 mt-4">
                                    <h3 className='text-h3 text-Mblack mb-2'>Kinn Pro</h3>
                                    <p className='text-body-md-regular text-gray-800'>Licensed cooks, micro-bakers, sellers ready to scale</p>
                                </div>

                                <div className="mb-6">
                                    {billingPeriod === 'yearly' ? (
                                        <>
                                            <div className="flex items-baseline gap-2">
                                                <span className='text-5xl font-bold text-Mblack'>£8.25</span>
                                                <span className='text-body-lg-regular text-gray-800'>/month</span>
                                            </div>
                                            <p className='text-body-sm-regular text-gray-800 mt-2'>£99 billed yearly</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-baseline gap-2">
                                                <span className='text-5xl font-bold text-Mblack'>£15</span>
                                                <span className='text-body-lg-regular text-gray-800'>/month</span>
                                            </div>
                                            <p className='text-body-sm-regular text-gray-800 mt-2'>Billed monthly</p>
                                        </>
                                    )}
                                </div>

                                <div className="space-y-3 mb-8 flex-grow">
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-700 text-xl mt-1 font-bold flex-shrink-0">✓</span>
                                        <p className='text-body-md-regular text-Mblack font-medium'>All Hobbyist features, plus:</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-700 text-xl mt-1 flex-shrink-0">✓</span>
                                        <p className='text-body-md-regular text-Mblack'><strong>AI Seller Assistant</strong> - Menu writing, auto-listing from images, generate ingredients/allergens</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-700 text-xl mt-1 flex-shrink-0">✓</span>
                                        <p className='text-body-md-regular text-Mblack'><strong>Smart Social Generator</strong> - Create Instagram posts, captions, and hashtags automatically</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-700 text-xl mt-1 flex-shrink-0">✓</span>
                                        <p className='text-body-md-regular text-Mblack'><strong>Priority placement</strong> - Higher in marketplace search (local area)</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-700 text-xl mt-1 flex-shrink-0">✓</span>
                                        <p className='text-body-md-regular text-Mblack'><strong>Analytics Dashboard</strong> - Orders, top products, returning buyers</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-700 text-xl mt-1 flex-shrink-0">✓</span>
                                        <p className='text-body-md-regular text-Mblack'><strong>Featured badge</strong> - "Pro Kitchen" status</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleSelectPlan('pro')}
                                    disabled={loading}
                                    className="btn-primary w-full text-center bg-Mblack border-Mblack hover:bg-gray-800"
                                >
                                    {loading ? 'Loading...' : 'Start with Pro'}
                                </button>
                            </div>
                        </Col>
                    </Row>

                    {/* Enterprise/Partner Plan */}
                    <div className="mt-16 max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-Kmint to-teal-100 rounded-[30px] p-8 md:p-12">
                            <Row className="items-center gap-y-6">
                                <Col md={8}>
                                    <h3 className='text-h3 text-Mblack mb-3'>Enterprise / Partner Plan</h3>
                                    <p className='text-body-lg-regular text-gray-800 mb-4'>
                                        For small catering kitchens, local co-ops, or community partnerships
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-3">
                                            <span className="text-green-700 text-xl flex-shrink-0">✓</span>
                                            <p className='text-body-md-regular text-Mblack'>Multi-seller team management</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-green-700 text-xl flex-shrink-0">✓</span>
                                            <p className='text-body-md-regular text-Mblack'>Bulk order & catering support</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-green-700 text-xl flex-shrink-0">✓</span>
                                            <p className='text-body-md-regular text-Mblack'>Direct community partnership and co-branding</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4} className="text-center md:text-right">
                                    <p className='text-h3 text-Mblack mb-4'>Custom Pricing</p>
                                    <a href="mailto:hello@eatwithkinn.com" className="btn-primary inline-block">
                                        Contact Us
                                    </a>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="text-center mt-12">
                        <p className='text-body-md-regular text-Mgray'>
                            💡 30-day free trial • Cancel anytime • No hidden fees
                        </p>
                    </div>
                </Container>
            </section>

            {/* AI Features Showcase (Pro Plan) */}
            <section className='bg-white py-[80px]'>
                <Container>
                    <div className="text-center mb-12">
                        <span className="inline-block bg-Myellow text-Mblack px-4 py-2 rounded-full text-body-md font-semibold mb-4">
                            ✨ Kinn Pro Features
                        </span>
                        <h2 className='text-h2-normal text-Mblack mb-4'>Powered by AI</h2>
                        <p className='text-body-lg-regular text-Mgray max-w-2xl mx-auto'>
                            Let artificial intelligence handle the busywork so you can focus on cooking.
                        </p>
                    </div>

                    <Row className='gap-y-12'>
                        <Col md={6} className="flex items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-4xl">🤖</span>
                                    <h3 className='text-h3 text-Mblack mb-0'>AI Shop Assistant</h3>
                                </div>
                                <p className='text-body-lg-regular text-Mgray mb-4'>
                                    Generate mouth-watering product descriptions, optimize for search, and translate listings—all automatically.
                                </p>
                                <ul className="space-y-2 text-body-md-regular text-Mgray">
                                    <li>✓ Write compelling product descriptions in seconds</li>
                                    <li>✓ SEO optimization for better discovery</li>
                                    <li>✓ Multi-language support for diverse customers</li>
                                </ul>
                            </div>
                        </Col>
                        <Col md={6} className="flex items-center justify-center">
                            <div className="bg-Koffwhite rounded-[20px] p-8 w-full">
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <p className="text-body-sm text-Mgray mb-2">AI Generated:</p>
                                    <p className="text-body-md text-Mblack italic">
                                        "Indulge in our artisan chocolate brownies—rich, fudgy, and baked fresh daily with premium Belgian chocolate. Perfect for gifting or treating yourself! 🍫"
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col md={6} className="flex items-center justify-center order-md-1">
                            <div className="bg-Koffwhite rounded-[20px] p-8 w-full">
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <p className="text-body-sm text-Mgray mb-2">AI Prediction:</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-body-md">
                                            <span>Chocolate Brownies</span>
                                            <span className="text-green-600 font-semibold">↑ 24 units</span>
                                        </div>
                                        <div className="flex justify-between text-body-md">
                                            <span>Sourdough Loaf</span>
                                            <span className="text-orange-600 font-semibold">→ 12 units</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="flex items-center order-md-2">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-4xl">📈</span>
                                    <h3 className='text-h3 text-Mblack mb-0'>Smart Inventory</h3>
                                </div>
                                <p className='text-body-lg-regular text-Mgray mb-4'>
                                    AI analyzes your sales patterns and predicts what you'll need to stock. Never waste ingredients or run out again.
                                </p>
                                <ul className="space-y-2 text-body-md-regular text-Mgray">
                                    <li>✓ Forecast demand based on trends & seasonality</li>
                                    <li>✓ Low-stock alerts before you run out</li>
                                    <li>✓ Reduce food waste with smart predictions</li>
                                </ul>
                            </div>
                        </Col>

                        <Col md={6} className="flex items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-4xl">🚀</span>
                                    <h3 className='text-h3 text-Mblack mb-0'>Easy Migration</h3>
                                </div>
                                <p className='text-body-lg-regular text-Mgray mb-4'>
                                    Already selling elsewhere? Our AI imports your products, images, and descriptions from Shopify, Etsy, Instagram, and more.
                                </p>
                                <ul className="space-y-2 text-body-md-regular text-Mgray">
                                    <li>✓ One-click import from other platforms</li>
                                    <li>✓ Automatic data cleaning & formatting</li>
                                    <li>✓ Keep your existing product photos & details</li>
                                </ul>
                            </div>
                        </Col>
                        <Col md={6} className="flex items-center justify-center">
                            <div className="bg-Koffwhite rounded-[20px] p-8 w-full">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                                        <span className="text-2xl">🛍️</span>
                                        <span className="text-body-md text-Mblack">Import from your own website</span>
                                        <span className="ml-auto text-green-600">✓</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                                        <span className="text-2xl">🎨</span>
                                        <span className="text-body-md text-Mblack">Import from PDF</span>
                                        <span className="ml-auto text-green-600">✓</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                                        <span className="text-2xl">📸</span>
                                        <span className="text-body-md text-Mblack">Import from Screenshots</span>
                                        <span className="ml-auto text-green-600">✓</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Why Kinn Section */}
            <section className='bg-Kmint py-[80px]'>
                <Container>
                    <Row className='items-center gap-y-8'>
                        <Col lg={6}>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-h2-normal">💚</span>
                                <h2 className='text-h2-normal text-Mblack mb-0'>Why Sellers Choose Kinn</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-body-xl text-green-600 mt-1">✓</span>
                                    <div>
                                        <h3 className='text-body-xl font-semibold text-Mblack mb-1'>Built for Food Sellers</h3>
                                        <p className='text-body-md-regular text-Mgray'>Not a generic e-commerce tool. Every feature designed specifically for food businesses.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-body-xl text-green-600 mt-1">✓</span>
                                    <div>
                                        <h3 className='text-body-xl font-semibold text-Mblack mb-1'>Verified & Trusted</h3>
                                        <p className='text-body-md-regular text-Mgray'>Manual verification builds buyer trust and keeps standards high.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-body-xl text-green-600 mt-1">✓</span>
                                    <div>
                                        <h3 className='text-body-xl font-semibold text-Mblack mb-1'>Fair Pricing</h3>
                                        <p className='text-body-md-regular text-Mgray'>No hidden fees or commission on sales. Just simple annual pricing.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-body-xl text-green-600 mt-1">✓</span>
                                    <div>
                                        <h3 className='text-body-xl font-semibold text-Mblack mb-1'>Community Support</h3>
                                        <p className='text-body-md-regular text-Mgray'>Join a network of passionate food entrepreneurs helping each other grow.</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="rounded-[20px] overflow-hidden">
                                <img src="/images/a-woman-cooking-fun.jpg" className='w-full h-auto' alt="Happy food seller" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA Section */}
            <section className='bg-gradient-to-br from-Myellow to-yellow-300 py-[100px]'>
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className='text-h1 text-Mblack mb-6'>
                            Ready to Grow Your Food Business?
                        </h2>
                        <p className='text-body-xl-regular text-gray-800 mb-8'>
                            Join hundreds of food sellers already managing their shops with Kinn Seller.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                            <NavLink to="/auth/signup" className="btn-primary bg-Mblack border-Mblack hover:bg-gray-800 px-8 py-4 text-body-lg">
                                Start Your 14-Day Free Trial
                            </NavLink>
                            <NavLink to="/founding-sellers" className="btn-secondary px-8 py-4 text-body-lg">
                                Become a Founding Seller
                            </NavLink>
                        </div>
                        <p className="text-body-sm-regular text-gray-700">
                            Questions? Email us at <a href="mailto:hello@eatwithkinn.com" className="underline font-semibold">hello@eatwithkinn.com</a>
                        </p>
                    </div>
                </Container>
            </section>
        </Fragment>
    )
}

export default KinnSeller
