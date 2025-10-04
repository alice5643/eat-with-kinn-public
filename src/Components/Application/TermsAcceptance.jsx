import React, { useState, useRef, useEffect } from 'react';

const TermsAcceptance = ({ onAccept, onDecline }) => {
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const scrollContainerRef = useRef(null);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Check if scrolled to bottom (with 10px threshold)
        const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
        if (isAtBottom && !hasScrolledToBottom) {
            setHasScrolledToBottom(true);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Check if content is scrollable
        if (container.scrollHeight <= container.clientHeight) {
            setHasScrolledToBottom(true);
        }
    }, []);

    const handleAccept = () => {
        if (isChecked) {
            onAccept();
        }
    };

    return (
        <div className="w-full">
            {/* Scrollable terms container */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="h-[400px] overflow-y-auto border-2 border-gray-300 rounded-[12px] p-6 bg-white mb-4 scroll-smooth"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#FEC51C #f1f1f1'
                }}
            >
                <h3 className="text-h5 text-Mblack mb-4">Seller Terms & Conditions</h3>

                <div className="space-y-4 text-body-md text-Mblack">
                    <div>
                        <h4 className="font-semibold mb-2">1. Food Safety Requirements</h4>
                        <p className="mb-2">As a seller on Kinn, you must:</p>
                        <ul className="list-disc pl-6 space-y-1 text-body-sm">
                            <li>Register as a food business with your local council at least 28 days before selling</li>
                            <li>Comply with UK food safety regulations and Food Standards Agency guidelines</li>
                            <li>Maintain valid food hygiene certificates (Level 2 minimum recommended)</li>
                            <li>Follow HACCP (Hazard Analysis Critical Control Points) practices</li>
                            <li>Provide accurate allergen information for all products</li>
                            <li>Maintain proper food storage, preparation, and hygiene standards</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">2. Licensing & Registration</h4>
                        <p>You must provide proof of food business registration with your local council. If you have not yet registered but have initiated the registration process, you may submit proof of registration initiation. However, you will not be permitted to trade until your full registration is complete.</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">3. Subscription & Commission</h4>
                        <p>Kinn operates on a subscription model. You will need to choose a subscription plan that determines your commission rate. Platform commission (10%) and subscription-based commission will apply to all sales.</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">4. Quality Standards</h4>
                        <p className="mb-2">You agree to:</p>
                        <ul className="list-disc pl-6 space-y-1 text-body-sm">
                            <li>Use fresh, quality ingredients in your food preparation</li>
                            <li>Accurately represent your food in descriptions and images</li>
                            <li>Fulfill orders in a timely manner</li>
                            <li>Package food safely and appropriately</li>
                            <li>Respond professionally to customer inquiries and feedback</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">5. Liability</h4>
                        <p>You acknowledge that you are responsible for the safety and quality of all food you prepare and sell. Kinn acts as a marketplace platform and is not responsible for food-related issues. You agree to maintain appropriate insurance coverage.</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">6. Application Review</h4>
                        <p>Your application will be reviewed by our team within 7 business days. We reserve the right to approve or decline applications at our discretion. Approval is subject to verification of all submitted documents and information.</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">7. Account Suspension</h4>
                        <p>We may suspend or terminate your seller account if you breach these terms, receive multiple customer complaints, or fail to maintain required licenses and certifications.</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">8. General Terms</h4>
                        <p>By checking the box below, you confirm that:</p>
                        <ul className="list-disc pl-6 space-y-1 text-body-sm">
                            <li>All information provided in your application is accurate and complete</li>
                            <li>You have read and understand these Seller Terms & Conditions</li>
                            <li>You agree to comply with all UK food safety regulations</li>
                            <li>You accept Kinn's standard Terms & Conditions for all users</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            {!hasScrolledToBottom && (
                <div className="flex items-center justify-center mb-4 text-body-sm text-[#FEC51C] animate-pulse">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L10 5.414 3.707 11.707a1 1 0 01-1.414-1.414l7-7A1 1 0 0110 3zm0 7a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L10 12.414l-6.293 6.293a1 1 0 01-1.414-1.414l7-7A1 1 0 0110 10z" clipRule="evenodd" />
                    </svg>
                    Please scroll to the bottom to continue
                </div>
            )}

            {/* Acceptance checkbox */}
            <div className={`mb-6 transition-opacity ${hasScrolledToBottom ? 'opacity-100' : 'opacity-50'}`}>
                <label className="flex items-start cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        disabled={!hasScrolledToBottom}
                        className="mt-1 w-5 h-5 text-[#FEC51C] border-gray-300 rounded focus:ring-[#FEC51C]"
                    />
                    <span className={`ml-3 text-body-md ${hasScrolledToBottom ? 'text-Mblack' : 'text-gray-400'}`}>
                        I have read and agree to the Seller Terms & Conditions
                    </span>
                </label>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
                <button
                    onClick={onDecline}
                    className="btn-secondary flex-1"
                >
                    Decline
                </button>
                <button
                    onClick={handleAccept}
                    disabled={!isChecked || !hasScrolledToBottom}
                    className="btn-primary flex-1"
                >
                    Accept & Continue
                </button>
            </div>
        </div>
    );
};

export default TermsAcceptance;