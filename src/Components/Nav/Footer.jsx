import React, { Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { LogoIcon } from '../Icon/Icon'

const Footer = () => {
    return (
        <Fragment>
            <section className='py-16 bg-Koffwhite'>
                <Container className='relative'>
                    <Row className='mb-12'>
                        <Col className='mb-8 mb-lg-0' lg={6}>
                            <div className="flex items-center gap-2 mb-4">
                                <LogoIcon color='#2B4C7E' />
                                <span className='font-Kalam text-h4 font-bold text-Mblack'>Kinn</span>
                            </div>
                            <p className='text-body-lg-regular text-Mblack mb-4'>Nourish. Create. Connect.</p>
                        </Col>
                        <Col className='mb-8 mb-lg-0' lg={6}>
                            <div className="flex flex-wrap md:flex-nowrap gap-8 md:gap-16 justify-start md:justify-end">
                                <div>
                                    <a href="/privacy" className='text-body-lg-medium text-Mblack hover:text-Knavy'>Privacy Policy</a>
                                </div>
                                <div>
                                    <a href="/terms" className='text-body-lg-medium text-Mblack hover:text-Knavy'>Terms & Conditions</a>
                                </div>
                                <div>
                                    <a href="mailto:hello@eatwithkinn.com" className='text-body-lg-medium text-Mblack hover:text-Knavy'>Contact Us</a>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div className="border-t border-gray-300 pt-6">
                        <p className='text-body-md-regular text-gray-600 text-center'>© 2025 Quenra Ltd® All rights reserved.</p>
                    </div>
                </Container>
            </section>
        </Fragment>
    )
}

export default Footer
