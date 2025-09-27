import React, { Fragment } from 'react'
import { LogoIcon } from '../../Components/Icon/Icon'
import { Form } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const ForgotPassword = () => {
    return (
        <Fragment>

            <div className="text-center mb-10">
                <div className="flex items-center gap-2 mb-3 justify-center">
                    <LogoIcon color='#FEC51C' />
                    <span className='font-medium text__20 text-Mblack'>Foodex</span>
                </div>
                <h4 className='font-medium text__32 mb-2'>Forgot your password?</h4>
                <p>We'll send you an email with a link to reset your password.</p>
            </div>


            <Form.Group className="mb-8" controlId="exampleForm.ControlInput1">
                <Form.Label className='font-normal text__14 text-[#A3A3A3]'>Email address</Form.Label>
                <Form.Control type="email" placeholder="e.g sanandreas@gmail.com" className='font-medium text__14 bg-[#FAFAFA] h-[54px] rounded-[20px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]' />
            </Form.Group>

            <NavLink to="/auth/riset-password" className='inline-block cursor-pointer text-center font-medium text__16 text-white !py-[15px] bg-Mblack !border-Mblack btnClass w-full'>Send me a reset link</NavLink>
        </Fragment>
    )
}

export default ForgotPassword
