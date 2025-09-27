import React from 'react'
import { Fragment, useRef, useEffect } from 'react'
import { LogoIcon } from '../../Components/Icon/Icon'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import useGoogleAuth from '../../hooks/useGoogleAuth'
const Login = () => {
    const [tooglePassword, settooglePassword] = useState(true)
    const [toogleChecklist, settoogleChecklist] = useState(false)
    const googleButtonRef = useRef(null)
    const navigate = useNavigate()
    const { user, isGoogleLoaded, renderGoogleButton } = useGoogleAuth()

    useEffect(() => {
        // Render Google button when Google is loaded
        if (googleButtonRef.current && isGoogleLoaded) {
            // Clear any existing content
            googleButtonRef.current.innerHTML = '';
            renderGoogleButton(googleButtonRef.current, {
                theme: 'outline',
                size: 'large',
                width: '100%',
                text: 'signin_with'
            })
        }
    }, [renderGoogleButton, isGoogleLoaded])

    useEffect(() => {
        // Handle successful Google authentication
        if (user) {
            console.log('Google user signed in:', user)
            navigate('/')
        }
    }, [user, navigate])

    return (
        <Fragment>
            <div className="text-center mb-10">
                <div className="flex items-center gap-2 mb-3 justify-center">
                    <LogoIcon color='#FEC51C' />
                    <span className='font-Kalam font-medium text__20 text-Mblack'>Kinn</span>
                </div>
                <h4 className='font-medium text__32 mb-2'>Good to see you again 👋</h4>
                <p>Don't have an account? <NavLink to="/auth/signup" className='text-Myellow '>Sign Up</NavLink></p>
            </div>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className='font-normal text__14 text-[#A3A3A3]'>Email</Form.Label>
                <Form.Control type="email" placeholder="e.g sanandreas@gmail.com" className='font-medium text__14 bg-[#FAFAFA] h-[54px] rounded-[20px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]' />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className='font-normal text__14 text-[#A3A3A3]'>Password</Form.Label>
                <div className="relative">
                    <Form.Control type={tooglePassword ? "password" : "text"} placeholder="Must be at least 8 character" className='font-medium text__14 bg-[#FAFAFA] h-[54px] rounded-[20px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]' />
                    <img onClick={() => settooglePassword(!tooglePassword)} src="/images/eye-slash.svg" className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-4' alt="" />
                </div>
            </Form.Group>

            <div className="text-right mb-3">
                <NavLink to="/auth/forgot-password" className='font-medium text__14 text-Myellow '>Forgot Password?</NavLink>
            </div>

            <div className="mb-6 flex items-center gap-2 cursor-pointer" onClick={() => settoogleChecklist(!toogleChecklist)}>
                <div className={"flex items-center justify-center w-[24px] h-[24px] rounded-full border border-solid  " + (toogleChecklist ? "border-Myellow bg-Myellow bg-Myellow" : "border-[#A3A3A3]")}>
                    <img src="/images/check (3).svg" className={toogleChecklist ? "opacity-100" : "opacity-0"} alt="" />
                </div>
                <span className='text__14'>Opt out of emails about latest product updates</span>
            </div>

            <div className="text-center">
                <NavLink to="/" className='inline-block cursor-pointer text-center font-medium text__16 text-white !py-[15px] bg-Mblack !border-Mblack bg-Mblack btnClass w-full'>Login</NavLink>

                <div className="my-3 relative">
                    <div className="absolute h-[1px] left-0 w-full top-1/2 -translate-y-1/2 bg-[#F5F5F5]"></div>
                    <div className='px-4 py-2 bg-white relative inline-block text__12 text-[#525252] relative z-[2]'>Or</div>
                </div>

                <div className="w-full flex justify-center">
                    <div
                        ref={googleButtonRef}
                        className="inline-block"
                    >
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login