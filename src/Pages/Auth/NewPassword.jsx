import React from 'react'
import { Fragment } from 'react'
import { LogoIcon } from '../../Components/Icon/Icon'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NewPassword = () => {
    const [statusPassword, setstatusPassword] = useState(false)

    const [tooglePassword, settooglePassword] = useState(true)
    const [tooglePasswordRNew, settooglePasswordRNew] = useState(true)


    const SuccessForm = () => {
        return (
            <Fragment>
                <div className="text-center">
                    <img src={window.location.origin + "/images/ssfsdfsdf.svg"} className='mx-auto -mb-[0.5rem]' alt="" />
                    <h3 className='font-medium text__32 mb-2'>Success!</h3>
                    <p className='text__16 text-Mgray mb-10'>Your password is succesfully <br /> created</p>

                    <NavLink to="/" className='inline-block cursor-pointer font-medium text__16 text-Mblack  !border-Mblack hover:text-white hover:bg-Mblack btnClass'>Continue</NavLink>
                </div>
            </Fragment>
        )
    }

    const NewPasswordForm = () => {
        return (
            <Fragment>
                <div className="text-center mb-10">
                    <div className="flex items-center gap-2 mb-3 justify-center">
                        <LogoIcon color='#FEC51C' />
                        <span className='font-medium text__20 text-Mblack'>Foodex</span>
                    </div>
                    <h4 className='font-medium text__32 mb-2'>Create New Password</h4>
                    <p>Recover your account password</p>
                </div>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className='font-normal text__14 text-[#A3A3A3]'>Password<span className='text-[#ED544E]'>*</span></Form.Label>
                    <div className="relative">
                        <Form.Control type={tooglePassword ? "password" : "text"} placeholder="***************" className='font-medium text__14 bg-[#FAFAFA] h-[54px] rounded-[20px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]' />
                        <img onClick={() => settooglePassword(!tooglePassword)} src="./../../images/eye-slash.svg" className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-4' alt="" />
                    </div>

                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className='font-normal text__14 text-[#A3A3A3]'>New Password<span className='text-[#ED544E]'>*</span></Form.Label>
                    <div className="relative">
                        <Form.Control type={tooglePasswordRNew ? "password" : "text"} placeholder="***************" className='font-medium text__14 bg-[#FAFAFA] h-[54px] rounded-[20px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]' />
                        <img onClick={() => settooglePasswordRNew(!tooglePasswordRNew)} src="./../../images/eye-slash.svg" className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-4' alt="" />
                    </div>

                </Form.Group>

                <div onClick={() => setstatusPassword(!statusPassword)} className='cursor-pointer inline-block cursor-pointer text-center font-medium text__16 text-white !py-[15px] bg-Mblack !border-Mblack btnClass w-full'>Next</div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            {
                !statusPassword ? NewPasswordForm() : SuccessForm()
            }
        </Fragment>
    )
}

export default NewPassword
