import React from 'react'
import { Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Terms = () => {
    return (
        <Fragment>
            <section className='pb-0 pt-[120px]'>
                <Container>
                    <div className="text-center">
                        <h1 className='text-h2-normal text-Mblack mb-2'>Terms & Conditions</h1>
                    </div>
                </Container>
            </section>

            <section className='py-[80px]'>
                <Container>
                    <Row className='justify-center'>
                        <Col md={10} lg={8}>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>1. About Kinn</h2>
                                <p className='text-body-md-regular text-Mblack'>Kinn, operated by Quenra Ltd (Company Registration Number: 16584181), is an online marketplace (the "Platform") that connects individuals who sell homemade food ("Sellers") with individuals who wish to purchase such food ("Buyers"). By accessing or using the Platform, you agree to be bound by these Terms and Conditions. </p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>2. Acceptance of Terms</h2>
                                <p className='text-body-md-regular text-Mblack'>By accessing or using Kinn, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you disagree with any part of these terms, you may not use our service. These terms are governed by English law and are subject to UK jurisdiction.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>3. User Accounts</h2>
                                <p className='text-body-md-regular text-Mblack mb-3'>You must provide accurate, complete, and current information when creating an account. You are responsible for maintaining account security and all activities under your account.</p>
                                <p className='text-body-md-regular text-Mblack'><strong>For Sellers:</strong> Additional verification may be required including food hygiene certificates, kitchen registration, and identity verification.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>4. Food Safety & Seller Responsibilities</h2>
                                <p className='text-body-md-regular text-Mblack mb-3'>Sellers must:</p>
                                <ul className="list-disc pl-6 space-y-1 mb-3">
                                    <li className='text-body-md-regular text-Mblack'>Comply with UK food safety regulations and Food Standards Agency guidelines</li>
                                    <li className='text-body-md-regular text-Mblack'>Maintain valid food hygiene certificates (Level 2 minimum recommended)</li>
                                    <li className='text-body-md-regular text-Mblack'>Register their food business with local authorities where required</li>
                                    <li className='text-body-md-regular text-Mblack'>Provide accurate allergen information for all products</li>
                                    <li className='text-body-md-regular text-Mblack'>Maintain proper food storage, preparation, and hygiene standards</li>
                                    <li className='text-body-md-regular text-Mblack'>Ensure food is prepared in suitable kitchen facilities</li>
                                    <li className='text-body-md-regular text-Mblack'>Label food with preparation and use-by dates</li>
                                </ul>
                                <p className='text-body-md-regular text-Mblack'>Failure to comply may result in account suspension or termination.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>5. Prohibited Activities</h2>
                                <p className='text-body-md-regular text-Mblack mb-3'>You may not:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li className='text-body-md-regular text-Mblack'>Sell food that is unsafe, expired, or improperly stored</li>
                                    <li className='text-body-md-regular text-Mblack'>Misrepresent ingredients, allergens, or preparation methods</li>
                                    <li className='text-body-md-regular text-Mblack'>Operate without required licenses or certifications</li>
                                    <li className='text-body-md-regular text-Mblack'>Engage in fraudulent activities or spam</li>
                                    <li className='text-body-md-regular text-Mblack'>Violate any applicable laws or regulations</li>
                                    <li className='text-body-md-regular text-Mblack'>Interfere with other users' use of the platform</li>
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>6. Orders & Payments</h2>
                                <p className='text-body-md-regular text-Mblack mb-3'>Orders are contracts between buyers and sellers. Kinn facilitates the transaction but is not a party to the sale. Payment processing is handled by third-party providers (Stripe, PayPal).</p>
                                <p className='text-body-md-regular text-Mblack'>Sellers are responsible for order fulfillment, quality, and food safety. Buyers have rights under UK consumer protection laws.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>7. Consumer Rights (UK)</h2>
                                <p className='text-body-md-regular text-Mblack mb-3'>Under UK consumer law, you have the right to:</p>
                                <ul className="list-disc pl-6 space-y-1 mb-3">
                                    <li className='text-body-md-regular text-Mblack'>Receive food that matches its description</li>
                                    <li className='text-body-md-regular text-Mblack'>Receive food of satisfactory quality and fit for purpose</li>
                                    <li className='text-body-md-regular text-Mblack'>Refunds for unsatisfactory purchases (subject to food safety considerations)</li>
                                    <li className='text-body-md-regular text-Mblack'>Protection against unfair contract terms</li>
                                </ul>
                                <p className='text-body-md-regular text-Mblack'>These rights are not affected by these Terms & Conditions.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>8. Liability & Disclaimers</h2>
                                <p className='text-body-md-regular text-Mblack mb-3'>Kinn acts as an intermediary platform. We do not prepare, store, or handle food products. Sellers are responsible for food safety, quality, and compliance with regulations.</p>
                                <p className='text-body-md-regular text-Mblack'>We exclude liability for food-related illness or injury except where prohibited by law. Our maximum liability is limited to the transaction value or £100, whichever is lower.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>9. Intellectual Property</h2>
                                <p className='text-body-md-regular text-Mblack'>The Kinn platform, logo, and original content are owned by Quenra Ltd. Users retain rights to their own content but grant us license to use it on the platform.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>10. Termination</h2>
                                <p className='text-body-md-regular text-Mblack'>We may suspend or terminate accounts for breach of these terms, food safety violations, or illegal activities. Users may close their accounts at any time.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>11. Dispute Resolution</h2>
                                <p className='text-body-md-regular text-Mblack mb-3'>We encourage users to resolve disputes directly. For unresolved issues, UK consumers may use Alternative Dispute Resolution services or small claims court.</p>
                                <p className='text-body-md-regular text-Mblack'>These terms are governed by English law, with English courts having jurisdiction.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>12. Changes to Terms</h2>
                                <p className='text-body-md-regular text-Mblack'>We may update these terms with 30 days' notice for material changes. Continued use constitutes acceptance of new terms.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>13. Contact Information</h2>
                                <p className='text-body-md-regular text-Mblack mb-3'><strong>Company:</strong> Quenra Ltd</p>
                                <p className='text-body-md-regular text-Mblack mb-3'><strong>Email:</strong> <a href="mailto:hello@eatwithkinn.com" className="text-Knavy hover:text-Mblack">hello@eatwithkinn.com</a></p>
                                <p className='text-body-md-regular text-Mblack'>For complaints or legal matters, please use the contact information above. UK consumers may also contact Citizens Advice or Trading Standards for additional support.</p>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    )
}

export default Terms