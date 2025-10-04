import React, { Fragment, useState } from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'

const Settings = () => {
    const [settings, setSettings] = useState({
        orderUpdates: true,
        promotions: false,
        newsletter: true,
        smsNotifications: false,
        emailNotifications: true,
        pushNotifications: true
    });

    const handleToggle = (key) => {
        setSettings({
            ...settings,
            [key]: !settings[key]
        });
    };

    return (
        <Fragment>
            <section className='pb-0 pt-[120px] bg-[#F8F8F8] min-h-screen'>
                <Container>
                    <Row className='justify-center'>
                        <Col md={10} lg={8}>
                            <div className="mb-6">
                                <h2 className='text-h3 text-Mblack mb-2'>Notification Settings</h2>
                                <p className='text-body-lg text-gray-600'>Manage how you receive notifications</p>
                            </div>

                            <div className="bg-white rounded-[20px] p-6 mb-6">
                                <h4 className='text-h6 text-Mblack mb-4'>Email Notifications</h4>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                                        <div>
                                            <p className='text-body-md font-medium text-Mblack mb-1'>Order Updates</p>
                                            <p className='text-body-sm text-gray-500'>Get notified about your order status</p>
                                        </div>
                                        <Form.Check
                                            type="switch"
                                            id="orderUpdates"
                                            checked={settings.orderUpdates}
                                            onChange={() => handleToggle('orderUpdates')}
                                            className="custom-switch"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                                        <div>
                                            <p className='text-body-md font-medium text-Mblack mb-1'>Promotions & Deals</p>
                                            <p className='text-body-sm text-gray-500'>Receive special offers and discounts</p>
                                        </div>
                                        <Form.Check
                                            type="switch"
                                            id="promotions"
                                            checked={settings.promotions}
                                            onChange={() => handleToggle('promotions')}
                                            className="custom-switch"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className='text-body-md font-medium text-Mblack mb-1'>Newsletter</p>
                                            <p className='text-body-sm text-gray-500'>Monthly updates and news from Kinn</p>
                                        </div>
                                        <Form.Check
                                            type="switch"
                                            id="newsletter"
                                            checked={settings.newsletter}
                                            onChange={() => handleToggle('newsletter')}
                                            className="custom-switch"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[20px] p-6 mb-6">
                                <h4 className='text-h6 text-Mblack mb-4'>Other Notifications</h4>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                                        <div>
                                            <p className='text-body-md font-medium text-Mblack mb-1'>SMS Notifications</p>
                                            <p className='text-body-sm text-gray-500'>Receive order updates via SMS</p>
                                        </div>
                                        <Form.Check
                                            type="switch"
                                            id="smsNotifications"
                                            checked={settings.smsNotifications}
                                            onChange={() => handleToggle('smsNotifications')}
                                            className="custom-switch"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                                        <div>
                                            <p className='text-body-md font-medium text-Mblack mb-1'>Push Notifications</p>
                                            <p className='text-body-sm text-gray-500'>Get browser notifications</p>
                                        </div>
                                        <Form.Check
                                            type="switch"
                                            id="pushNotifications"
                                            checked={settings.pushNotifications}
                                            onChange={() => handleToggle('pushNotifications')}
                                            className="custom-switch"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button className="btn-primary">Save Preferences</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    )
}

export default Settings