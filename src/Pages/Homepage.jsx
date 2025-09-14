import React, { Fragment, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ModalFind from '../Components/Modal/ModalFind'

const Homepage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Fragment>

            <ModalFind show={show} handleClose={() => handleClose()} />

            {/* start:hero */}
            <section className='relative overflow-hidden min-h-screen pt-[88px] lg:pt-[98px] -mt-[88px] lg:-mt-[98px] bg-Kbeige flex flex-wrap pb-0'>
                <Container className='relative z-[2] w-full pt-[80px] relative'>
                    <Row className='justify-center relative z-2'>
                        <Col md={10} lg={8} className='text-center' >
                            <div className="mb-10">
                                <h1 className='text-h1 text-Mblack mb-6'>
                                    Food Made with Love.<br />For the Community.
                                </h1>
                                <p className='text-body-xl-regular leading-[30px] mb-8'>We connect you with passionate local cooks who are serving their community with fresh, homemade meals.</p>
                                
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                                    <button className="btn-primary">Become a seller</button>
                                    <button className="btn-secondary" onClick={handleShow}>Find local food</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="w-full max-w-[650px] mx-auto px-4">
                    <img src="./../images/vision-1.png" className='w-full object-cover relative z-[2]' alt="Food made with love" />
                </div>
            </section>

            {/* start: Better food section */}
            <section className='bg-Kpink80 py-[80px]' id="how-it-works">
                <Container>
                    <Row className='items-center gap-y-8'>
                        <Col lg={6} className='order-2 lg:order-1'>
                            <h2 className='text-h2-normal text-Mblack mb-6'>Better food starts at home.</h2>
                            <p className='text-body-lg-regular text-Mblack mb-8'>We believe the best meals are made by people who care. Kinn connects you to a community of talented home cooks who use simple, wholesome ingredients to create food that's tastier and healthier than typical takeaway. It's food you'd serve to your own family.</p>
                            <button className="btn-primary" onClick={handleShow}>Find Local Food</button>
                        </Col>
                        <Col lg={6} className='order-1 lg:order-2'>
                            <div className="rounded-[20px] overflow-hidden">
                                <img src="./../images/buyer_section.png" className='w-full h-auto' alt="Buy local food" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* start: Love cooking section */}
            <section className='bg-Kmint py-[80px]'>
                <Container>
                    <Row className='items-center gap-y-8'>
                        <Col lg={6}>
                            <div className="rounded-[20px] overflow-hidden">
                                <img src="./../images/seller_section.png" className='w-full h-auto' alt="Start cooking business" />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <h2 className='text-h2-normal text-Mblack mb-6'>Love cooking? Create a shop with us.</h2>
                            <p className='text-body-lg-regular text-Mblack mb-8'>Kinn is your all-in-one platform to run a home-based food business. We give you the tools to manage your products, track orders, and handle payments, so you can focus on what you do best: cooking with passion.</p>
                            <button className="btn-primary">Get Started</button>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* end: explanatory sections */}

            {/* About Us Section */}
            <section className='bg-Kbeige py-[80px]' id="about">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className='text-h2-normal text-Mblack mb-6'>ABOUT US</h2>
                        <div className="max-w-4xl mx-auto">
                            <p className='text-body-lg-regular text-Mblack leading-relaxed'>
                                Kinn is a community-based marketplace connecting people with local home cooks. We believe that food should be made with integrity, not just for convenience. Our platform empowers talented home cooks to turn their passion into a business, while giving you access to delicious, wholesome meals made with love. This is a place where family cooks for family, building a more harmonious community, one plate at a time.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>
        </Fragment >
    )
}

export default Homepage
