import React, { Fragment, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Cart = () => {
    // Mock cart data - will be replaced with real cart state management later
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            title: "Margherita Pizza",
            restaurant: "La Bella Italia",
            price: 12.50,
            quantity: 2,
            img: window.origin + "/images/fd (1).png"
        },
        {
            id: 2,
            title: "Chicken Kebab",
            restaurant: "Istanbul Doner",
            price: 10.00,
            quantity: 1,
            img: window.origin + "/images/fd (2).png"
        }
    ]);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity === 0) {
            setCartItems(cartItems.filter(item => item.id !== id));
        } else {
            setCartItems(cartItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 3.50;
    const total = subtotal + deliveryFee;

    return (
        <Fragment>
            <section className='pb-0 pt-[120px] bg-[#F8F8F8] min-h-screen'>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <div className="mb-6">
                                <h2 className='text-h3 text-Mblack mb-2'>Shopping Cart</h2>
                                <p className='text-body-lg text-gray-600'>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
                            </div>

                            {cartItems.length > 0 ? (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="bg-white rounded-[20px] p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-[100px] h-[100px] rounded-[12px] overflow-hidden flex-shrink-0">
                                                    <img src={item.img} className='w-full h-full object-cover' alt={item.title} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className='text-h6 text-Mblack mb-1'>{item.title}</h4>
                                                    <p className='text-body-sm text-gray-500 mb-3'>{item.restaurant}</p>
                                                    <div className="flex items-center justify-between">
                                                        <p className='text-h6 text-Mblack'>£{item.price.toFixed(2)}</p>
                                                        <div className="flex items-center gap-3 bg-[#F5F5F5] rounded-full px-3 py-1">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center hover:bg-gray-200"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                                                </svg>
                                                            </button>
                                                            <span className='text-body-md font-semibold w-[20px] text-center'>{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center hover:bg-gray-200"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-[20px] p-12 text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-gray-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    <h4 className='text-h5 text-Mblack mb-2'>Your cart is empty</h4>
                                    <p className='text-body-md text-gray-500 mb-4'>Add some delicious food to get started!</p>
                                    <NavLink to="/search" className="btn-primary">Browse Restaurants</NavLink>
                                </div>
                            )}
                        </Col>

                        <Col lg={4}>
                            <div className="bg-white rounded-[20px] p-6 sticky top-[120px]">
                                <h4 className='text-h6 text-Mblack mb-4'>Order Summary</h4>

                                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <p className='text-body-md text-gray-600'>Subtotal</p>
                                        <p className='text-body-md font-medium text-Mblack'>£{subtotal.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className='text-body-md text-gray-600'>Delivery Fee</p>
                                        <p className='text-body-md font-medium text-Mblack'>£{deliveryFee.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-6">
                                    <p className='text-h6 text-Mblack'>Total</p>
                                    <p className='text-h5 text-Mblack'>£{total.toFixed(2)}</p>
                                </div>

                                {cartItems.length > 0 && (
                                    <NavLink to="/payment" className="btn-primary w-full">
                                        Proceed to Checkout
                                    </NavLink>
                                )}

                                <div className="mt-4 p-4 bg-Koffwhite rounded-[12px]">
                                    <div className="flex items-start gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>
                                        <div>
                                            <p className='text-body-sm font-medium text-Mblack mb-1'>Free delivery on orders over £25</p>
                                            <p className='text-body-sm text-gray-600'>Add £{Math.max(0, 25 - subtotal).toFixed(2)} more to qualify!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    )
}

export default Cart