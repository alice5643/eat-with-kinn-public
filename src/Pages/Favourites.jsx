import React, { Fragment, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Favourites = () => {
    // Mock favourites data - will be replaced with real data from Supabase later
    const [favourites] = useState([
        {
            id: 1,
            img: window.origin + "/images/fd (1).png",
            title: "La Bella Italia",
            distance: "1.2 km",
            time: "9:00 AM - 10:00 PM",
            like: "160",
            cuisine: "Italian"
        },
        {
            id: 2,
            img: window.origin + "/images/fd (2).png",
            title: "Istanbul Doner Kebab",
            distance: "1.5 km",
            time: "10:00 AM - 11:00 PM",
            like: "201",
            cuisine: "Turkish"
        },
        {
            id: 3,
            img: window.origin + "/images/fd (3).png",
            title: "Cedar Delights",
            distance: "2.0 km",
            time: "11:00 AM - 10:00 PM",
            like: "120",
            cuisine: "Lebanese"
        }
    ]);

    return (
        <Fragment>
            <section className='pb-0 pt-[120px] bg-[#F8F8F8] min-h-screen'>
                <Container>
                    <Row className='justify-center'>
                        <Col md={10}>
                            <div className="mb-6">
                                <h2 className='text-h3 text-Mblack mb-2'>My Favourites</h2>
                                <p className='text-body-lg text-gray-600'>Your saved restaurants and sellers</p>
                            </div>

                            {favourites.length > 0 ? (
                                <Row className='gap-y-6'>
                                    {favourites.map((item) => (
                                        <Col md={4} key={item.id}>
                                            <NavLink to="/detail/restaurant" className="w-full inline-block">
                                                <div className="bg-white rounded-[20px] overflow-hidden hover:shadow-lg transition-shadow">
                                                    <div className="w-full relative overflow-hidden h-[186px]">
                                                        <div className="flex items-center gap-1 font-medium text__14 px-3 py-1 rounded-full bg-white absolute left-3 top-3 z-10">
                                                            <img src={window.origin + "/images/like.png"} alt="" />
                                                            <span>{item.like}</span>
                                                        </div>
                                                        <button className="absolute right-3 top-3 w-[32px] h-[32px] rounded-full bg-white hover:bg-red-50 flex items-center justify-center z-10">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                                                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                                            </svg>
                                                        </button>
                                                        <img src={item.img} className='w-full h-full object-cover' alt={item.title} />
                                                    </div>
                                                    <div className="p-4">
                                                        <h5 className='font-medium text__16 mb-1'>{item.title}</h5>
                                                        <p className='text-body-sm text-gray-500 mb-2'>{item.cuisine}</p>
                                                        <div className="flex items-center gap-2 text__14 text-[#171717]">
                                                            <p>{item.distance}</p>
                                                            <div className="w-[4px] h-[4px] rounded-full bg-[#171717]"></div>
                                                            <p>{item.time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <div className="bg-white rounded-[20px] p-12 text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-gray-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                    <h4 className='text-h5 text-Mblack mb-2'>No favourites yet</h4>
                                    <p className='text-body-md text-gray-500 mb-4'>Start adding your favourite restaurants!</p>
                                    <a href="/search" className="btn-primary">Browse Restaurants</a>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    )
}

export default Favourites