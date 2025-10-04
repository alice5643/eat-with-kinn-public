import React from 'react'
import { Fragment } from 'react'
import { LogoIcon } from '../../Components/Icon/Icon'
import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'


const Login = () => {
    const [tooglePassword, settooglePassword] = useState(true)

    const { signInWithGoogle, signInWithPassword, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    // Phone login state
    const [usePhone, setUsePhone] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isSendingOtp, setIsSendingOtp] = useState(false)
    const [otpMessage, setOtpMessage] = useState('')

    // Email/password login state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [loginError, setLoginError] = useState('')

    useEffect(() => {
        // If already authenticated and there's a redirect, go there
        if (isAuthenticated) {
            const redirect = searchParams.get('redirect')
            if (redirect) {
                navigate(redirect)
            } else {
                navigate('/')
            }
        }
    }, [isAuthenticated, navigate, searchParams])

    const handleGoogleSignIn = async () => {
        const redirect = searchParams.get('redirect')
        const { error } = await signInWithGoogle(redirect);
        if (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    const toE164Uk = (value) => {
        if (!value) return null;
        let v = value.replace(/\s+/g, '');
        v = v.replace(/[^+0-9]/g, '');
        if (v.startsWith('07')) return '+44' + v.slice(1);
        if (v.startsWith('44')) return '+' + v;
        if (v.startsWith('+44')) return v;
        return null;
    };

    const isValidUKPhone = (value) => {
        const e164 = toE164Uk(value);
        if (!e164) return false;
        return /^\+447\d{9}$/.test(e164);
    };

    const handleSendPhoneOtp = async () => {
        setOtpMessage('')
        const e164 = toE164Uk(phoneNumber)
        if (!isValidUKPhone(phoneNumber)) {
            setOtpMessage('Please enter a valid UK phone number (e.g. +447XXXXXXXXX or 07XXXXXXXXX).')
            return
        }
        setIsSendingOtp(true)
        try {
            const { error } = await supabase.auth.signInWithOtp({ phone: e164 })
            if (error) {
                console.error('OTP error', error)
                setOtpMessage('Failed to send code. ' + (error.message || 'Please try again later.'))
            } else {
                setOtpMessage('A one-time code has been sent to your phone. Follow the SMS to complete sign in.')
            }
        } catch (err) {
            console.error(err)
            setOtpMessage('Unexpected error sending code.')
        } finally {
            setIsSendingOtp(false)
        }
    }

    const handleEmailLogin = async (e) => {
        e.preventDefault()
        setLoginError('')
        
        if (!email || !password) {
            setLoginError('Please enter both email and password.')
            return
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setLoginError('Please enter a valid email address.')
            return
        }
        
        setIsLoggingIn(true)
        try {
            const { data, error } = await signInWithPassword(email, password)
            
            if (error) {
                console.error('Login error:', error)
                setLoginError(error.message || 'Login failed. Please try again.')
            } else {
                // Success - the AuthContext will handle the redirect automatically
                console.log('Login successful:', data)
            }
        } catch (err) {
            console.error('Unexpected login error:', err)
            setLoginError('An unexpected error occurred. Please try again.')
        } finally {
            setIsLoggingIn(false)
        }
    }

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

            <div className="mb-4 text-sm text-center">
                <button onClick={() => setUsePhone(false)} className={`px-3 py-2 ${!usePhone ? 'font-semibold' : 'text-gray-500'}`}>Log in with email</button>
                <span className="mx-2 text-gray-300">|</span>
                <button onClick={() => setUsePhone(true)} className={`px-3 py-2 ${usePhone ? 'font-semibold' : 'text-gray-500'}`}>Log in with phone</button>
            </div>

            {!usePhone ? (
                <>
                    <Form.Group className="mb-3" controlId="login-email-unique">
                        <Form.Label className='font-normal text__14 text-[#A3A3A3]'>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="e.g sanandreas@gmail.com"
                            className='font-medium text__14 bg-[#FAFAFA] h-[54px] rounded-[20px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="login-password-unique">
                        <Form.Label className='font-normal text__14 text-[#A3A3A3]'>Password</Form.Label>
                        <div className="relative">
                            <Form.Control
                                type={tooglePassword ? "password" : "text"}
                                placeholder="Must be at least 8 character"
                                className='font-medium text__14 bg-[#FAFAFA] h-[54px] rounded-[20px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <img onClick={() => settooglePassword(!tooglePassword)} src="/images/eye-slash.svg" className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-4' alt="" />
                        </div>
                    </Form.Group>

                    <div className="text-right mb-3">
                        <NavLink to="/auth/forgot-password" className='font-medium text__14 text-Myellow '>Forgot Password?</NavLink>
                    </div>

                    {loginError && <p className='text-red-500 text-center mb-4'>{loginError}</p>}

                    <div className="text-center">
                        <button
                            onClick={handleEmailLogin}
                            className='inline-block cursor-pointer text-center font-medium text__16 text-white !py-[15px] bg-Mblack !border-Mblack bg-Mblack btnClass w-full'
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? 'Logging in...' : 'Login'}
                        </button>

                        <div className="my-3 relative">
                            <div className="absolute h-[1px] left-0 w-full top-1/2 -translate-y-1/2 bg-[#F5F5F5]"></div>
                            <div className='px-4 py-2 bg-white relative inline-block text__12 text-[#525252] relative z-[2]'>Or</div>
                        </div>

                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-full py-3 px-6 hover:bg-gray-50 transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.8055 10.2292C19.8055 9.55141 19.7501 8.86697 19.6316 8.19818H10.2V12.0489H15.6014C15.3775 13.2911 14.6573 14.3898 13.6059 15.0876V17.5866H16.8264C18.7135 15.8449 19.8055 13.2722 19.8055 10.2292Z" fill="#4285F4"/>
                                <path d="M10.2 20C12.9565 20 15.2705 19.1045 16.8264 17.5866L13.6059 15.0876C12.7092 15.6973 11.5536 16.0429 10.2 16.0429C7.5422 16.0429 5.28955 14.2828 4.49369 11.9169H1.17893V14.4921C2.7613 17.6391 6.30618 20 10.2 20Z" fill="#34A853"/>
                                <path d="M4.49369 11.9169C4.0452 10.6747 4.0452 9.32887 4.49369 8.08661V5.51147H1.17893C-0.192985 8.23507 -0.192985 11.7684 1.17893 14.4921L4.49369 11.9169Z" fill="#FBBC04"/>
                                <path d="M10.2 3.95707C11.6291 3.93574 13.0093 4.47506 14.0401 5.45837L16.8949 2.60276C15.1858 0.990492 12.7463 0.0949867 10.2 0.122615C6.30618 0.122615 2.7613 2.48344 1.17893 5.51147L4.49369 8.08661C5.28955 5.72078 7.5422 3.95707 10.2 3.95707Z" fill="#EA4335"/>
                            </svg>
                            <span className='font-medium text__14 text-Mblack'>Continue with Google</span>
                        </button>
                    </div>
                </>
            ) : (
                <div>
                    <label className='font-normal text__14 text-[#A3A3A3]'>Phone number</label>
                    <div className='flex gap-3'>
                        <input
                            type='tel'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder='+44 7XXX XXXXXX'
                            className='w-full px-4 h-[54px] rounded-[20px] text-Mblack bg-[#FAFAFA] border border-solid !border-[#F5F5F5] outline-none focus:!border-[#FEC51C] placeholder:text-[#A3A3A3] text-body-md'
                        />
                        <button onClick={handleSendPhoneOtp} className='inline-block px-4 py-3 rounded-[20px] bg-Mblack text-white'>
                            {isSendingOtp ? 'Sending...' : 'Send code'}
                        </button>
                    </div>
                    {otpMessage && <p className='text-body-sm text-red-600 mt-2'>{otpMessage}</p>}
                    <p className='text-body-sm text-gray-500 mt-2'>We will send a one-time code to your phone to complete sign in.</p>
                </div>
            )}
        </Fragment>
    )
}

export default Login