import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const SellerOnboarding = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [sellerData, setSellerData] = useState(null)
    const [businessName, setBusinessName] = useState('')
    const [applicationStatus, setApplicationStatus] = useState(null)
    const [checkingApplication, setCheckingApplication] = useState(true)

    useEffect(() => {
        // Check if coming back from Stripe onboarding
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.get('return') === 'stripe' && user) {
            checkConnectAccountStatus()
        } else {
            checkApplicationAndSellerStatus()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const checkApplicationAndSellerStatus = async () => {
        if (!user) return

        setCheckingApplication(true)

        try {
            // First check if user has an approved application
            const { data: application, error: appError } = await supabase
                .from('seller_applications')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle()

            if (appError && appError.code !== 'PGRST116') {
                console.error('Error checking application:', appError)
            }

            setApplicationStatus(application?.status || null)

            // If no application or not approved, block access
            if (!application) {
                // Redirect to application page
                window.location.href = '/open-your-shop-welcome'
                return
            }

            if (application.status === 'pending') {
                window.location.href = '/application/pending'
                return
            }

            if (application.status === 'rejected') {
                // Stay on page but show rejection message
                setCheckingApplication(false)
                return
            }

            // Application is approved, proceed with seller onboarding
            const { data, error } = await supabase
                .from('shops')
                .select('*')
                .eq('primary_owner_user_id', user.id)
                .maybeSingle()

            if (error && error.code !== 'PGRST116') {
                console.error('Error checking seller status:', error)
                return
            }

            if (data) {
                setSellerData(data)
                setBusinessName(data.name || application.shop_name || '')
            } else {
                // Use shop name from approved application
                setBusinessName(application.shop_name || '')
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setCheckingApplication(false)
        }
    }

    const checkConnectAccountStatus = async () => {
        if (!user) return

        setCheckingApplication(true)

        try {
            console.log('[DEBUG] Checking Connect account status for user:', user.id)

            // Call Edge Function to check Connect account status
            const { data, error } = await supabase.functions.invoke('check-connect-status', {
                body: { userId: user.id }
            })

            console.log('[DEBUG] Edge function response:', { data, error })

            if (error) {
                console.error('[ERROR] Error checking Connect status:', error)
                alert(`Failed to check Connect status: ${error.message || JSON.stringify(error)}`)
                // Fall back to regular status check
                checkApplicationAndSellerStatus()
                return
            }

            console.log('[SUCCESS] Connect status check result:', data)
            console.log('[DEBUG] Onboarding complete?', data?.onboardingComplete)
            console.log('[DEBUG] Charges enabled?', data?.chargesEnabled)
            console.log('[DEBUG] Payouts enabled?', data?.payoutsEnabled)

            // If onboarding is complete, reload to show success message
            if (data && data.onboardingComplete) {
                console.log('[SUCCESS] Onboarding is complete! Redirecting...')
                window.location.href = '/seller/onboarding?complete=true'
            } else {
                console.log('[INFO] Onboarding not yet complete, showing regular page')
                // Onboarding still incomplete, show regular page
                checkApplicationAndSellerStatus()
            }
        } catch (error) {
            console.error('[ERROR] Exception checking Connect status:', error)
            alert(`Exception: ${error.message}`)
            // Fall back to regular status check
            checkApplicationAndSellerStatus()
        }
    }

    const handleCreateSellerAccount = async () => {
        if (!businessName.trim()) {
            alert('Please enter your business name')
            return
        }

        setLoading(true)

        try {
            // First, ensure user exists in users table
            console.log('Checking if user exists in users table...');
            // eslint-disable-next-line no-unused-vars
            const { data: existingUser, error: userCheckError } = await supabase
                .from('users')
                .select('id')
                .eq('id', user.id)
                .maybeSingle()

            if (!existingUser) {
                console.log('User not found, creating user record...');
                const { error: userCreateError } = await supabase
                    .from('users')
                    .insert({
                        id: user.id,
                        email: user.email,
                        user_type: 'buyer', // Default to buyer
                    })

                if (userCreateError) {
                    console.error('User creation error:', userCreateError);
                    throw new Error(`Failed to create user: ${userCreateError.message}`);
                }

                // Assign default 'buyer' role
                await supabase
                    .from('roles')
                    .insert({
                        user_id: user.id,
                        role: 'buyer',
                        scope: 'global',
                    })

                console.log('User created successfully with buyer role');
            } else {
                console.log('User already exists');
            }

            // Create shop record if doesn't exist
            if (!sellerData) {
                console.log('Creating new shop with data:', {
                    primary_owner_user_id: user.id,
                    name: businessName,
                });

                const { data: newShop, error: shopError } = await supabase
                    .from('shops')
                    .insert({
                        primary_owner_user_id: user.id,
                        name: businessName,
                        stripe_onboarding_completed: false,
                        stripe_payouts_enabled: false,
                    })
                    .select()
                    .single()

                if (shopError) {
                    console.error('Shop creation error:', shopError);
                    throw new Error(`Failed to create shop: ${shopError.message}`);
                }

                console.log('Shop created successfully:', newShop);
                setSellerData(newShop)
            }

            // Call Edge Function to create Stripe Connect account
            console.log('Calling create-connect-account function...');
            const { data, error } = await supabase.functions.invoke('create-connect-account', {
                body: {
                    userId: user.id,
                    businessName: businessName,
                    email: user.email,
                }
            })

            if (error) {
                console.error('Edge function error:', error);
                throw new Error(`Stripe Connect error: ${error.message}`);
            }

            console.log('Stripe Connect response:', data);

            // Redirect to Stripe onboarding
            if (data.accountLinkUrl) {
                window.location.href = data.accountLinkUrl
            }
        } catch (error) {
            console.error('Error creating seller account:', error)
            alert('Failed to create seller account. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleRefreshOnboarding = async () => {
        setLoading(true)

        try {
            const { data, error } = await supabase.functions.invoke('create-connect-account', {
                body: {
                    userId: user.id,
                    businessName: businessName,
                    email: user.email,
                }
            })

            if (error) {
                throw error
            }

            if (data.accountLinkUrl) {
                window.location.href = data.accountLinkUrl
            }
        } catch (error) {
            console.error('Error refreshing onboarding:', error)
            alert('Failed to refresh onboarding. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Fragment>
            <section className='pb-0 pt-[120px] bg-[#F8F8F8] min-h-screen'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={8}>
                            <div className="bg-white rounded-[20px] p-6 md:p-8">
                                {checkingApplication ? (
                                    <div className="text-center py-8">
                                        <svg className="animate-spin h-12 w-12 text-[#FEC51C] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <p className="text-body-md text-gray-600">Checking your application status...</p>
                                    </div>
                                ) : applicationStatus === 'rejected' ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h4 className='text-h5 text-Mblack mb-2'>Application Not Approved</h4>
                                        <p className='text-body-md text-gray-600 mb-6'>
                                            Unfortunately, your seller application was not approved at this time. Please contact us at{' '}
                                            <a href="mailto:hello@eatwithkinn.com" className="text-[#FEC51C] hover:underline">
                                                hello@eatwithkinn.com
                                            </a>{' '}
                                            for more information.
                                        </p>
                                        <a href='/' className='btn-secondary'>
                                            Back to Home
                                        </a>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className='text-h3 text-Mblack mb-4'>Become a Seller</h2>

                                {!sellerData?.stripe_onboarding_completed ? (
                                    <>
                                        <p className='text-body-lg text-gray-600 mb-6'>
                                            Start selling your delicious food on our platform. Complete the onboarding process to get started.
                                        </p>

                                        <div className="mb-6">
                                            <h4 className='text-h6 text-Mblack mb-3'>Benefits of selling on our platform:</h4>
                                            <ul className='space-y-2 text-body-md text-gray-600'>
                                                <li className='flex items-start gap-2'>
                                                    <svg className='w-5 h-5 text-[#FEC51C] mt-1 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                                    </svg>
                                                    Reach thousands of hungry customers
                                                </li>
                                                <li className='flex items-start gap-2'>
                                                    <svg className='w-5 h-5 text-[#FEC51C] mt-1 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                                    </svg>
                                                    Flexible subscription plans to fit your business
                                                </li>
                                                <li className='flex items-start gap-2'>
                                                    <svg className='w-5 h-5 text-[#FEC51C] mt-1 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                                    </svg>
                                                    Fast and secure payouts
                                                </li>
                                                <li className='flex items-start gap-2'>
                                                    <svg className='w-5 h-5 text-[#FEC51C] mt-1 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                                    </svg>
                                                    24/7 seller support
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="mb-6">
                                            <label className='text-body-md font-medium text-Mblack mb-2 block'>Business Name</label>
                                            <input
                                                type="text"
                                                value={businessName}
                                                onChange={(e) => setBusinessName(e.target.value)}
                                                className='w-full px-4 h-[54px] rounded-[20px] text-Mblack bg-[#FAFAFA] border border-solid !border-[#F5F5F5] outline-none focus:!border-[#FEC51C] placeholder:text-[#A3A3A3] text-body-md'
                                                placeholder='Enter your business name'
                                            />
                                        </div>

                                        {sellerData?.stripe_account_id && !sellerData?.stripe_onboarding_completed ? (
                                            <div className="space-y-4">
                                                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-[12px]">
                                                    <p className='text-body-sm text-yellow-800'>
                                                        Your onboarding is incomplete. Please complete the process to start accepting payments.
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={handleRefreshOnboarding}
                                                    disabled={loading}
                                                    className='btn-primary w-full'
                                                >
                                                    {loading ? 'Loading...' : 'Continue Onboarding'}
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={handleCreateSellerAccount}
                                                disabled={loading || !businessName.trim()}
                                                className='btn-primary w-full'
                                            >
                                                {loading ? 'Loading...' : 'Start Onboarding'}
                                            </button>
                                        )}

                                        <p className='text-body-sm text-gray-500 mt-4 text-center'>
                                            You'll be redirected to Stripe to complete your account setup
                                        </p>
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className='w-8 h-8 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                            </svg>
                                        </div>
                                        <h4 className='text-h5 text-Mblack mb-2'>Onboarding Complete!</h4>
                                        <p className='text-body-md text-gray-600 mb-6'>
                                            Your seller account is ready. Choose a subscription plan to start selling.
                                        </p>
                                        <a href='/subscription' className='btn-primary'>
                                            Choose Subscription Plan
                                        </a>
                                    </div>
                                )}
                                </>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    )
}

export default SellerOnboarding