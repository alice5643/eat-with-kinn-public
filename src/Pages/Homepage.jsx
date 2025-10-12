import React, { Fragment, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import ModalFind from '../Components/Modal/ModalFind'

const Homepage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showAddressModal, setShowAddressModal] = useState(false);

    const handleBecomeSellerClick = () => {
        if (isAuthenticated) {
            // Redirect to application page if authenticated
            navigate('/open-your-shop-welcome');
        } else {
            // Redirect to login page with redirect parameter
            navigate('/auth/login?redirect=/open-your-shop-welcome');
        }
    };

    return (
        <Fragment>
            {/* Hero Section */}
            <section className='relative overflow-hidden min-h-screen pt-[88px] lg:pt-[98px] -mt-[88px] lg:-mt-[98px] bg-Koffwhite flex flex-wrap pb-0'>
                <Container className='relative z-[2] w-full pt-[80px] relative'>
                    <Row className='justify-center relative z-2'>
                        <Col md={10} lg={8} className='text-center' >
                            <div className="mb-10">
                                <h1 className='text-h1 text-Mblack mb-6'>
                                    Food Made with Love.<br />For the Community.
                                </h1>
                                <p className='text-body-xl-regular leading-[30px] mb-8'>We connect you with passionate local cooks who are serving their community with fresh, homemade meals.</p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                                    <button className="btn-primary" onClick={handleBecomeSellerClick}>
                                        Become a seller
                                    </button>
                                    <button className="btn-secondary" onClick={() => setShowAddressModal(true)}>Find local food</button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Address Search Modal */}
                    <ModalFind show={showAddressModal} handleClose={() => setShowAddressModal(false)} />
                </Container>
                <div className="w-full max-w-[1300px] mx-auto px-4">
                    <img src="/images/vision-1.png" className='w-full object-cover relative z-[2]' alt="Food made with love" />
                </div>
            </section>

            {/* Better food section */}
            <section className='bg-Kpink80 py-[80px]' id="how-it-works">
                <Container>
                    <Row className='items-center gap-y-8'>
                        <Col lg={6} className='order-2 lg:order-1'>
                            <h2 className='text-h2-normal text-Mblack mb-6'>Better food starts from home.</h2>
                            <p className='text-body-lg-regular text-Mblack mb-8'>We believe the best meals are made by people who care. Kinn connects you to a community of talented home cooks who use simple, wholesome ingredients to create food that's tastier and healthier than typical takeaway. It's food you'd serve to your own family.</p>
                            <button onClick={() => setShowAddressModal(true)} className="btn-primary">Find Local Food</button>
                        </Col>
                        <Col lg={6} className='order-1 lg:order-2'>
                            <div className="rounded-[20px] overflow-hidden">
                                <img src="/images/buyer_section.png" className='w-full h-auto' alt="Buy local food" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Love cooking section */}
            <section className='bg-Kmint py-[80px]'>
                <Container>
                    <Row className='items-center gap-y-8'>
                        <Col lg={6}>
                            <div className="rounded-[20px] overflow-hidden">
                                <img src="/images/seller_section.png" className='w-full h-auto' alt="Start cooking business" />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <h2 className='text-h2-normal text-Mblack mb-6'>Love cooking? Start selling with Kinn.</h2>
                            <p className='text-body-lg-regular text-Mblack mb-8'>Kinn is your all-in-one platform to run a home-based food business. We give you the tools to manage your products, track orders, and handle payments, so you can focus on what you do best: cooking with passion.</p>
                            <button onClick={handleBecomeSellerClick} className="btn-primary">Get Started</button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Why Kinn Section */}
            <section className='bg-white py-[80px] relative overflow-hidden' id="our-mission">
                {/* Decorative SVG Background */}
                <div className="absolute top-10 left-10 opacity-10 w-32 h-32">
                    <img src="/images/pizza 2.svg" alt="" className="w-full h-full" />
                </div>
                <div className="absolute bottom-20 right-20 opacity-10 w-40 h-40">
                    <img src="/images/desserts 2.svg" alt="" className="w-full h-full" />
                </div>
                <div className="absolute top-1/2 right-10 opacity-10 w-36 h-36 hidden lg:block">
                    <img src="/images/chinese 2.svg" alt="" className="w-full h-full" />
                </div>

                <Container className="relative z-10">
                    <div className="text-center mb-12">
                        <h2 className='text-h2-normal text-Mblack mb-4'>Why Kinn?</h2>
                    </div>

                    <Row className='items-center gap-y-8 mb-16'>
                        <Col lg={6}>
                            <p className='text-body-lg-regular text-Mblack leading-relaxed mb-4'>
                                Across the UK, talented cooks from diverse backgrounds turn to food businesses to share their culture and skills. Yet the current food economy makes it difficult for them to grow sustainably.
                            </p>
                            <p className='text-body-lg-regular text-Mblack leading-relaxed mb-4'>
                                Platforms like UberEats charge high commissions. Compliance systems are costly and complex. Without affordable tools, many rely on Instagram or WhatsApp—lacking the verified digital presence needed to build trust.
                            </p>
                            <p className='text-body-lg-regular text-Mblack leading-relaxed font-medium'>
                                Kinn bridges this gap with a safe, inclusive platform that gives small food businesses the tools they need to thrive.
                            </p>
                        </Col>
                        <Col lg={6}>
                            <div className="max-w-md mx-auto">
                                <img src="/demo.png" alt="Kinn app demo" className="w-full h-auto rounded-[20px] shadow-2xl" />
                            </div>
                        </Col>
                    </Row>

                    {/* Feature Boxes */}
                    <div className="max-w-5xl mx-auto">
                        <Row className='gap-y-8'>
                            <Col md={6}>
                                <div className="bg-Koffwhite rounded-[20px] p-6 h-full">
                                    <div className="w-16 h-16 bg-Kmint rounded-full flex items-center justify-center mb-4">
                                        <span className="text-3xl">✓</span>
                                    </div>
                                    <p className='text-body-md-regular text-Mgray'>
                                        Display menus, images, and allergens clearly on eatwithkinn.com with a professional, trusted presence.
                                    </p>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="bg-Koffwhite rounded-[20px] p-6 h-full">
                                    <div className="w-16 h-16 bg-Kpink80 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-3xl">🏆</span>
                                    </div>
                                    <p className='text-body-md-regular text-Mgray'>
                                        Upload food hygiene certificates and registration proof with your local council to build public trust.
                                    </p>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="bg-Koffwhite rounded-[20px] p-6 h-full">
                                    <div className="w-16 h-16 bg-Myellow rounded-full flex items-center justify-center mb-4">
                                        <span className="text-3xl">💳</span>
                                    </div>
                                    <p className='text-body-md-regular text-Mgray'>
                                        Manage pickup windows and accept payments through Stripe, Apple Pay, and Google Pay with ease.
                                    </p>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="bg-Koffwhite rounded-[20px] p-6 h-full">
                                    <div className="w-16 h-16 bg-Kmint rounded-full flex items-center justify-center mb-4">
                                        <span className="text-3xl">💬</span>
                                    </div>
                                    <p className='text-body-md-regular text-Mgray'>
                                        Communicate directly with buyers through in-app chat and build trust through ratings and reviews.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>

            {/* Our Impact Section */}
            <section className='bg-gradient-to-br from-Kmint to-teal-100 py-[80px] relative overflow-hidden'>
                {/* Decorative SVG Background */}
                <div className="absolute top-10 left-10 opacity-10 w-40 h-40">
                    <img src="/images/vegetables-salad.svg" alt="" className="w-full h-full" />
                </div>
                <div className="absolute bottom-10 right-10 opacity-10 w-36 h-36 hidden lg:block">
                    <img src="/images/pizza 2.svg" alt="" className="w-full h-full" />
                </div>

                <Container className="relative z-10">
                    <div className="text-center mb-12">
                        <h2 className='text-h2-normal text-Mblack mb-4'>Our Impact</h2>
                        <p className='text-body-xl-regular text-gray-800 max-w-3xl mx-auto'>
                            Empowering home-based food sellers—especially those from BAME, migrant, or NEET backgrounds—to earn safely, gain visibility, and contribute meaningfully to their communities.
                        </p>
                    </div>

                    <Row className='items-start gap-y-8'>
                        <Col lg={6}>
                            <div className="bg-white rounded-[20px] p-8 h-full">
                                <h3 className='text-h3 text-Mblack mb-4'>Today</h3>
                                <p className='text-body-md-regular text-Mgray leading-relaxed'>
                                    Kinn helps small sellers formalise their businesses and build confidence. Sellers gain legitimacy through verification and reviews, manage payments securely, and focus on what they love—cooking. Buyers enjoy safer access to affordable, home-style meals that reflect the diversity of their communities.
                                </p>
                            </div>
                        </Col>

                        <Col lg={6}>
                            <div className="bg-white rounded-[20px] p-8 h-full">
                                <h3 className='text-h3 text-Mblack mb-4'>Tomorrow</h3>
                                <p className='text-body-md-regular text-Mgray leading-relaxed'>
                                    Kinn will reduce inequality in the food economy by giving underrepresented groups access to professional digital infrastructure. We'll nurture a trusted ecosystem of licensed home cooks whose work celebrates culture, inclusion, and care—making food a bridge between people and communities.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* About Us Section */}
            <section className='bg-Koffwhite py-[80px]' id="about">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className='text-h2-normal text-Mblack mb-6'>About Kinn</h2>
                        <div className="max-w-4xl mx-auto">
                            <p className='text-body-lg-regular text-Mblack leading-relaxed'>
                                Kinn is a social enterprise and community-based marketplace connecting people with local home cooks. We believe that food should be made with integrity, not just for convenience. Our platform empowers talented home cooks to turn their passion into a business, while giving you access to delicious, wholesome meals made with love. This is a place where family cooks for family, building a more harmonious community, one plate at a time.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>
        </Fragment >
    )
}

export default Homepage