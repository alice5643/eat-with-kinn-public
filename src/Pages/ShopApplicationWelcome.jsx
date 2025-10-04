import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import ApplicationStep from '../Components/Application/ApplicationStep';
import FileUpload from '../Components/Application/FileUpload';
import TermsAcceptance from '../Components/Application/TermsAcceptance';

const ShopApplicationWelcome = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [existingApplication, setExistingApplication] = useState(null);

    // Form data
    const [formData, setFormData] = useState({
        termsAccepted: false,
        phoneNumber: '',
        hasFoodBusinessRegistration: null, // true, false, or 'pending'
        foodBusinessRegistrationDocumentUrl: '',
        hasHygieneCertificate: null,
        hygieneCertificateUrl: '',
        shopName: '',
        foodType: '',
        uniqueSellingPoint: '',
        existingSellingLink: ''
    });

    useEffect(() => {
        // Check if user is authenticated
        if (!isAuthenticated) {
            navigate('/auth/login?redirect=/open-your-shop-welcome');
            return;
        }

        // Check if user already has an application
        checkExistingApplication();

        // Auto-fill user data if available
        if (user) {
            setFormData(prev => ({
                ...prev,
                phoneNumber: user.user_metadata?.phone || prev.phoneNumber
            }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, navigate, user]);

    const checkExistingApplication = async () => {
        if (!user) return;

        try {
            const { data, error } = await supabase
                .from('seller_applications')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle();

            if (error && error.code !== 'PGRST116') {
                console.error('Error checking application:', error);
                return;
            }

            if (data) {
                setExistingApplication(data);
                // If application is pending or approved, redirect
                if (data.status === 'pending') {
                    navigate('/application/pending');
                } else if (data.status === 'approved') {
                    navigate('/seller/onboarding');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Generate a URL-friendly slug from the shop name for live preview
    const slugify = (value) => {
        if (!value) return 'your-shop';
        return value
            .toString()
            .toLowerCase()
            // normalize accents/diacritics
            .normalize('NFKD')
            .replace(/\p{Diacritic}/gu, '')
            // remove invalid chars
            .replace(/[^a-z0-9\s-]/g, '')
            // collapse whitespace
            .trim()
            .replace(/\s+/g, '-')
            // collapse dashes
            .replace(/-+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const shopSlug = slugify(formData.shopName);

    const validateStep = (step) => {
        // eslint-disable-next-line default-case
        switch (step) {
            case 2: // Phone number
                if (!formData.phoneNumber || formData.phoneNumber.trim().length < 10) {
                    alert('📱 We need your phone number to keep you updated about your application. Please enter a valid phone number.');
                    return false;
                }
                break;
            case 3: // Food business registration
                if (formData.hasFoodBusinessRegistration === null) {
                    alert('📋 Please let us know about your food business registration status so we can guide you through the process.');
                    return false;
                }
                break;
            case 4: // Registration document
                if (!formData.foodBusinessRegistrationDocumentUrl) {
                    alert('📄 We need to see your registration document to verify your food business. Please upload it to continue.');
                    return false;
                }
                break;
            case 6: // Business details
                if (!formData.shopName || !formData.shopName.trim()) {
                    alert('🏪 Please tell us your shop name - this is how customers will find you!');
                    return false;
                }
                if (!formData.foodType || !formData.foodType.trim()) {
                    alert('🍽️ We\'d love to know what type of food you want to sell! This helps us match you with the right customers.');
                    return false;
                }
                if (!formData.uniqueSellingPoint || !formData.uniqueSellingPoint.trim()) {
                    alert('✨ Please share what makes your food special! This is your chance to shine and attract customers.');
                    return false;
                }
                break;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleTermsAccept = () => {
        updateFormData('termsAccepted', true);
        handleNext();
    };

    const handleTermsDecline = () => {
        navigate('/');
    };

    const handleSubmitApplication = async () => {
        // Validate before submitting
        if (!validateStep(6)) {
            return;
        }

        setLoading(true);

        try {
            // Determine registration status
            let registrationStatus = 'not_registered';
            if (formData.hasFoodBusinessRegistration === true) {
                registrationStatus = 'registered';
            } else if (formData.hasFoodBusinessRegistration === 'pending') {
                registrationStatus = 'pending_registration';
            }

            // Prepare application data
            const applicationData = {
                user_id: user.id,
                full_name: user.user_metadata?.full_name || user.email.split('@')[0],
                email: user.email,
                phone_number: formData.phoneNumber,
                has_food_business_registration: formData.hasFoodBusinessRegistration === true,
                food_business_registration_document_url: formData.foodBusinessRegistrationDocumentUrl,
                registration_status: registrationStatus,
                has_hygiene_certificate: !!formData.hygieneCertificateUrl,
                hygiene_certificate_url: formData.hygieneCertificateUrl,
                shop_name: formData.shopName,
                food_type: formData.foodType,
                unique_selling_point: formData.uniqueSellingPoint,
                existing_selling_link: formData.existingSellingLink,
                status: 'pending',
                terms_accepted: true,
                terms_accepted_at: new Date().toISOString()
            };

            console.log('Submitting application...', { user_id: user.id, shop_name: formData.shopName });

            // Insert application
            const { data: insertedApplication, error: applicationError } = await supabase
                .from('seller_applications')
                .insert(applicationData)
                .select()
                .single();

            if (applicationError) {
                console.error('Application insertion error:', applicationError);
                throw applicationError;
            }

            console.log('Application submitted successfully!', { id: insertedApplication.id });

            // Create a corresponding shop entry
            const shopData = {
                name: formData.shopName,
                description: formData.uniqueSellingPoint || `${formData.foodType} food by ${insertedApplication.full_name}`,
                primary_owner_user_id: user.id,
                status: 'pending', // Shop starts as pending until application is approved
                requested_by_user_id: user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { data: shopInsertData, error: shopError } = await supabase
                .from('shops')
                .insert(shopData)
                .select()
                .single();

            if (shopError) {
                console.error('Shop creation error:', shopError);
                // Don't throw error here - application was successful even if shop creation failed
                console.warn('Application submitted but shop creation failed. This can be created later.');
            } else {
                console.log('Shop created successfully!', { shop_id: shopInsertData.id, name: shopInsertData.name });
            }

            // Redirect to pending page first (application was successful)
            navigate('/application/pending');

            // Call edge function to send email notification (optional - won't block if function doesn't exist)
            // Do this after redirect to prevent Chrome extension interference from affecting user experience
            try {
                await supabase.functions.invoke('send-application-email', {
                    body: {
                        applicationId: insertedApplication.id,
                        applicantName: applicationData.full_name,
                        applicantEmail: applicationData.email,
                        shopName: formData.shopName,
                        foodType: formData.foodType
                    }
                });
            } catch (emailError) {
                // Email notification failed - this is fine, application was still submitted successfully
                console.info('Application submitted successfully. Email notification not sent (optional feature):', emailError.message);
            }
        } catch (error) {
            console.error('Application submission error:', error);

            // Check if it's a database error (table doesn't exist)
            if (error.message?.includes('seller_applications') || error.code === '42P01') {
                alert('⚠️ The application system is not fully set up yet. Please contact support at hello@eatwithkinn.com. \n\nTechnical note: Database migration needs to be run.');
            } else if (error.message?.includes('duplicate key') || error.code === '23505') {
                alert('� You already have an application submitted! Redirecting to your application status...');
                navigate('/application/pending');
                return;
            } else {
                alert('�😔 Oops! Something went wrong while submitting your application. Please try again, or contact us at hello@eatwithkinn.com if the problem persists.\n\nError: ' + (error.message || 'Unknown error'));
            }
        } finally {
            setLoading(false);
        }
    };

    // Step 1: Terms & Conditions
    const renderStep1 = () => (
        <ApplicationStep
            step={1}
            totalSteps={6}
            title="Welcome to Kinn Seller Application"
            description="Before we begin, please read and accept our seller terms and conditions."
            showBack={false}
        >
            <TermsAcceptance
                onAccept={handleTermsAccept}
                onDecline={handleTermsDecline}
            />
        </ApplicationStep>
    );

    // Step 2: Phone Number
    const renderStep2 = () => (
        <ApplicationStep
            step={2}
            totalSteps={6}
            title="Contact Information"
            description="We'll need your phone number to stay in touch about your application."
            onNext={handleNext}
            onBack={handleBack}
        >
            <div>
                <label className="text-body-md font-medium text-Mblack mb-2 block">
                    Phone Number *
                </label>
                <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                    placeholder="+44 7XXX XXXXXX"
                    autoComplete="tel"
                    className="w-full px-4 h-[54px] rounded-[20px] text-Mblack bg-[#FAFAFA] border border-solid !border-[#F5F5F5] outline-none focus:!border-[#FEC51C] placeholder:text-[#A3A3A3] text-body-md"
                />
                <p className="text-body-sm text-gray-500 mt-2">
                    We'll use this to contact you about your application and important updates.
                </p>
            </div>
        </ApplicationStep>
    );

    // Step 3: Food Business Registration
    const renderStep3 = () => (
        <ApplicationStep
            step={3}
            totalSteps={6}
            title="Food Business Registration"
            description="In the UK, all food businesses must be registered with their local council at least 28 days before selling."
            onNext={handleNext}
            onBack={handleBack}
        >
            <div className="space-y-4">
                <p className="text-body-md text-Mblack mb-4">
                    Have you registered your food business with your local council?
                </p>

                <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 rounded-[12px] cursor-pointer hover:border-[#FEC51C] transition-colors">
                        <input
                            type="radio"
                            name="foodBusinessRegistration"
                            checked={formData.hasFoodBusinessRegistration === true}
                            onChange={() => updateFormData('hasFoodBusinessRegistration', true)}
                            className="w-5 h-5 text-[#FEC51C] border-gray-300"
                        />
                        <span className="ml-3 text-body-md text-Mblack">
                            Yes, I'm fully registered
                        </span>
                    </label>

                    <label className="flex items-center p-4 border-2 rounded-[12px] cursor-pointer hover:border-[#FEC51C] transition-colors">
                        <input
                            type="radio"
                            name="foodBusinessRegistration"
                            checked={formData.hasFoodBusinessRegistration === 'pending'}
                            onChange={() => updateFormData('hasFoodBusinessRegistration', 'pending')}
                            className="w-5 h-5 text-[#FEC51C] border-gray-300"
                        />
                        <span className="ml-3 text-body-md text-Mblack">
                            I've applied but waiting for approval
                        </span>
                    </label>

                    <label className="flex items-center p-4 border-2 rounded-[12px] cursor-pointer hover:border-[#FEC51C] transition-colors">
                        <input
                            type="radio"
                            name="foodBusinessRegistration"
                            checked={formData.hasFoodBusinessRegistration === false}
                            onChange={() => updateFormData('hasFoodBusinessRegistration', false)}
                            className="w-5 h-5 text-[#FEC51C] border-gray-300"
                        />
                        <span className="ml-3 text-body-md text-Mblack">
                            Not yet, but I will register
                        </span>
                    </label>
                </div>

                {formData.hasFoodBusinessRegistration === false && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-[12px]">
                        <p className="text-body-sm text-yellow-800">
                            <strong>Important:</strong> We would love to have you, but you must register your food business with your local council before you can start trading. You can still complete this application, and once you provide proof of registration (or confirmation that you've applied), you'll be able to proceed with setting up your shop.
                        </p>
                    </div>
                )}

                {formData.hasFoodBusinessRegistration === 'pending' && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-[12px]">
                        <p className="text-body-sm text-blue-800">
                            <strong>Great!</strong> You can complete this application now. Once you receive your full registration (usually within 28 days), you'll be able to start trading on Kinn.
                        </p>
                    </div>
                )}
            </div>
        </ApplicationStep>
    );

    // Step 4: Upload Registration Document
    const renderStep4 = () => (
        <ApplicationStep
            step={4}
            totalSteps={6}
            title={formData.hasFoodBusinessRegistration === true ? "Upload Your Registration" : "Upload Proof of Registration Application"}
            description={
                formData.hasFoodBusinessRegistration === true
                    ? "Please upload your food business registration certificate from your local council."
                    : formData.hasFoodBusinessRegistration === 'pending'
                        ? "Please upload proof that you've applied for registration (e.g., application confirmation email)."
                        : "Please upload any documentation showing you're in the process of registering."
            }
            onNext={handleNext}
            onBack={handleBack}
        >
            <FileUpload
                label="Registration Document"
                description="Upload your food business registration certificate or proof of application"
                userId={user?.id}
                existingFileUrl={formData.foodBusinessRegistrationDocumentUrl}
                onUploadComplete={(url) => updateFormData('foodBusinessRegistrationDocumentUrl', url)}
            />
        </ApplicationStep>
    );

    // Step 5: Hygiene Certificate (Optional)
    const renderStep5 = () => (
        <ApplicationStep
            step={5}
            totalSteps={6}
            title="Food Hygiene Certificate (Optional)"
            description="Having a Food Hygiene Rating builds trust with buyers and shows your commitment to food safety."
            onNext={handleNext}
            onBack={handleBack}
            nextLabel="Continue"
            showSkipButton={true}
            onSkip={handleNext}
        >
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-[12px]">
                <h4 className="text-body-md font-semibold text-green-900 mb-2">Why upload your hygiene certificate?</h4>
                <ul className="space-y-1 text-body-sm text-green-800">
                    <li className="flex items-start">
                        <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Builds buyer confidence and trust
                    </li>
                    <li className="flex items-start">
                        <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Shows your commitment to food safety
                    </li>
                    <li className="flex items-start">
                        <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Can increase your visibility on our platform
                    </li>
                </ul>
            </div>

            <FileUpload
                label="Food Hygiene Certificate (Optional)"
                description="Upload your Food Hygiene Rating certificate or Level 2 Food Safety certificate"
                userId={user?.id}
                existingFileUrl={formData.hygieneCertificateUrl}
                onUploadComplete={(url) => updateFormData('hygieneCertificateUrl', url)}
            />
        </ApplicationStep>
    );

    // Step 6: Business Details
    const renderStep6 = () => (
        <ApplicationStep
            step={6}
            totalSteps={6}
            title="Tell Us About Your Food! 🍽️"
            description="This is the fun part! Help us understand what makes your food special."
            onNext={handleSubmitApplication}
            onBack={handleBack}
            nextLabel={loading ? "Submitting..." : "Submit Application"}
            loading={loading}
        >
            <div className="space-y-6">
                <div>
                    <label className="text-body-md font-medium text-Mblack mb-2 block">
                        What's your shop name? *
                    </label>
                    <input
                        type="text"
                        value={formData.shopName}
                        onChange={(e) => updateFormData('shopName', e.target.value)}
                        placeholder="e.g., Mama's Kitchen, Spice & Soul, The Vegan Corner"
                        autoComplete="organization"
                        className="w-full px-4 h-[54px] rounded-[20px] text-Mblack bg-[#FAFAFA] border border-solid !border-[#F5F5F5] outline-none focus:!border-[#FEC51C] placeholder:text-[#A3A3A3] text-body-md"
                    />
                    <p className="text-body-sm text-gray-500 mt-2">Your shop URL will be: <strong>eatwithkinn.com/{shopSlug}</strong></p>
                </div>

                <div>
                    <label className="text-body-md font-medium text-Mblack mb-2 block">
                        What type of food do you want to sell? *
                    </label>
                    <input
                        type="text"
                        value={formData.foodType}
                        onChange={(e) => updateFormData('foodType', e.target.value)}
                        placeholder="e.g., Italian, Vegan, Indian, Home-style British, Caribbean"
                        className="w-full px-4 h-[54px] rounded-[20px] text-Mblack bg-[#FAFAFA] border border-solid !border-[#F5F5F5] outline-none focus:!border-[#FEC51C] placeholder:text-[#A3A3A3] text-body-md"
                    />
                </div>

                <div>
                    <label className="text-body-md font-medium text-Mblack mb-2 block">
                        Have you been selling anywhere? If yes, paste the link here (your website, Facebook, WhatsApp, Instagram, Nextdoor)
                    </label>
                    <input
                        type="url"
                        value={formData.existingSellingLink}
                        onChange={(e) => updateFormData('existingSellingLink', e.target.value)}
                        placeholder="https://yourshop.example or https://instagram.com/yourshop"
                        className="w-full px-4 h-[54px] rounded-[20px] text-Mblack bg-[#FAFAFA] border border-solid !border-[#F5F5F5] outline-none focus:!border-[#FEC51C] placeholder:text-[#A3A3A3] text-body-md"
                    />
                    <p className="text-body-sm text-gray-500 mt-2">If you haven't sold anywhere yet, you can leave this blank.</p>
                </div>

                <div>
                    <label className="text-body-md font-medium text-Mblack mb-2 block">
                        What makes your food special? *
                    </label>
                    <textarea
                        value={formData.uniqueSellingPoint}
                        onChange={(e) => updateFormData('uniqueSellingPoint', e.target.value)}
                        placeholder="e.g., Family recipes passed down for generations, organic locally-sourced ingredients, authentic flavors from my hometown, fusion of traditional and modern techniques..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-[20px] text-Mblack bg-[#FAFAFA] border border-solid !border-[#F5F5F5] outline-none focus:!border-[#FEC51C] placeholder:text-[#A3A3A3] text-body-md resize-none"
                    />
                    <p className="text-body-sm text-gray-500 mt-2">This helps customers understand why they should choose your food. Share what makes you unique!</p>
                </div>

                <div className="p-4 bg-[#FFF7E6] border border-[#FEC51C] rounded-[12px]">
                    <p className="text-body-md text-Mblack">
                        <strong>Almost there!</strong> Once you submit, we'll review your application within 7 business days and get back to you via email.
                    </p>
                </div>
            </div>
        </ApplicationStep>
    );

    return (
        <Fragment>
            <section className='pb-8 pt-[120px] bg-[#F8F8F8] min-h-screen'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={8}>
                            <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm max-h-[calc(100vh-200px)] overflow-y-auto">
                                {currentStep === 1 && renderStep1()}
                                {currentStep === 2 && renderStep2()}
                                {currentStep === 3 && renderStep3()}
                                {currentStep === 4 && renderStep4()}
                                {currentStep === 5 && renderStep5()}
                                {currentStep === 6 && renderStep6()}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
};

export default ShopApplicationWelcome;