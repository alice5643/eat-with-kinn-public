import React from 'react'
import { Fragment } from 'react'
import { LogoIcon } from '../../Components/Icon/Icon'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

const Signup = () => {
    const [tooglePassword, settooglePassword] = useState(true)
    const [toogleChecklist, settoogleChecklist] = useState(false)
    const { signInWithGoogle, signUpWithPassword } = useAuth()

    // Email/password signup state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [signupError, setSignupError] = useState('')
    const [signupSuccess, setSignupSuccess] = useState('')

    const handleGoogleSignUp = async () => {
        const { error } = await signInWithGoogle();
        if (error) {
            console.error('Error signing up with Google:', error);
        }
    };

    const handleEmailSignup = async (e) => {
        e.preventDefault()
        setSignupError('')
        setSignupSuccess('')
        
        if (!email || !password) {
            setSignupError('Please enter both email and password.')
            return
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setSignupError('Please enter a valid email address.')
            return
        }
        
        if (password.length < 8) {
            setSignupError('Password must be at least 8 characters.')
            return
        }
        
        setIsSigningUp(true)
        try {
            const { data, error } = await signUpWithPassword(email, password)
            
            if (error) {
                console.error('Signup error:', error)
                setSignupError(error.message || 'Signup failed. Please try again.')
            } else {
                console.log('Signup successful:', data)
                setSignupSuccess('Account created successfully! Please check your email to verify your account.')
            }
        } catch (err) {
            console.error('Unexpected signup error:', err)
            setSignupError('An unexpected error occurred. Please try again.')
        } finally {
            setIsSigningUp(false)
        }
    }

    return (
        <Fragment>
            <div className="text-center mb-10">
                <div className="flex items-center gap-2 mb-3 justify-center">
                    <LogoIcon color='#FEC51C' />
                    <span className='font-medium text__20 text-Mblack'>Kinn</span>
                </div>
                <h4 className='font-medium text__32 mb-2'>Create an account to continue</h4>
                <p>It's free to create an account and get your event live. <br className='hidden xl:block' />
                    Already have an account? <NavLink to="/auth/login" className='text-Myellow'>Log in</NavLink></p>
            </div>


            <Form.Group className="mb-3" controlId="signup-email">
                        <Form.Label className='font-normal text__14 text-[#A3A3A3]'>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="e.g sanandreas@gmail.com" 
                            className='font-medium text__14 bg-[#FAFAFA] h-[54px] rounded-[20px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="signup-password">
                        <Form.Label className='font-normal text__14 text-[#A3A3A3]'>Password</Form.Label>
                        <div className="relative">
                            <Form.Control 
                                type={tooglePassword ? "password" : "text"} 
                                placeholder="Must be at least 8 character" 
                                className='font-medium text__14 bg-[#FAFAFA] h-[54px] rounded-[20px] px-3 outline-none shadow-none focus:outline-none focus:shadow-none border-[#F5F5F5] focus:border-[#F5F5F5] focus:bg-[#FAFAFA]'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                aria-label={tooglePassword ? 'Show password' : 'Hide password'}
                                onClick={() => settooglePassword(!tooglePassword)}
                                className='absolute top-1/2 -translate-y-1/2 right-4 text-Mgray hover:text-Mblack transition'
                            >
                                {tooglePassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.5a10.523 10.523 0 01-4.293 5.818M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228L14.122 14.12m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.879" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.334 4.5 12 4.5c4.666 0 8.577 3.01 9.964 7.178.07.207.07.437 0 .644C20.577 16.49 16.666 19.5 12 19.5c-4.666 0-8.577-3.01-9.964-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </Form.Group>

                    <div className="mb-6 flex items-center gap-2 cursor-pointer" onClick={() => settoogleChecklist(!toogleChecklist)}>
                        <div className={"flex items-center justify-center w-[24px] h-[24px] rounded-full border border-solid  " + (toogleChecklist ? "border-Myellow bg-Myellow bg-Myellow" : "border-[#A3A3A3]")}>
                            <img src="/images/check (3).svg" className={toogleChecklist ? "opacity-100" : "opacity-0"} alt="" />
                        </div>
                        <span className='text__14'>Opt out of emails about latest product updates</span>
                    </div>

                    {signupError && <p className='text-red-500 text-center mb-4'>{signupError}</p>}
                    {signupSuccess && <p className='text-green-500 text-center mb-4'>{signupSuccess}</p>}

                    <div className="text-center">
                        <button 
                            onClick={handleEmailSignup}
                            className='inline-block cursor-pointer text-center font-medium text__16 text-white !py-[15px] bg-Mblack text-Mblack !border-Mblack text-Mblack btnClass w-full'
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? 'Creating Account...' : 'Sign Up'}
                        </button>

                        <div className="my-3 relative">
                            <div className="absolute h-[1px] left-0 w-full top-1/2 -translate-y-1/2 bg-[#F5F5F5]"></div>
                            <div className='px-4 py-2 bg-white relative inline-block text__12 text-[#525252] relative z-[2]'>Or</div>
                        </div>

                        <button
                            onClick={handleGoogleSignUp}
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
        </Fragment>
    )
}

export default Signup
