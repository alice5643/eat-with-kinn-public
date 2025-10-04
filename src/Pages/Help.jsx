import React, { Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Help = () => {
    const faqs = [
        {
            category: "Orders",
            questions: [
                {
                    q: "How do I track my order?",
                    a: "You can track your order in real-time from the Orders page. You'll receive notifications at each stage of delivery."
                },
                {
                    q: "Can I cancel my order?",
                    a: "You can cancel your order within 5 minutes of placing it. After that, please contact the seller directly."
                },
                {
                    q: "What if my order is late?",
                    a: "If your order is significantly delayed, please contact our support team and we'll help resolve the issue."
                }
            ]
        },
        {
            category: "Payments",
            questions: [
                {
                    q: "What payment methods do you accept?",
                    a: "We accept credit/debit cards, Apple Pay, Google Pay, and bank transfers via Stripe."
                },
                {
                    q: "Is my payment information secure?",
                    a: "Yes, all payments are processed securely through Stripe. We never store your card details."
                },
                {
                    q: "Can I get a refund?",
                    a: "Refunds are handled on a case-by-case basis. Please contact our support team with your order details."
                }
            ]
        },
        {
            category: "Account",
            questions: [
                {
                    q: "How do I update my account information?",
                    a: "Go to your Profile page and click 'Edit Profile' to update your details."
                },
                {
                    q: "How do I reset my password?",
                    a: "Click 'Forgot Password' on the login page and follow the instructions sent to your email."
                },
                {
                    q: "Can I delete my account?",
                    a: "Yes, please contact our support team to request account deletion."
                }
            ]
        }
    ];

    return (
        <Fragment>
            <section className='pb-0 pt-[120px] bg-[#F8F8F8] min-h-screen'>
                <Container>
                    <Row className='justify-center'>
                        <Col md={10} lg={8}>
                            <div className="mb-6">
                                <h2 className='text-h3 text-Mblack mb-2'>Help & Support</h2>
                                <p className='text-body-lg text-gray-600'>Find answers to common questions</p>
                            </div>

                            {/* Contact Support Card */}
                            <div className="bg-Kmint rounded-[20px] p-6 mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-[48px] h-[48px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className='text-h6 text-Mblack mb-2'>Need More Help?</h4>
                                        <p className='text-body-md text-Mblack mb-3'>Can't find what you're looking for? Our support team is here to help.</p>
                                        <a href="mailto:hello@eatwithkinn.com" className="btn-primary inline-block">
                                            Contact Support
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Sections */}
                            {faqs.map((section, index) => (
                                <div key={index} className="bg-white rounded-[20px] p-6 mb-4">
                                    <h4 className='text-h6 text-Mblack mb-4'>{section.category}</h4>
                                    <div className="space-y-4">
                                        {section.questions.map((item, idx) => (
                                            <div key={idx} className={idx !== section.questions.length - 1 ? "pb-4 border-b border-gray-200" : ""}>
                                                <h5 className='text-body-lg font-semibold text-Mblack mb-2'>{item.q}</h5>
                                                <p className='text-body-md text-gray-600'>{item.a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Additional Resources */}
                            <div className="bg-white rounded-[20px] p-6">
                                <h4 className='text-h6 text-Mblack mb-4'>Additional Resources</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <a href="/privacy" className="flex items-center gap-3 p-4 rounded-[12px] border border-gray-200 hover:bg-gray-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                        </svg>
                                        <div>
                                            <p className='text-body-md font-semibold text-Mblack'>Privacy Policy</p>
                                            <p className='text-body-sm text-gray-500'>Learn about data protection</p>
                                        </div>
                                    </a>
                                    <a href="/terms" className="flex items-center gap-3 p-4 rounded-[12px] border border-gray-200 hover:bg-gray-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>
                                        <div>
                                            <p className='text-body-md font-semibold text-Mblack'>Terms of Service</p>
                                            <p className='text-body-sm text-gray-500'>Read our terms & conditions</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    )
}

export default Help