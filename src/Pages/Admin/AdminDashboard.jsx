import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [applications, setApplications] = useState([]);
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        // Wait for auth to finish loading
        if (authLoading) {
            return;
        }

        if (!isAuthenticated) {
            navigate('/auth/login');
            return;
        }

        if (!user) {
            return;
        }

        checkAdminAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, navigate, user, authLoading]);

    const checkAdminAccess = async () => {
        if (!user) return;

        try {
            // Check if user has user_type = 'admin' in users table
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('user_type')
                .eq('id', user.id)
                .maybeSingle();

            if (userError) {
                console.error('Error checking user:', userError);
                alert(`Database error: ${userError.message}`);
                navigate('/');
                return;
            }

            if (userData?.user_type !== 'admin') {
                alert('Access denied. Admin privileges required.');
                navigate('/');
                return;
            }

            setIsAdmin(true);
            fetchApplications();
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
            navigate('/');
        }
    };

    const fetchApplications = async () => {
        setLoading(true);

        try {
            const { data, error } = await supabase
                .from('seller_applications')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching applications:', error);
                alert(`Error loading applications: ${error.message}`);
                return;
            }

            setApplications(data || []);
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (applicationId, newStatus) => {
        if (!window.confirm(`Are you sure you want to ${newStatus} this application?`)) {
            return;
        }

        setLoading(true);

        try {
            // Get application details
            const application = applications.find(app => app.id === applicationId);
            if (!application) {
                alert('Application not found.');
                return;
            }

            // If approving, update user_type and activate shop
            if (newStatus === 'approved') {
                console.log('Approving application for user:', application.user_id);

                // Update user_type to seller
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .update({ user_type: 'seller' })
                    .eq('id', application.user_id)
                    .select();

                if (userError) {
                    console.error('Error updating user type:', userError);
                    alert(`Failed to update user type to seller: ${userError.message}`);
                    setLoading(false);
                    return;
                }

                console.log('User type updated:', userData);

                // Update shop status to active (if shop exists)
                const { data: shopData, error: shopError } = await supabase
                    .from('shops')
                    .update({ status: 'active' })
                    .eq('primary_owner_user_id', application.user_id)
                    .select();

                if (shopError) {
                    console.error('Error updating shop status:', shopError);
                    alert(`Failed to activate shop: ${shopError.message}`);
                    setLoading(false);
                    return;
                }

                console.log('Shop updated:', shopData);
            }

            // Update application status
            const { error: statusError } = await supabase
                .from('seller_applications')
                .update({
                    status: newStatus,
                    updated_at: new Date().toISOString()
                })
                .eq('id', applicationId);

            if (statusError) {
                console.error('Error updating status:', statusError);
                alert('Failed to update application status.');
                setLoading(false);
                return;
            }

            // TODO: Send email notification in production
            // For now, skipping email in development to avoid CORS errors

            alert(`Application ${newStatus} successfully!`);
            fetchApplications();
            setSelectedApplication(null);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update application status.');
        } finally {
            setLoading(false);
        }
    };

    const filteredApplications = applications.filter(app => {
        if (filter === 'all') return true;
        return app.status === filter;
    });

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            approved: 'bg-green-100 text-green-800 border-green-300',
            rejected: 'bg-red-100 text-red-800 border-red-300'
        };
        return styles[status] || 'bg-gray-100 text-gray-800 border-gray-300';
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

    if (!isAdmin) {
        return null;
    }

    return (
        <Fragment>
            <section className='pb-8 pt-[120px] bg-[#F8F8F8] min-h-screen'>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="mb-6">
                                <h1 className="text-h2 text-Mblack mb-2">Admin Dashboard</h1>
                                <p className="text-body-lg text-gray-600">Manage seller applications</p>
                            </div>

                            {/* Filter Tabs */}
                            <div className="bg-white rounded-[20px] p-4 mb-4 shadow-sm">
                                <div className="flex gap-3 flex-wrap">
                                    <button
                                        onClick={() => setFilter('all')}
                                        className={`px-4 py-2 rounded-[12px] font-medium transition-colors ${
                                            filter === 'all'
                                                ? 'bg-[#FEC51C] text-Mblack'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        All ({applications.length})
                                    </button>
                                    <button
                                        onClick={() => setFilter('pending')}
                                        className={`px-4 py-2 rounded-[12px] font-medium transition-colors ${
                                            filter === 'pending'
                                                ? 'bg-[#FEC51C] text-Mblack'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        Pending ({applications.filter(a => a.status === 'pending').length})
                                    </button>
                                    <button
                                        onClick={() => setFilter('approved')}
                                        className={`px-4 py-2 rounded-[12px] font-medium transition-colors ${
                                            filter === 'approved'
                                                ? 'bg-[#FEC51C] text-Mblack'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        Approved ({applications.filter(a => a.status === 'approved').length})
                                    </button>
                                    <button
                                        onClick={() => setFilter('rejected')}
                                        className={`px-4 py-2 rounded-[12px] font-medium transition-colors ${
                                            filter === 'rejected'
                                                ? 'bg-[#FEC51C] text-Mblack'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        Rejected ({applications.filter(a => a.status === 'rejected').length})
                                    </button>
                                </div>
                            </div>

                            {/* Applications List */}
                            <div className="space-y-4">
                                {filteredApplications.length === 0 ? (
                                    <div className="bg-white rounded-[20px] p-8 text-center shadow-sm">
                                        <p className="text-body-lg text-gray-500">No applications found</p>
                                    </div>
                                ) : (
                                    filteredApplications.map(app => (
                                        <div key={app.id} className="bg-white rounded-[20px] p-6 shadow-sm">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-h5 text-Mblack mb-1">{app.shop_name}</h3>
                                                    <p className="text-body-md text-gray-600">{app.food_type}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full border text-body-sm font-medium ${getStatusBadge(app.status)}`}>
                                                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <p className="text-body-sm text-gray-500">Applicant</p>
                                                    <p className="text-body-md text-Mblack font-medium">{app.full_name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-body-sm text-gray-500">Email</p>
                                                    <p className="text-body-md text-Mblack">{app.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-body-sm text-gray-500">Phone</p>
                                                    <p className="text-body-md text-Mblack">{app.phone_number}</p>
                                                </div>
                                                <div>
                                                    <p className="text-body-sm text-gray-500">Applied</p>
                                                    <p className="text-body-md text-Mblack">
                                                        {new Date(app.created_at).toLocaleDateString('en-GB', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setSelectedApplication(selectedApplication?.id === app.id ? null : app)}
                                                    className="btn-secondary"
                                                >
                                                    {selectedApplication?.id === app.id ? 'Hide Details' : 'View Details'}
                                                </button>

                                                {app.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(app.id, 'approved')}
                                                            className="px-4 py-2 bg-green-600 text-white rounded-[20px] font-medium hover:bg-green-700 transition-colors"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(app.id, 'rejected')}
                                                            className="px-4 py-2 bg-red-600 text-white rounded-[20px] font-medium hover:bg-red-700 transition-colors"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}

                                                {(app.status === 'approved' || app.status === 'rejected') && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(app.id, 'pending')}
                                                        className="px-4 py-2 bg-yellow-600 text-white rounded-[20px] font-medium hover:bg-yellow-700 transition-colors"
                                                    >
                                                        Reset to Pending
                                                    </button>
                                                )}
                                            </div>

                                            {/* Expanded Details */}
                                            {selectedApplication?.id === app.id && (
                                                <div className="mt-6 pt-6 border-t border-gray-200">
                                                    <h4 className="text-h6 text-Mblack mb-4">Application Details</h4>

                                                    <div className="space-y-4">
                                                        <div>
                                                            <p className="text-body-sm text-gray-500 mb-1">What makes their food special?</p>
                                                            <p className="text-body-md text-Mblack">{app.unique_selling_point || 'Not provided'}</p>
                                                        </div>

                                                        <div>
                                                            <p className="text-body-sm text-gray-500 mb-1">Food Business Registration</p>
                                                            <p className="text-body-md text-Mblack">
                                                                {app.has_food_business_registration ? 'Registered' : 'Not registered'}
                                                                {app.registration_status && ` (${app.registration_status})`}
                                                            </p>
                                                            {app.food_business_registration_document_url && (
                                                                <div className="mt-2">
                                                                    {app.food_business_registration_document_url.toLowerCase().endsWith('.pdf') ? (
                                                                        <a
                                                                            href={app.food_business_registration_document_url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-[12px] transition-colors"
                                                                        >
                                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                                            </svg>
                                                                            <span className="text-body-md">View PDF</span>
                                                                        </a>
                                                                    ) : (
                                                                        <a
                                                                            href={app.food_business_registration_document_url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="block cursor-pointer"
                                                                        >
                                                                            <img
                                                                                src={app.food_business_registration_document_url}
                                                                                alt="Registration Document"
                                                                                className="w-32 h-32 object-cover rounded-[12px] border border-gray-200 hover:border-[#FEC51C] transition-colors"
                                                                                onError={(e) => {
                                                                                    e.target.style.display = 'none';
                                                                                    e.target.nextSibling.style.display = 'block';
                                                                                }}
                                                                            />
                                                                            <p className="text-body-sm text-red-600 mt-2" style={{ display: 'none' }}>
                                                                                Unable to load image. <a href={app.food_business_registration_document_url} target="_blank" rel="noopener noreferrer" className="underline">Open in new tab</a>
                                                                            </p>
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <p className="text-body-sm text-gray-500 mb-1">Hygiene Certificate</p>
                                                            <p className="text-body-md text-Mblack">
                                                                {app.has_hygiene_certificate ? 'Provided' : 'Not provided'}
                                                            </p>
                                                            {app.hygiene_certificate_url && (
                                                                <div className="mt-2">
                                                                    {app.hygiene_certificate_url.toLowerCase().endsWith('.pdf') ? (
                                                                        <a
                                                                            href={app.hygiene_certificate_url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-[12px] transition-colors"
                                                                        >
                                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                                            </svg>
                                                                            <span className="text-body-md">View PDF</span>
                                                                        </a>
                                                                    ) : (
                                                                        <a
                                                                            href={app.hygiene_certificate_url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="block cursor-pointer"
                                                                        >
                                                                            <img
                                                                                src={app.hygiene_certificate_url}
                                                                                alt="Hygiene Certificate"
                                                                                className="w-32 h-32 object-cover rounded-[12px] border border-gray-200 hover:border-[#FEC51C] transition-colors"
                                                                                onError={(e) => {
                                                                                    e.target.style.display = 'none';
                                                                                    e.target.nextSibling.style.display = 'block';
                                                                                }}
                                                                            />
                                                                            <p className="text-body-sm text-red-600 mt-2" style={{ display: 'none' }}>
                                                                                Unable to load image. <a href={app.hygiene_certificate_url} target="_blank" rel="noopener noreferrer" className="underline">Open in new tab</a>
                                                                            </p>
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <p className="text-body-sm text-gray-500 mb-1">Terms Accepted</p>
                                                            <p className="text-body-md text-Mblack">
                                                                {app.terms_accepted ? 'Yes' : 'No'}
                                                                {app.terms_accepted_at && ` on ${new Date(app.terms_accepted_at).toLocaleDateString('en-GB')}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
};

export default AdminDashboard;
