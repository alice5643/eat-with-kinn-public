import React, { Fragment, useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { stripePromise } from '../utils/stripe'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import ModalSuccess from '../Components/Modal/ModalSuccess'

// Checkout Form Component
const CheckoutForm = ({ orderTotal, cartItems, handleSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setError(submitError.message);
            setProcessing(false);
            return;
        }

        // Confirm payment
        const { error: confirmError } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment/success`,
            },
            redirect: 'if_required'
        });

        if (confirmError) {
            setError(confirmError.message);
            setProcessing(false);
        } else {
            // Payment successful
            handleSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <button
                type="submit"
                disabled={!stripe || processing}
                className={'w-full mt-4 font-medium text__14 btnClass !px-[32px] text-white bg-Mblack text-center cursor-pointer' + (processing ? ' opacity-50' : '')}
            >
                {processing ? 'Processing...' : `Pay £${orderTotal.toFixed(2)}`}
            </button>
        </form>
    );
};

const Payment = () => {
    const { user } = useAuth();
    const [show, setShow] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(true);

    // Mock cart data - this should come from your cart state/context
    const [cartItems] = useState([
        {
            id: 1,
            title: "Menú Durum",
            description: "Rollo de fina masa de pan de trigo, relleno de carne de pollo, ternera, mixto o falafel con patatas y bebida",
            price: 10.00,
            quantity: 1,
            sellerId: 'mock-seller-id',
            restaurantName: "Istanbul Doner Kebab"
        }
    ]);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 0; // Free shipping
    const platformCommission = (subtotal * 10) / 100; // 10% platform commission
    const orderTotal = subtotal + deliveryFee + platformCommission;

    useEffect(() => {
        // Only create payment intent if Stripe is properly configured
        if (process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY &&
            process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY !== 'your_stripe_publishable_key_here') {
            createPaymentIntent();
        } else {
            setLoading(false);
        }
    }, []);

    const createPaymentIntent = async () => {
        try {
            setLoading(true);

            // Simple payment intent creation (without Connect for testing)
            const { data, error } = await supabase.functions.invoke('create-payment-intent', {
                body: {
                    amount: orderTotal,
                    currency: 'gbp',
                }
            });

            if (error) {
                console.error('Error creating payment intent:', error);
                return;
            }

            setClientSecret(data.clientSecret);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => setShow(false);
    const handleSuccess = () => setShow(true);

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            variables: {
                colorPrimary: '#171717',
                colorBackground: '#FAFAFA',
                colorText: '#171717',
                borderRadius: '20px',
            },
        },
    };

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
                                                <input type="radio" id="adressCheck" name="address" value="4517 Washington Ave. Manchester, Kentucky 39495" className='absolute -z-[1] opacity-0 left-0 top-0 radioFIlter' defaultChecked />
                                                <label htmlFor="adressCheck" className='cursor-pointer w-[20px] h-[20px] rounded-[100%] relative '>
                                                    <div className="w-[14px] h-[14px] rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FEC51C] opacity-0"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h5 className='font-medium text__16 mb-2'>Payment Method</h5>
                                    {!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ||
                                     process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY === 'your_stripe_publishable_key_here' ? (
                                        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-[20px] text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-3 text-yellow-600">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                            </svg>
                                            <h5 className='font-medium text__16 text-Mblack mb-2'>Stripe Configuration Required</h5>
                                            <p className='text__14 text-gray-700 mb-3'>
                                                To enable payments, please add your Stripe publishable key to the .env file.
                                            </p>
                                            <div className="text-left bg-white p-3 rounded-[12px] text__12 font-mono text-gray-600 mb-3">
                                                REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
                                            </div>
                                            <p className='text__12 text-gray-500'>
                                                Get your keys from: <a href="https://dashboard.stripe.com/test/apikeys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Stripe Dashboard</a>
                                            </p>
                                        </div>
                                    ) : loading ? (
                                        <div className="p-6 text-center">
                                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-Mblack"></div>
                                            <p className='text__14 text-gray-600 mt-3'>Loading payment options...</p>
                                        </div>
                                    ) : clientSecret ? (
                                        <Elements stripe={stripePromise} options={options}>
                                            <CheckoutForm
                                                orderTotal={orderTotal}
                                                cartItems={cartItems}
                                                handleSuccess={handleSuccess}
                                            />
                                        </Elements>
                                    ) : (
                                        <div className="p-4 text-center text-red-500">Failed to initialize payment. Please try again.</div>
                                    )}
                                </div>
                            </Col>
                            <Col md={5} lg={4} xl={3}>
                                <div className="w-full p-4 border !border-[#E5E5E5] rounded-[20px]">
                                    <h4 className='font-medium text__20 mb-2'>{cartItems[0]?.title}</h4>
                                    <p className='text__14 mb-3'>{cartItems[0]?.description}</p>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="flex items-center justify-between">
                                            <h5 className='text__16 text-[#525252]'>Quantity</h5>
                                            <h5 className='text__16 text-[#171717] font-medium'>{cartItems[0]?.quantity}</h5>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h5 className='text__16 text-[#525252]'>Subtotal</h5>
                                            <h5 className='text__16 text-[#171717] font-medium'>£{subtotal.toFixed(2)}</h5>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h5 className='text__16 text-[#525252]'>Platform Fee (10%)</h5>
                                            <h5 className='text__16 text-[#171717] font-medium'>£{platformCommission.toFixed(2)}</h5>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h5 className='text__16 text-[#525252]'>Shipping</h5>
                                            <h5 className='text__16 text-[#171717] font-medium'>Free</h5>
                                        </div>
                                    </div>
                                    <hr className='border-b-0 border-t !border-[#E5E5E5] my-2' />
                                    <div className="flex items-center justify-between">
                                        <h5 className='text__16 text-[#525252]'>Order Total</h5>
                                        <h5 className='text__20 text-[#171717] font-medium'>£{orderTotal.toFixed(2)}</h5>
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