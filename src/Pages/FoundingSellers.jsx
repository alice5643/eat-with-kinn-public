import React, { Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FoundersForm from '../Components/FoundersForm'

const FoundingSellers = () => {
    return (
        <Fragment>
            {/* Hero Section */}
            <section className='relative overflow-hidden min-h-screen pt-[88px] lg:pt-[98px] -mt-[88px] lg:-mt-[98px] bg-Koffwhite flex flex-wrap pb-0'>
                <Container className='relative z-[2] w-full pt-[80px] relative'>
                    <div className="w-full max-w-[1300px] mx-auto px-4 mb-16">
                        <img src="/images/seller-banner.png" className='w-full object-cover relative z-[2]' alt="Founding sellers banner" />
                    </div>
                    <Row className='justify-center relative z-2'>
                        <Col md={10} lg={8} className='text-center'>
                            <div className="mb-10">
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                                    <button 
                                        className="btn-primary" 
                                        onClick={() => document.getElementById('founders-form')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        Join the waitlist
                                    </button>
                                    <button 
                                        className="btn-secondary"
                                        onClick={() => document.getElementById('challenge')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                
            </section>

            {/* The Challenge Section */}
            <section className='bg-white py-[80px]' id="challenge">
                <Container>
                    <Row className='items-center gap-y-8'>
                        <Col lg={6} className='order-2 lg:order-1'>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-h2-normal">🔎</span>
                                <h2 className='text-h2-normal text-Mblack mb-0'>The Challenge</h2>
                            </div>
                            <div className="space-y-4">
                                <p className='text-body-lg-regular text-Mblack'>Small food businesses often rely only on Instagram or word of mouth.</p>
                                <p className='text-body-lg-regular text-Mblack'>Existing platforms don't showcase independent sellers well.</p>
                                <p className='text-body-lg-regular text-Mblack'>Compliance (licenses, allergens, hygiene rules) can be confusing.</p>
                                <p className='text-body-lg-regular text-Mblack'>Buyers want trusted, community-based food options, but don't always know where to look.</p>
                            </div>
                        </Col>
                        <Col lg={6} className='order-1 lg:order-2'>
                            <div className="rounded-[20px] overflow-hidden w-1/2 mx-auto">
                                <img src="/images/man-failed-to-cook.jpg" className='w-full h-auto' alt="Challenges facing small food businesses" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Our Solution Section */}
            <section className='bg-Kpink80 py-[80px]'>
                <Container>
                    <Row className='items-center gap-y-8'>
                        <Col lg={6}>
                            <div className="rounded-[20px] overflow-hidden w-1/2 mx-auto">
                                <img src="/images/11-hands.jpg" className='w-full h-auto' alt="Community hands together" />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-h2-normal">💡</span>
                                <h2 className='text-h2-normal text-Mblack mb-0'>Our Solution</h2>
                            </div>
                            <p className='text-body-lg-regular text-Mblack mb-6'>
                                Kinn is a community food marketplace that makes it easy for you to sell safely and grow your business:
                            </p>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className='text-body-xl text-Mblack mb-2'>Your Shopfront</h3>
                                    <p className='text-body-lg-regular text-Mgray'>A personalised page on eatwithkinn.com with menus, images, and allergen info.</p>
                                </div>
                                
                                <div>
                                    <h3 className='text-body-xl text-Mblack mb-2'>Marketplace Discovery</h3>
                                    <p className='text-body-lg-regular text-Mgray'>Be part of a professional marketplace where buyers can browse and find you.</p>
                                </div>
                                
                                <div>
                                    <h3 className='text-body-xl text-Mblack mb-2'>Trust & Safety</h3>
                                    <p className='text-body-lg-regular text-Mgray'>Upload licenses, display allergens, and build credibility.</p>
                                </div>
                                
                                <div>
                                    <h3 className='text-body-xl text-Mblack mb-2'>Orders & Payments</h3>
                                    <p className='text-body-lg-regular text-Mgray'>Simple checkout with Stripe, Apple Pay, and Google Pay.</p>
                                </div>
                                
                                <div>
                                    <h3 className='text-body-xl text-Mblack mb-2'>Community Connection</h3>
                                    <p className='text-body-lg-regular text-Mgray'>Chat with buyers, receive reviews, and gain repeat customers.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Why Join as Founding Seller Section */}
            <section className='bg-Kmint py-[80px]'>
                <Container>
                    <Row className='items-center gap-y-8'>
                        <Col lg={6} className='order-2 lg:order-1'>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-h2-normal">🌱</span>
                                <h2 className='text-h2-normal text-Mblack mb-0'>Why Join as a Founding Seller?</h2>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-body-xl text-green-600 mt-1">✅</span>
                                    <p className='text-body-lg-regular text-Mblack'>No fees during early launch – risk-free.</p>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <span className="text-body-xl text-green-600 mt-1">✅</span>
                                    <p className='text-body-lg-regular text-Mblack'>Priority promotion in the marketplace & on socials.</p>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <span className="text-body-xl text-green-600 mt-1">✅</span>
                                    <p className='text-body-lg-regular text-Mblack'>Founding Seller badge for extra credibility.</p>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <span className="text-body-xl text-green-600 mt-1">✅</span>
                                    <p className='text-body-lg-regular text-Mblack'>Help shape Kinn – your feedback guides our design.</p>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <span className="text-body-xl text-green-600 mt-1">✅</span>
                                    <p className='text-body-lg-regular text-Mblack'>Backed by partnerships with councils & community organisations.</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} className='order-1 lg:order-2'>
                            <div className="rounded-[20px] overflow-hidden w-1/2 mx-auto">
                                <img src="/images/a-woman-cooking-fun.jpg" className='w-full h-auto' alt="Woman cooking with joy" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Who We Work With Section */}
            <section className='bg-Kpink40 py-[80px]'>
                <Container>
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="text-h2-normal">🤝</span>
                            <h2 className='text-h2-normal text-Mblack mb-0'>Who We Work With</h2>
                        </div>
                    </div>
                    
                    <Row className='gap-y-6'>
                        <Col md={4} className='text-center'>
                            <div className="bg-white rounded-[20px] p-6 h-full">
                                <h3 className='text-body-xl text-Mblack mb-4'>Food Entrepreneurs</h3>
                                <p className='text-body-lg-regular text-Mgray'>Independent food sellers, caterers, and small food brands.</p>
                            </div>
                        </Col>
                        <Col md={4} className='text-center'>
                            <div className="bg-white rounded-[20px] p-6 h-full">
                                <h3 className='text-body-xl text-Mblack mb-4'>Local Authorities</h3>
                                <p className='text-body-lg-regular text-Mgray'>Local councils & food safety advisers.</p>
                            </div>
                        </Col>
                        <Col md={4} className='text-center'>
                            <div className="bg-white rounded-[20px] p-6 h-full">
                                <h3 className='text-body-xl text-Mblack mb-4'>Community Groups</h3>
                                <p className='text-body-lg-regular text-Mgray'>Supporting women, migrants, and entrepreneurs.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Get Involved Section */}
            <section className='bg-Koffwhite py-[80px]' id="founders-form">
                <Container>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="text-h2-normal">📞</span>
                            <h2 className='text-h2-normal text-Mblack mb-0'>Get Involved</h2>
                        </div>
                        <h3 className='text-h3 text-Mblack mb-8'>Be one of our Founding Sellers</h3>
                        
                        <div className="max-w-2xl mx-auto">
                            <p className='text-body-lg-regular text-Mblack mb-6'>
                                Ready to join our community of passionate food entrepreneurs? Fill out the form below and we'll be in touch within 24 hours.
                            </p>
                            
                            {/* Security Notice */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                                <h4 className='text-body-lg font-semibold text-blue-800 mb-2'>🔒 Secure Application Process</h4>
                                <ul className="text-body-md-regular text-blue-700 space-y-1">
                                    <li>• All submissions are verified manually by our team</li>
                                    <li>• Your information is protected and never shared</li>
                                    <li>• We'll contact you from official @eatwithkinn.com emails only</li>
                                </ul>
                            </div>
                            
                            {/* Tally Form */}
                            <div className="bg-white rounded-[20px] shadow-lg p-4">
                                <div className="w-full h-[800px] overflow-hidden">
                                    <FoundersForm />
                                </div>
                            </div>
                            
                            {/* Anti-Scam Notice */}
                            <div className="mt-6 text-center">
                                <p className="text-body-sm-regular text-gray-600">
                                    ⚠️ <strong>Important:</strong> Kinn will never ask for payment, bank details, or personal financial information during the application process. 
                                    All legitimate communications come from @eatwithkinn.com email addresses.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </Fragment>
    )
}

export default FoundingSellers
