import React from 'react'
import { Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Privacy = () => {
    return (
        <Fragment>

            <section className='pb-0 pt-[120px]'>
                <Container>
                    <div className="text-center">
                        <h1 className='text-h2-normal text-Mblack mb-2'>Privacy Policy</h1>
                    </div>
                </Container>
            </section>

            <section className='py-[80px]'>
                <Container>
                    <Row className='justify-center'>
                        <Col md={10} lg={8}>
                            
                            <div className="mb-6">
                                <p className='text-body-md-regular text-Mblack mb-6'>At Kinn, operated by Quenra Ltd, we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our platform connecting home cooks with food lovers across the UK.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>1. Information We Collect</h2>
                                
                                <div className="mb-3">
                                    <h3 className='text-body-md-semibold text-Mblack mb-2'>Personal Information:</h3>
                                    <p className='text-body-md-regular text-Mblack'>Name, email address, phone number, and password. For sellers, we also collect your shop name and kitchen registration details.</p>
                                </div>
                                
                                <div className="mb-3">
                                    <h3 className='text-body-md-semibold text-Mblack mb-2'>Transaction Information:</h3>
                                    <p className='text-body-md-regular text-Mblack'>Order history, payment records, reviews, and ratings.</p>
                                </div>
                                
                                <div className="mb-3">
                                    <h3 className='text-body-md-semibold text-Mblack mb-2'>Food Safety Information:</h3>
                                    <p className='text-body-md-regular text-Mblack'>For sellers, we collect and verify food hygiene certificates, allergen information for products, and details on food preparation methods.</p>
                                </div>
                                
                                <div className="mb-3">
                                    <h3 className='text-body-md-semibold text-Mblack mb-2'>Technical Information:</h3>
                                    <p className='text-body-md-regular text-Mblack'>IP address, browser type, device information, and website usage data.</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>2. How We Use Your Information</h2>
                                <p className='text-body-md-regular text-Mblack mb-3'>We process your personal data based on legitimate interests and contractual necessity to:</p>
                                
                                <ul className="list-disc pl-6 space-y-1">
                                    <li className='text-body-md-regular text-Mblack'>Facilitate food orders and local pickups or deliveries.</li>
                                    <li className='text-body-md-regular text-Mblack'>Process payments and prevent fraud.</li>
                                    <li className='text-body-md-regular text-Mblack'>Ensure food safety compliance by verifying seller credentials.</li>
                                    <li className='text-body-md-regular text-Mblack'>Communicate about orders and platform updates.</li>
                                    <li className='text-body-md-regular text-Mblack'>Improve our platform and develop new features to better serve our community.</li>
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>3. Information Sharing</h2>
                                <p className='text-body-md-regular text-Mblack mb-3'>We may share your information with:</p>
                                
                                <div className="mb-3">
                                    <h3 className='text-body-md-semibold text-Mblack mb-2'>Home Cooks (Sellers):</h3>
                                    <p className='text-body-md-regular text-Mblack'>We share your name, phone number, and pickup/delivery details with the seller you ordered from to facilitate the fulfillment of your order.</p>
                                </div>
                                
                                <div className="mb-3">
                                    <h3 className='text-body-md-semibold text-Mblack mb-2'>Buyers:</h3>
                                    <p className='text-body-md-regular text-Mblack'>We share seller ratings, food safety information, and allergen details to build a transparent and trustworthy community.</p>
                                </div>
                                
                                <div className="mb-3">
                                    <h3 className='text-body-md-semibold text-Mblack mb-2'>Payment Providers:</h3>
                                    <p className='text-body-md-regular text-Mblack'>We use trusted third-party services like Stripe or PayPal for secure payment processing.</p>
                                </div>
                                
                                <div className="mb-3">
                                    <h3 className='text-body-md-semibold text-Mblack mb-2'>Food Safety Authorities:</h3>
                                    <p className='text-body-md-regular text-Mblack'>When required by law for health and safety compliance, we will share necessary records.</p>
                                </div>
                                
                                <div className="mb-3">
                                    <h3 className='text-body-md-semibold text-Mblack mb-2'>Legal Authorities:</h3>
                                    <p className='text-body-md-regular text-Mblack'>We will share information when required by law or to protect the safety of our community.</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>4. Your Rights (UK GDPR)</h2>
                                <p className='text-body-md-regular text-Mblack mb-3'>Under UK GDPR, you have the right to:</p>
                                
                                <ul className="list-disc pl-6 space-y-1 mb-3">
                                    <li className='text-body-md-regular text-Mblack'>Access your personal data.</li>
                                    <li className='text-body-md-regular text-Mblack'>Correct inaccurate information.</li>
                                    <li className='text-body-md-regular text-Mblack'>Request the deletion of your personal data (with exceptions for food safety records).</li>
                                    <li className='text-body-md-regular text-Mblack'>Restrict the processing of your data.</li>
                                    <li className='text-body-md-regular text-Mblack'>Data portability.</li>
                                    <li className='text-body-md-regular text-Mblack'>Object to processing.</li>
                                    <li className='text-body-md-regular text-Mblack'>Withdraw consent at any time.</li>
                                </ul>
                                
                                <p className='text-body-md-regular text-Mblack'>To exercise these rights, please contact us at <a href="mailto:hello@eatwithkinn.com" className="text-Knavy hover:text-Mblack">hello@eatwithkinn.com</a>.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>5. Data Retention</h2>
                                <p className='text-body-md-regular text-Mblack mb-3'>We retain personal data for:</p>
                                
                                <ul className="list-disc pl-6 space-y-1 mb-3">
                                    <li className='text-body-md-regular text-Mblack'><strong>Transaction Records:</strong> 7 years (UK accounting requirements).</li>
                                    <li className='text-body-md-regular text-Mblack'><strong>Food Safety Records:</strong> 2 years (food traceability requirements). This information may be retained longer than other personal data to comply with UK food safety regulations.</li>
                                    <li className='text-body-md-regular text-Mblack'><strong>Account Information:</strong> Until your account is deleted (subject to legal requirements).</li>
                                    <li className='text-body-md-regular text-Mblack'><strong>Marketing Data:</strong> Until your consent is withdrawn.</li>
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>6. Food Safety & Community Trust</h2>
                                <p className='text-body-md-regular text-Mblack'>We maintain detailed records of food preparation, allergen information, and seller certifications to ensure consumer safety and enable rapid response to any food safety incidents. This commitment to safety is a core part of our brand, helping us build a community based on trust.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>7. Security</h2>
                                <p className='text-body-md-regular text-Mblack'>We use industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal information. However, no online transmission is 100% secure.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>8. Children's Privacy</h2>
                                <p className='text-body-md-regular text-Mblack'>Our platform is not intended for children under 16. We do not knowingly collect personal information from children under 16 without parental consent.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>9. Changes to This Policy</h2>
                                <p className='text-body-md-regular text-Mblack'>We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify users of significant changes via email or a notification on the platform.</p>
                            </div>

                            <div className="mb-6">
                                <h2 className='text-h6-normal text-Mblack mb-3'>10. Contact</h2>
                                <p className='text-body-md-regular text-Mblack mb-3'><strong>Data Controller:</strong> Quenra Ltd</p>
                                <p className='text-body-md-regular text-Mblack mb-3'><strong>Email:</strong> <a href="mailto:hello@eatwithkinn.com" className="text-Knavy hover:text-Mblack">hello@eatwithkinn.com</a></p>
                                <p className='text-body-md-regular text-Mblack'>If you are not satisfied with our response, you can lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.</p>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    )
}

export default Privacy
