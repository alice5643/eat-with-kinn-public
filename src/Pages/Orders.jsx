import React, { Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Orders = () => {
    // Mock order data - will be replaced with real data from Supabase later
    const orders = [
        {
            id: 'ORD-001',
            date: '2024-09-28',
            restaurant: 'La Bella Italia',
            items: 3,
            total: 45.50,
            status: 'Delivered'
        },
        {
            id: 'ORD-002',
            date: '2024-09-25',
            restaurant: 'Istanbul Doner Kebab',
            items: 2,
            total: 28.00,
            status: 'Delivered'
        },
        {
            id: 'ORD-003',
            date: '2024-09-20',
            restaurant: 'Cedar Delights',
            items: 4,
            total: 62.00,
            status: 'Cancelled'
        }
    ];

    const getStatusColor = (status) => {
        switch(status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'In Progress':
                return 'bg-blue-100 text-blue-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Fragment>
            <section className='pb-0 pt-[120px] bg-[#F8F8F8] min-h-screen'>
                <Container>
                    <Row className='justify-center'>
                        <Col md={10} lg={8}>
                            <div className="mb-6">
                                <h2 className='text-h3 text-Mblack mb-2'>My Orders</h2>
                                <p className='text-body-lg text-gray-600'>View and track your order history</p>
                            </div>

                            <div className="space-y-4">
                                {orders.length > 0 ? orders.map((order) => (
                                    <div key={order.id} className="bg-white rounded-[20px] p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className='text-h6 text-Mblack mb-1'>{order.restaurant}</h4>
                                                <p className='text-body-md text-gray-500'>Order #{order.id}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-body-sm font-medium ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                            <div className="flex items-center gap-6">
                                                <div>
                                                    <p className='text-body-sm text-gray-500'>Date</p>
                                                    <p className='text-body-md font-medium text-Mblack'>{new Date(order.date).toLocaleDateString('en-GB')}</p>
                                                </div>
                                                <div>
                                                    <p className='text-body-sm text-gray-500'>Items</p>
                                                    <p className='text-body-md font-medium text-Mblack'>{order.items}</p>
                                                </div>
                                                <div>
                                                    <p className='text-body-sm text-gray-500'>Total</p>
                                                    <p className='text-body-md font-medium text-Mblack'>£{order.total.toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <button className="btn-secondary !py-2 !px-4">View Details</button>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="bg-white rounded-[20px] p-12 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-gray-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                        </svg>
                                        <h4 className='text-h5 text-Mblack mb-2'>No orders yet</h4>
                                        <p className='text-body-md text-gray-500 mb-4'>Start exploring and place your first order!</p>
                                        <a href="/search" className="btn-primary">Browse Restaurants</a>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    )
}

export default Orders