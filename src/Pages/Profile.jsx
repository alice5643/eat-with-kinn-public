import React, { Fragment, useState } from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        city: user?.city || '',
        postcode: user?.postcode || ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        updateUser({ ...user, ...formData });
        setIsEditing(false);
    };

    return (
        <Fragment>
            <section className='pb-0 pt-[120px] bg-[#F8F8F8] min-h-screen'>
                <Container>
                    <Row className='justify-center'>
                        <Col md={10} lg={8}>
                            <div className="bg-white rounded-[20px] p-6 mb-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className='text-h3 text-Mblack'>Account Information</h2>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="btn-secondary !py-2 !px-4"
                                        >
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="btn-secondary !py-2 !px-4"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className="btn-primary !py-2 !px-4"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                                    <div className="w-[80px] h-[80px] rounded-full bg-Myellow flex items-center justify-center text-h2-normal font-bold text-Mblack">
                                        {formData.name ? formData.name.charAt(0).toUpperCase() : formData.email?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <h3 className='text-h5 text-Mblack mb-1'>{formData.name || 'User'}</h3>
                                        <p className='text-body-md text-gray-500'>{formData.email}</p>
                                    </div>
                                </div>

                                <Row className='gap-y-4'>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className='text-body-md-semibold text-Mblack mb-2'>Full Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className='bg-[#FAFAFA] h-[54px] rounded-[12px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]'
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className='text-body-md-semibold text-Mblack mb-2'>Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className='bg-[#FAFAFA] h-[54px] rounded-[12px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]'
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className='text-body-md-semibold text-Mblack mb-2'>Phone Number</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                placeholder="+44 7123 456789"
                                                className='bg-[#FAFAFA] h-[54px] rounded-[12px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]'
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className='text-body-md-semibold text-Mblack mb-2'>Postcode</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="postcode"
                                                value={formData.postcode}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                placeholder="SW1A 1AA"
                                                className='bg-[#FAFAFA] h-[54px] rounded-[12px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]'
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label className='text-body-md-semibold text-Mblack mb-2'>Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                placeholder="123 Main Street"
                                                className='bg-[#FAFAFA] h-[54px] rounded-[12px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]'
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label className='text-body-md-semibold text-Mblack mb-2'>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                placeholder="London"
                                                className='bg-[#FAFAFA] h-[54px] rounded-[12px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]'
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    )
}

export default Profile