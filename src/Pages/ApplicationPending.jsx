import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const ApplicationPending = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth/login');
            return;
        }

        fetchApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, navigate, user]);

    const fetchApplication = async () => {
        if (!user) return;

        try {
            const { data, error } = await supabase
                .from('seller_applications')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching application:', error);
                return;
            }

            if (!data) {
                // No application found, redirect to application page
                navigate('/open-your-shop-welcome');
                return;
            }

            setApplication(data);

            // If approved, redirect to onboarding
            if (data.status === 'approved') {
                navigate('/seller/onboarding');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Fragment>
                <section className='pb-0 pt-[120px] bg-[#F8F8F8] min-h-screen flex items-center justify-center'>
                    <div className="text-center">
                        <svg className="animate-spin h-12 w-12 text-[#FEC51C] mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-body-md text-gray-600 mt-4">Loading...</p>
                    </div>
                </section>
            </Fragment>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'approved':
                return 'bg-green-50 border-green-200 text-green-800';
            case 'rejected':
                return 'bg-red-50 border-red-200 text-red-800';
            default:
                return 'bg-gray-50 border-gray-200 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Under Review';
            case 'approved':
                return 'Approved';
            case 'rejected':
                return 'Not Approved';
            default:
                return status;
        }
    };

    return (
        <Fragment>
            <section className='pb-0 pt-[120px] bg-[#F8F8F8] min-h-screen'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={8}>
                            <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm">
                                {/* Success Icon */}
                                <div className="text-center mb-8">
                                    <div className="w-20 h-20 bg-[#FFF7E6] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-10 h-10 text-[#FEC51C]" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h1 className="text-h3 text-Mblack mb-3">Application Received!</h1>
                                    <p className="text-body-lg text-gray-600">Thank you for applying to become a seller on Kinn.</p>
                                </div>

                                {/* Status Badge */}
                                <div className="flex justify-center mb-8">
                                    <div className={`inline-flex items-center px-4 py-2 rounded-full border-2 ${getStatusColor(application?.status)}`}>
                                        <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                                        <span className="text-body-md font-medium">Status: {getStatusText(application?.status)}</span>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="mb-8 p-6 bg-gray-50 rounded-[12px]">
                                    <h3 className="text-h6 text-Mblack mb-6">What happens next?</h3>

                                    <div className="space-y-6">
                                        {/* Step 1 */}
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-body-md font-semibold text-Mblack">Application Submitted</h4>
                                                <p className="text-body-sm text-gray-600">Your application has been received and is in our review queue.</p>
                                                <p className="text-body-xs text-gray-500 mt-1">
                                                    {new Date(application?.created_at).toLocaleDateString('en-GB', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Step 2 */}
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className={`w-8 h-8 ${application?.status !== 'pending' ? 'bg-green-500' : 'bg-[#FEC51C]'} rounded-full flex items-center justify-center`}>
                                                    {application?.status !== 'pending' ? (
                                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-body-md font-semibold text-Mblack">Review in Progress</h4>
                                                <p className="text-body-sm text-gray-600">Our team is reviewing your application and documents.</p>
                                                <p className="text-body-xs text-gray-500 mt-1">Usually takes 5-7 business days</p>
                                            </div>
                                        </div>

                                        {/* Step 3 */}
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className={`w-8 h-8 ${application?.status === 'approved' ? 'bg-green-500' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                                                    {application?.status === 'approved' ? (
                                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        <span className="text-white text-body-sm">3</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-body-md font-semibold text-Mblack">Decision & Notification</h4>
                                                <p className="text-body-sm text-gray-600">We'll email you with our decision and next steps.</p>
                                            </div>
                                        </div>

                                        {/* Step 4 */}
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                                    <span className="text-white text-body-sm">4</span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-body-md font-semibold text-Mblack">Complete Stripe Onboarding</h4>
                                                <p className="text-body-sm text-gray-600">Once approved, set up your payment account to start selling.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Application Details */}
                                <div className="mb-8 p-6 border border-gray-200 rounded-[12px]">
                                    <h3 className="text-h6 text-Mblack mb-4">Your Application Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-body-md text-gray-600">Shop Name:</span>
                                            <span className="text-body-md font-medium text-Mblack">{application?.shop_name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-body-md text-gray-600">Food Type:</span>
                                            <span className="text-body-md font-medium text-Mblack">{application?.food_type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-body-md text-gray-600">Email:</span>
                                            <span className="text-body-md font-medium text-Mblack">{application?.email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-body-md text-gray-600">Phone:</span>
                                            <span className="text-body-md font-medium text-Mblack">{application?.phone_number}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-[12px]">
                                    <h4 className="text-body-md font-semibold text-blue-900 mb-2">Need Help?</h4>
                                    <p className="text-body-sm text-blue-800">
                                        If you have any questions about your application, please contact us at{' '}
                                        <a href="mailto:hello@eatwithkinn.com" className="underline font-medium">
                                            hello@eatwithkinn.com
                                        </a>
                                    </p>
                                </div>

                                {/* Back to Home Button */}
                                <div className="text-center mt-8">
                                    <a href="/" className="btn-secondary">
                                        Back to Home
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
};

export default ApplicationPending;