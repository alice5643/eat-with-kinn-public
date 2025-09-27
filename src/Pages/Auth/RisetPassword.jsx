import React from 'react'
import { Fragment } from 'react'
import { LogoIcon } from '../../Components/Icon/Icon'
import { Form } from 'react-bootstrap'
import VerificationInput from 'react-verification-input'
import { NavLink } from 'react-router-dom'

const RisetPassword = () => {
    return (
        <Fragment>
            <div className="text-center mb-10">
                <div className="flex items-center gap-2 mb-3 justify-center">
                    <LogoIcon color='#FEC51C' />
                    <span className='font-medium text__20 text-Mblack'>Foodex</span>
                </div>
                <h4 className='font-medium text__32 mb-2'>Reset Password</h4>
                <p>Recover your account password</p>
            </div>

            <div className="mb-8 wrapVerification">
                <VerificationInput length={5} classNames={{
                    container: "wrap",
                    character: "character",
                    characterInactive: "character--inactive",
                    characterSelected: "character--selected",
                }} />
            </div>
            <NavLink to="/auth/new-password" className='inline-block cursor-pointer text-center font-medium text__16 text-white !py-[15px] bg-Mblack !border-Mblack btnClass w-full'>Next</NavLink>

            <a href="#!" className='font-medium text__16 text-center w-full text-Myellow inline-block mt-4'>Resend</a>
        </Fragment>
    )
}

export default RisetPassword
