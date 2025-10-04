import React, { Fragment, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SortAction from '../Components/Filter/SortAction'
import { CardFoodRestaurant, CardFoodToBuy } from '../Components/Card/Card'
import { NavLink } from 'react-router-dom'

const DetailRestaurant = () => {

    const [cartData, setCartData] = useState([
        {
            title: "Menú Durum",
            desc: "Rollo de fina masa de pan de trigo, relleno de carne de pollo, ternera, mixto o falafel con patatas y bebida",
            img: window.origin + "/images/fd (1).png",
            price: "10.00",
            discount: "-20%",
            quantity: 0,
        },
        {
            title: "Rice garnish in white plate",
            desc: "Rollo de fina masa de pan de trigo, relleno de carne de pollo, ternera, mixto o falafel con patatas y bebida",
            img: window.origin + "/images/fd (2).png",
            price: "10.00",
            discount: "-20%",
            quantity: 0,
        },
        {
            title: "Rice with carrot cooked",
            desc: "Rollo de fina masa de pan de trigo, relleno de carne de pollo, ternera, mixto o falafel con patatas y bebida",
            img: window.origin + "/images/fd (3).png",
            price: "10.00",
            discount: "-20%",
            quantity: 0,
        },
        {
            title: "Spiced chicken quarter",
            desc: "Rollo de fina masa de pan de trigo, relleno de carne de pollo, ternera, mixto o falafel con patatas y bebida",
            img: window.origin + "/images/fd (4).png",
            price: "10.00",
            discount: "-20%",
            quantity: 0,
        },
        {
            title: "Couscous and fresh salad",
            desc: "Rollo de fina masa de pan de trigo, relleno de carne de pollo, ternera, mixto o falafel con patatas y bebida",
            img: window.origin + "/images/fd (5).png",
            price: "10.00",
            discount: "-20%",
            quantity: 0,
        },
        {
            title: "National uzbek pilaf",
            desc: "Rollo de fina masa de pan de trigo, relleno de carne de pollo, ternera, mixto o falafel con patatas y bebida",
            img: window.origin + "/images/fd (6).png",
            price: "10.00",
            discount: "-20%",
            quantity: 0,
        },
    ])

    const addToCart = (item, qty) => {
        const index = cartData.findIndex((cartItem) => cartItem.title === item.title);
        if (index !== -1) {
            const updatedCartData = [...cartData];
            updatedCartData[index].quantity = qty;
            setCartData(updatedCartData);
        }
    };

    const allTotal = () => {
        const totalPrice = cartData.reduce((acc, item) => {
            const itemPrice = parseFloat(item.price.replace("$", ""));
            const itemQuantity = item.quantity;
            return acc + (itemPrice * itemQuantity);
        }, 0)
        return {
            totalQuantity: cartData.reduce((acc, item) => acc + item.quantity, 0),
            totalPrice: totalPrice
        }
    }

    return (
        <Fragment>
            <section className='bg-[#F8F8F8] -mt-[88px] lg:-mt-[98px] pt-[140px]'>
                <Container>
                    <Row className='gap-y-4'>
                        <Col md={8} xl={9}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-[64px] h-[64px] rounded-full bg-[#171717] flex items-center justify-center">
                                    <img src={window.origin + "/images/vegetables-salad.svg"} alt="" />
                                </div>
                                <div className="">
                                    <h4 className='font-medium text__24 mb-2'>Istanbul Doner</h4>
                                    <div className="flex items-center gap-2 text__14 text-[#171717]">
                                        <p>1.2 km</p>
                                        <div className="w-[4px] h-[4px] rounded-full bg-[#171717]"></div>
                                        <p>9:00 AM - 10:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            <div className="my-4">
                                <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#E5E5E5] w-full">
                                    <img src="./../images/search-normal.svg" className='flex-shrink-0' alt="" />
                                    <input type="text" className='w-full bg-transparent border-none outline-none hover:focus:active:border-none hover:focus:active:outline-none font-medium text__14 text-Mblack' placeholder='Search...' />
                                </div>

                                <div className="my-3 flex items-center justify-between">
                                    <h5 className='font-medium text__16 text-[#171717] hidden ss:block'>56 <span className=' text-[#737373]'>Food available</span></h5>

                                    <div className="flex items-center gap-2 relative z-[4]">
                                        <h5 className='text__16 text-[#A2A1A7]'>Sort by:</h5>
                                        <SortAction />
                                    </div>
                                </div>

                                <div className="grid xl:grid-cols-2 gap-4">
                                    {
                                        cartData.map((obj, idx) => {
                                            return <CardFoodRestaurant index={idx} data={obj} addToCart={(a, b) => addToCart(a, b)} />
                                        })
                                    }
                                </div>

                                <div className="mt-4 text-center">
                                    <a href='#!' className="inline-block px-4 py-2 rounded-full border !border-[#E5E5E5] font-medium text__14 pointer hover:bg-[#171717] hover:text-white hover:!border-[#171717]">
                                        Explore More
                                    </a>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} xl={3}>
                            <div className="w-full p-4 bg-[#F8F8F8] border !border-[#E5E5E5] rounded-xl">
                                <h4 className='text-center font-medium text__20 mb-3'>Your order</h4>
                                {
                                    cartData.filter((item) => item.quantity > 0).length <= 0 ? <div className="">
                                        <img src="./../images/Illustration.svg" className='mx-auto' alt="" />
                                        <p className='mt-2 text__16 text-center'>You've not added any products yet. When you do, you'll see them here!</p>
                                    </div> : <div className="w-full">
                                        <div className="max-h-[350px] overflow-auto scrollStyle">
                                            <div className="grid grid-cols-1 gap-3">
                                                {cartData.map((obj, idx) => {
                                                    if (obj.quantity > 0) {
                                                        return <CardFoodToBuy index={idx} data={obj} addToCart={(a, b) => addToCart(a, b)} />
                                                    }
                                                    return ""
                                                })}
                                            </div>
                                        </div>
                                        <hr className='border-b-0 border-t !bprder-[#E5E5E5] my-3' />
                                        <div className="grid grid-cols-1 gap-3">
                                            <div className="flex items-center justify-between">
                                                <h5 className='text__16 text-[#525252]'>Quality</h5>
                                                <h5 className='text__16 text-[#171717] font-medium'>{
                                                    allTotal().totalQuantity
                                                }</h5>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <h5 className='text__16 text-[#525252]'>Total Price</h5>
                                                <h5 className='text__16 text-[#171717] font-medium'>${allTotal().totalPrice}</h5>
                                            </div>
                                        </div>
                                        <hr className='border-b-0 border-t !bprder-[#E5E5E5] my-2' />
                                        <div className="flex items-center justify-between">
                                            <h5 className='text__16 text-[#525252]'>Order Total</h5>
                                            <h5 className='text__16 text-[#171717] font-medium'>${allTotal().totalPrice}</h5>
                                        </div>

                                        <div className="mt-3">
                                            <NavLink to="/payment" className={'inline-block w-full cursor-pointer font-medium text__14 btnClass !px-[32px] text-white bg-Mblack text-center'}>Order {allTotal().totalQuantity} for ${allTotal().totalPrice}</NavLink>
                                        </div>
                                    </div>

                                }


                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    )
}

export default DetailRestaurant