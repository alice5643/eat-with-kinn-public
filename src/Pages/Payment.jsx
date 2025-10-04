import React, { useState } from 'react'
import { Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ModalSuccess from '../Components/Modal/ModalSuccess'

const Payment = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Fragment>
            <ModalSuccess show={show} handleClose={() => handleClose()} />
            <section className='bg-[#F8F8F8] -mt-[88px] lg:-mt-[98px] pt-[140px]'>
                <Container>
                    <div className="w-full p-4 rounded-[24px] bg-white">
                        <Row className='gap-y-4'>
                            <Col md={7} lg={8} xl={9}>
                                <div className="flex items-center gap-1 mb-4">
                                    <a href='#!' className='normal text__16 text-[#A3A3A3]'>Istanbul Doner Kebab</a>
                                    <img src="./../images/fsdfd.svg" alt="" />
                                    <h5 className='normal text__16'>Detail Order</h5>
                                </div>

                                <div className="mb-4">
                                    <h5 className='font-medium text__16 mb-2'>Address</h5>
                                    <div className="w-full p-3 rounded-[20px] border !border-[#E5E5E5]">
                                        <div className="flex justify-between">
                                            <div className="flex items-start gap-2">
                                                <img src="./../images/location.svg" alt="" />
                                                <div className="">
                                                    <h5 className='font-medium text__16'>Jane Cooper</h5>
                                                    <p className='text__14 text-[#A3A3A3] my-1'>4517 Washington Ave. Manchester, Kentucky 39495</p>
                                                    <h5 className='font-medium text__16'>(406) 555-0120</h5>
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <input type="radio" id="adressCheck" name="address" value="4517 Washington Ave. Manchester, Kentucky 39495" className='absolute -z-[1] opacity-0 left-0 top-0 radioFIlter' checked />
                                                <label for="adressCheck" className='cursor-pointer w-[20px] h-[20px] rounded-[100%] relative '>
                                                    <div className="w-[14px] h-[14px] rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FEC51C] opacity-0"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h5 className='font-medium text__16 mb-2'>Payment Method</h5>
                                    <Row>
                                        <Col md={6}>
                                            <div className="relative">
                                                <input type="radio" id="PaymentPaypal" name="payment" value="paypal" className='absolute -z-[1] opacity-0 left-0 top-0 radioPayment' />
                                                <label for="PaymentPaypal" className="p-3 w-full border !border-[#E5E5E5] rounded-[20px] flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <img src="./../images/paypal.svg" alt="" />
                                                        <p className='text__14 font-medium'>PayPal</p>
                                                    </div>
                                                    <label for="PaymentPaypal" className='cursor-pointer w-[20px] h-[20px] rounded-[100%] relative '>
                                                        <div className="w-[14px] h-[14px] rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FEC51C] opacity-0"></div>
                                                    </label>
                                                </label>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="relative">
                                                <input type="radio" id="PaymentApple" name="payment" value="apple pay" className='absolute -z-[1] opacity-0 left-0 top-0 radioPayment' />
                                                <label for="PaymentApple" className="p-3 w-full border !border-[#E5E5E5] rounded-[20px] flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <img src="./../images/applepay.svg" alt="" />
                                                        <p className='text__14 font-medium'>Apple Pay</p>
                                                    </div>
                                                    <label for="PaymentApple" className='cursor-pointer w-[20px] h-[20px] rounded-[100%] relative '>
                                                        <div className="w-[14px] h-[14px] rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FEC51C] opacity-0"></div>
                                                    </label>
                                                </label>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="">
                                    <h5 className='font-medium text__16 mb-2'>Credit Card</h5>
                                    <div class="mb-3">
                                        <label for="" class="text__14 text-[#A3A3A3] mb-2">Card Name</label>
                                        <input type="text" class="w-full px-3 h-[54px] rounded-[20px] text-Mblack bg-[#FAFAFA] border border-solid !border-[#F5F5F5] outline-none hover:bg-[#FAFAFA] hover:!border-[#F5F5F5] hover:outline-none focus:bg-[#FAFAFA] focus:!border-[#F5F5F5] focus:outline-none placeholder:text-[#A3A3A3] font-medium text__14" placeholder="Input card name" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="" class="text__14 text-[#A3A3A3] mb-2">Card Number</label>
                                        <input type="text" class="w-full px-3 h-[54px] rounded-[20px] text-Mblack bg-[#FAFAFA] border border-solid !border-[#F5F5F5] outline-none hover:bg-[#FAFAFA] hover:!border-[#F5F5F5] hover:outline-none focus:bg-[#FAFAFA] focus:!border-[#F5F5F5] focus:outline-none placeholder:text-[#A3A3A3] font-medium text__14" placeholder="Ex:  31111 1111 1111 1111" />
                                    </div>
                                    <Row>
                                        <Col md={4}>
                                            <div class="mb-3">
                                                <label for="" class="text__14 text-[#A3A3A3] mb-2">Postal Code</label>
                                                <input type="text" class="w-full px-3 h-[54px] rounded-[20px] text-Mblack bg-[#FAFAFA] border border-solid !border-[#F5F5F5] outline-none hover:bg-[#FAFAFA] hover:!border-[#F5F5F5] hover:outline-none focus:bg-[#FAFAFA] focus:!border-[#F5F5F5] focus:outline-none placeholder:text-[#A3A3A3] font-medium text__14" placeholder="123456" />
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div class="mb-3">
                                                <label for="" class="text__14 text-[#A3A3A3] mb-2">Expiration</label>
                                                <input type="text" class="w-full px-3 h-[54px] rounded-[20px] text-Mblack bg-[#FAFAFA] border border-solid !border-[#F5F5F5] outline-none hover:bg-[#FAFAFA] hover:!border-[#F5F5F5] hover:outline-none focus:bg-[#FAFAFA] focus:!border-[#F5F5F5] focus:outline-none placeholder:text-[#A3A3A3] font-medium text__14" placeholder="MM/YY" />
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div class="mb-3">
                                                <label for="" class="text__14 text-[#A3A3A3] mb-2">CCV</label>
                                                <input type="text" class="w-full px-3 h-[54px] rounded-[20px] text-Mblack bg-[#FAFAFA] border border-solid !border-[#F5F5F5] outline-none hover:bg-[#FAFAFA] hover:!border-[#F5F5F5] hover:outline-none focus:bg-[#FAFAFA] focus:!border-[#F5F5F5] focus:outline-none placeholder:text-[#A3A3A3] font-medium text__14" placeholder="123" />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={5} lg={4} xl={3}>
                                <div className="w-full p-4 border !border-[#E5E5E5] rounded-[20px]">
                                    <h4 className='font-medium text__20 mb-2'>Menú Durum</h4>
                                    <p className='text__14 mb-3'>Rollo de fina masa de pan de trigo, relleno de carne de pollo, ternera, mixto o falafel con patatas y bebida</p>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="flex items-center justify-between">
                                            <h5 className='text__16 text-[#525252]'>Quality</h5>
                                            <h5 className='text__16 text-[#171717] font-medium'>1</h5>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h5 className='text__16 text-[#525252]'>Total Price</h5>
                                            <h5 className='text__16 text-[#171717] font-medium'>$10</h5>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h5 className='text__16 text-[#525252]'>Shipping</h5>
                                            <h5 className='text__16 text-[#171717] font-medium'>Free</h5>
                                        </div>
                                    </div>
                                    <hr className='border-b-0 border-t !bprder-[#E5E5E5] my-2' />
                                    <div className="flex items-center justify-between">
                                        <h5 className='text__16 text-[#525252]'>Order Total</h5>
                                        <h5 className='text__16 text-[#171717] font-medium'>$10</h5>
                                    </div>

                                    <div className="mt-3">
                                        <div onClick={handleShow} className={'inline-block w-full cursor-pointer font-medium text__14 btnClass !px-[32px] text-white bg-Mblack text-center cursor-pointer'}>Order Now</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </Fragment>
    )
}

export default Payment