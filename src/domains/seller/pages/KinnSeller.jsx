import React, { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { supabase } from '../../../lib/supabase'
import { SUBSCRIPTION_PLANS } from '../../../utils/stripe'

const KinnSeller = () => {
    const [billingPeriod, setBillingPeriod] = useState('yearly')
    const { isAuthenticated, user } = useAuth()
    const [loading, setLoading] = useState(false)

    const handleSelectPlan = async (planType) => {
        if (!isAuthenticated) {
            window.location.href = `/auth/signup?plan=${planType}&billing=${billingPeriod}`
            return
        }

        setLoading(true)

        try {
            const planConfig = SUBSCRIPTION_PLANS[planType][billingPeriod]

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
            <main className="bg-brand-cream">
                {/* Hero */}
                <section className="bg-gradient-to-br from-brand-honey via-yellow-300 to-brand-cream text-brand-forest">
                    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:grid lg:grid-cols-2 lg:items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full bg-brand-forest/10 px-4 py-2 text-sm font-medium backdrop-blur">
                                <span className="inline-block h-2 w-2 rounded-full bg-brand-honey animate-pulse" />
                                Join 48+ sellers on the waitlist
                            </div>
                            <h1 className="font-display text-5xl leading-tight text-brand-forest lg:text-6xl">
                                Your kitchen.<br/>Your business.<br/>
                                <span className="text-brand-honey">Your success.</span>
                            </h1>
                            <p className="text-xl text-brand-forest/80">
                                Turn your passion for cooking into a thriving business with Kinn's all-in-one seller platform. Built for home cooks, bakers, and caterers who want to grow.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="btn-primary"
                                >
                                    Start Your Free Trial
                                </button>
                                <button
                                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="btn-secondary"
                                >
                                    View Pricing
                                </button>
                            </div>
                            <p className="text-sm text-brand-forest/70">
                                ✨ 30-day free trial • No credit card required • Cancel anytime
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-honey/20 rounded-[32px] blur-3xl" />
                            <img
                                src="/images/seller_section.png"
                                className="relative w-full h-auto rounded-[32px] shadow-2xl"
                                alt="Kinn Seller Platform"
                            />
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="bg-white">
                    <div className="mx-auto max-w-6xl space-y-10 px-6 py-16">
                        <div className="space-y-4 text-center">
                            <h2 className="font-hand text-brand-slate text-h4">Everything you need</h2>
                            <h2 className="font-display text-4xl text-brand-forest">Powerful tools for food entrepreneurs</h2>
                            <p className="mx-auto max-w-3xl text-brand-forest/80">
                                Professional features designed specifically for small food sellers. No technical skills required.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="group rounded-[28px] bg-brand-cream p-6 transition hover:-translate-y-1 hover:shadow-xl">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-honey/30 text-3xl">
                                    🏪
                                </div>
                                <h3 className="font-display text-xl text-brand-forest mb-2">Shop Management</h3>
                                <p className="text-sm text-brand-forest/80">Update menus, prices, and availability in real-time. Your shop, your rules.</p>
                            </div>

                            <div className="group rounded-[28px] bg-brand-cream p-6 transition hover:-translate-y-1 hover:shadow-xl">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-honey/30 text-3xl">
                                    📦
                                </div>
                                <h3 className="font-display text-xl text-brand-forest mb-2">FSMS Management</h3>
                                <p className="text-sm text-brand-forest/80">Stay compliant with built-in food safety management system tools and tracking.</p>
                            </div>

                            <div className="group rounded-[28px] bg-brand-cream p-6 transition hover:-translate-y-1 hover:shadow-xl">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-honey/30 text-3xl">
                                    💳
                                </div>
                                <h3 className="font-display text-xl text-brand-forest mb-2">Secure Payments</h3>
                                <p className="text-sm text-brand-forest/80">Stripe-powered checkout with Apple Pay and Google Pay. Get paid fast.</p>
                            </div>

                            <div className="group rounded-[28px] bg-brand-cream p-6 transition hover:-translate-y-1 hover:shadow-xl">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-honey/30 text-3xl">
                                    📊
                                </div>
                                <h3 className="font-display text-xl text-brand-forest mb-2">Analytics</h3>
                                <p className="text-sm text-brand-forest/80">Track sales, understand your customers, and identify your best sellers.</p>
                            </div>

                            <div className="group rounded-[28px] bg-brand-cream p-6 transition hover:-translate-y-1 hover:shadow-xl">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-honey/30 text-3xl">
                                    ⭐
                                </div>
                                <h3 className="font-display text-xl text-brand-forest mb-2">Reviews & Trust</h3>
                                <p className="text-sm text-brand-forest/80">Build credibility with verified reviews and showcase your 5-star service.</p>
                            </div>

                            <div className="group rounded-[28px] bg-brand-cream p-6 transition hover:-translate-y-1 hover:shadow-xl">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-honey/30 text-3xl">
                                    🤖
                                </div>
                                <h3 className="font-display text-xl text-brand-forest mb-2">AI Assistant</h3>
                                <p className="text-sm text-brand-forest/80">Generate descriptions, optimize for search, and create social posts automatically.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section className="bg-brand-cream py-20" id="pricing">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-hand text-brand-slate text-h4">Pricing</h2>
                            <h2 className="font-display text-4xl text-brand-forest mb-4">Simple, transparent pricing</h2>
                            <p className="text-brand-forest/80 max-w-2xl mx-auto mb-8">
                                Choose the plan that fits your business. All plans include verification and shop management.
                            </p>

                            {/* Billing Toggle */}
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <span className={`text-sm ${billingPeriod === 'monthly' ? 'font-semibold text-brand-forest' : 'text-brand-forest/60'}`}>Monthly</span>
                                <button
                                    onClick={() => setBillingPeriod(billingPeriod === 'yearly' ? 'monthly' : 'yearly')}
                                    className={`relative w-14 h-7 rounded-full transition-colors ${billingPeriod === 'yearly' ? 'bg-brand-honey' : 'bg-brand-stone'}`}
                                >
                                    <span className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${billingPeriod === 'yearly' ? 'right-1' : 'left-1'}`}></span>
                                </button>
                                <span className={`text-sm ${billingPeriod === 'yearly' ? 'font-semibold text-brand-forest' : 'text-brand-forest/60'}`}>
                                    Yearly <span className="text-green-600 text-xs">(Save 41%)</span>
                                </span>
                            </div>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
                            {/* Hobbyist Plan */}
                            <div className="bg-white rounded-[32px] p-8 shadow-lg border-2 border-brand-stone/30 hover:border-brand-honey transition-all flex flex-col">
                                <div className="mb-6">
                                    <h3 className="font-display text-2xl text-brand-forest mb-2">Kinn Hobbyist</h3>
                                    <p className="text-sm text-brand-forest/70">Perfect for home cooks and side hustlers</p>
                                </div>

                                <div className="mb-6">
                                    {billingPeriod === 'yearly' ? (
                                        <>
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-display text-5xl text-brand-forest">£4.92</span>
                                                <span className="text-brand-forest/70">/month</span>
                                            </div>
                                            <p className="text-sm text-brand-forest/70 mt-1">£59 billed yearly</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-display text-5xl text-brand-forest">£10</span>
                                                <span className="text-brand-forest/70">/month</span>
                                            </div>
                                            <p className="text-sm text-brand-forest/70 mt-1">Billed monthly</p>
                                        </>
                                    )}
                                </div>

                                <div className="space-y-3 mb-8 flex-grow">
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 text-lg mt-1">✓</span>
                                        <p className="text-sm text-brand-forest">Verify your business registration</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 text-lg mt-1">✓</span>
                                        <p className="text-sm text-brand-forest">Show your hygiene certificates</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 text-lg mt-1">✓</span>
                                        <p className="text-sm text-brand-forest">Easy to set up shopfront</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 text-lg mt-1">✓</span>
                                        <p className="text-sm text-brand-forest">Order & product management</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 text-lg mt-1">✓</span>
                                        <p className="text-sm text-brand-forest">Stripe payment integration</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 text-lg mt-1">✓</span>
                                        <p className="text-sm text-brand-forest">In-app customer chat</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleSelectPlan('hobbyist')}
                                    disabled={loading}
                                    className="btn-secondary w-full"
                                >
                                    {loading ? 'Loading...' : 'Start with Hobbyist'}
                                </button>
                            </div>

                            {/* Pro Plan */}
                            <div className="bg-gradient-to-br from-brand-honey via-yellow-200 to-brand-honey rounded-[32px] p-8 shadow-2xl border-4 border-brand-honey relative flex flex-col">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-brand-forest text-white px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wide">
                                        ⭐ Most Popular
                                    </span>
                                </div>

                                <div className="mb-6 mt-2">
                                    <h3 className="font-display text-2xl text-brand-forest mb-2">Kinn Pro</h3>
                                    <p className="text-sm text-brand-forest/80">For sellers ready to scale</p>
                                </div>

                                <div className="mb-6">
                                    {billingPeriod === 'yearly' ? (
                                        <>
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-display text-5xl text-brand-forest">£8.25</span>
                                                <span className="text-brand-forest/80">/month</span>
                                            </div>
                                            <p className="text-sm text-brand-forest/80 mt-1">£99 billed yearly</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-display text-5xl text-brand-forest">£15</span>
                                                <span className="text-brand-forest/80">/month</span>
                                            </div>
                                            <p className="text-sm text-brand-forest/80 mt-1">Billed monthly</p>
                                        </>
                                    )}
                                </div>

                                <div className="space-y-3 mb-8 flex-grow">
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-700 text-lg mt-1 font-bold">✓</span>
                                        <p className="text-sm text-brand-forest font-medium">All Hobbyist features, plus:</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-700 text-lg mt-1">✓</span>
                                        <p className="text-sm text-brand-forest"><strong>AI shop migration</strong> - Migrate your shop with one click</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-700 text-lg mt-1">✓</span>
                                        <p className="text-sm text-brand-forest"><strong>AI safety assistant</strong> - Generate ingredients & allergy info to stay compliant</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-700 text-lg mt-1">✓</span>
                                        <p className="text-sm text-brand-forest"><strong>FSMS management</strong> - Food safety tracking & compliance</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-700 text-lg mt-1">✓</span>
                                        <p className="text-sm text-brand-forest"><strong>Personalised shopfront</strong> - Custom branding & design</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-700 text-lg mt-1">✓</span>
                                        <p className="text-sm text-brand-forest"><strong>Priority placement</strong> - Higher in search results</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-700 text-lg mt-1">✓</span>
                                        <p className="text-sm text-brand-forest"><strong>Analytics dashboard</strong> - Track performance</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-700 text-lg mt-1">✓</span>
                                        <p className="text-sm text-brand-forest"><strong>Pro Kitchen badge</strong> - Stand out</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleSelectPlan('pro')}
                                    disabled={loading}
                                    className="btn-primary w-full bg-brand-forest border-brand-forest hover:bg-brand-forest/90"
                                >
                                    {loading ? 'Loading...' : 'Start with Pro'}
                                </button>
                            </div>
                        </div>

                        {/* Enterprise */}
                        <div className="mt-12 max-w-4xl mx-auto">
                            <div className="bg-gradient-to-r from-brand-honey/40 to-brand-cream rounded-[32px] p-8 border-2 border-brand-honey/30">
                                <div className="grid md:grid-cols-[2fr_1fr] gap-6 items-center">
                                    <div>
                                        <h3 className="font-display text-2xl text-brand-forest mb-3">Enterprise Plan</h3>
                                        <p className="text-brand-forest/80 mb-4">
                                            For catering kitchens, local co-ops, and community partnerships
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <span className="text-green-600">✓</span>
                                                <p className="text-sm text-brand-forest">Multi-seller team management</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="text-green-600">✓</span>
                                                <p className="text-sm text-brand-forest">Bulk order & catering support</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="text-green-600">✓</span>
                                                <p className="text-sm text-brand-forest">Custom partnership & co-branding</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-display text-2xl text-brand-forest mb-4">Custom Pricing</p>
                                        <a href="mailto:hello@eatwithkinn.com" className="btn-primary inline-block">
                                            Contact Us
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-sm text-brand-forest/70 mt-8">
                            💡 30-day free trial • Cancel anytime • No hidden fees
                        </p>
                    </div>
                </section>

                {/* Why Choose Kinn */}
                <section className="bg-white">
                    <div className="mx-auto max-w-6xl grid gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-6">
                            <h2 className="font-display text-4xl text-brand-forest">Why sellers choose Kinn</h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl mt-1">✓</span>
                                    <div>
                                        <h3 className="font-display text-lg text-brand-forest mb-1">Built for Food Sellers</h3>
                                        <p className="text-sm text-brand-forest/80">Every feature designed specifically for food businesses, not generic e-commerce.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-2xl mt-1">✓</span>
                                    <div>
                                        <h3 className="font-display text-lg text-brand-forest mb-1">Verified & Trusted</h3>
                                        <p className="text-sm text-brand-forest/80">Manual verification builds buyer trust and keeps standards high across the platform.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-2xl mt-1">✓</span>
                                    <div>
                                        <h3 className="font-display text-lg text-brand-forest mb-1">Fair Pricing</h3>
                                        <p className="text-sm text-brand-forest/80">No commission on sales. No hidden fees. Just simple subscription pricing.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-2xl mt-1">✓</span>
                                    <div>
                                        <h3 className="font-display text-lg text-brand-forest mb-1">Community Support</h3>
                                        <p className="text-sm text-brand-forest/80">Join a network of passionate food entrepreneurs helping each other grow.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="rounded-[32px] overflow-hidden shadow-2xl">
                                <img src="/images/seller_section.png" alt="Happy Kinn seller" className="w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-gradient-to-br from-brand-honey via-yellow-300 to-brand-honey py-20">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <h2 className="font-display text-5xl text-brand-forest mb-6">
                            Ready to grow your food business?
                        </h2>
                        <p className="text-xl text-brand-forest/80 mb-8">
                            Join 48+ sellers already building their shops on Kinn.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                            <NavLink to="/auth/signup" className="btn-primary bg-brand-forest border-brand-forest hover:bg-brand-forest/90 px-8 py-4 text-lg">
                                Start Your Free Trial
                            </NavLink>
                            <NavLink to="/founding-sellers" className="btn-secondary px-8 py-4 text-lg">
                                Become a Founding Seller
                            </NavLink>
                        </div>
                        <p className="text-sm text-brand-forest/70">
                            Questions? Email us at <a href="mailto:hello@eatwithkinn.com" className="underline font-semibold hover:text-brand-forest">hello@eatwithkinn.com</a>
                        </p>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}

export default KinnSeller
