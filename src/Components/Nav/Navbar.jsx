import React from 'react'
import { Container } from 'react-bootstrap'
import { Fragment } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { LogoIcon } from '../Icon/Icon'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

const Navbar = () => {

    let location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const [ToogleMenuResponsive, setToogleMenuResponsive] = useState(false);
    const [navabarScroll, setnavabarScroll] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [hasApplication, setHasApplication] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState(null);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showProfileDropdown && !event.target.closest('.profile-dropdown')) {
                setShowProfileDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProfileDropdown]);

    const stickNavabr = () => {
        if (window.scrollY > 100) {
            setnavabarScroll(true)
        } else {
            setnavabarScroll(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', stickNavabr);
    }, [location])

    useEffect(() => {
        if (user) {
            checkApplicationStatus();
        }
    }, [user]);

    const checkApplicationStatus = async () => {
        if (!user) return;

        try {
            const { data, error } = await supabase
                .from('seller_applications')
                .select('status')
                .eq('user_id', user.id)
                .maybeSingle();

            if (data) {
                setHasApplication(true);
                setApplicationStatus(data.status);
            } else {
                setHasApplication(false);
                setApplicationStatus(null);
            }
        } catch (error) {
            console.error('Error checking application:', error);
        }
    };

    const handleLogout = () => {
        logout();
        setShowProfileDropdown(false);
        navigate('/');
    };

    return (
        <Fragment>

            <div className={"fixed h-full w-full bg-MsoftYellow z-[99] pt-[100px] menuMobile " + (ToogleMenuResponsive ? "active" : "")}>
                <Container className='h-full'>
                    <ul className='list-none p-0 m-0 flex items-center flex-wrap gap-4 w-full'>
                        <li className='w-full'>
                            <a href="/" onClick={() => setToogleMenuResponsive(!ToogleMenuResponsive)} className='text-body-xl-medium text-Mblack'>Home</a>
                        </li>
                        <li className='w-full'>
                            <a href="#how-it-works" onClick={() => setToogleMenuResponsive(!ToogleMenuResponsive)} className='text-body-xl-medium text-Mblack'>How it works</a>
                        </li>
                        <li className='w-full'>
                            <a href="#about" onClick={() => setToogleMenuResponsive(!ToogleMenuResponsive)} className='text-body-xl-medium text-Mblack'>About us</a>
                        </li>
                        <li className='w-full'>
                            <a href="mailto:hello@eatwithkinn.com" onClick={() => setToogleMenuResponsive(!ToogleMenuResponsive)} className='text-body-xl-medium text-Mblack'>Contact us</a>
                        </li>
                        {!isAuthenticated ? (
                            <>
                                <li className='w-full'>
                                    <NavLink to="/founding-sellers" onClick={() => setToogleMenuResponsive(!ToogleMenuResponsive)} className='btn-primary w-full text-center'>Become a Founding Seller</NavLink>
                                </li>
                                {/* Login button disabled for public release */}
                                {false && (
                                    <li className='w-full'>
                                        <NavLink to="/auth/login" onClick={() => setToogleMenuResponsive(!ToogleMenuResponsive)} className='btn-secondary w-full text-center'>Log in</NavLink>
                                    </li>
                                )}
                            </>
                        ) : (
                            <>
                                <li className='w-full'>
                                    <NavLink to="/cart" onClick={() => setToogleMenuResponsive(!ToogleMenuResponsive)} className='text-body-xl-medium text-Mblack'>Cart</NavLink>
                                </li>
                                <li className='w-full'>
                                    <NavLink to="/profile" onClick={() => setToogleMenuResponsive(!ToogleMenuResponsive)} className='text-body-xl-medium text-Mblack'>Profile</NavLink>
                                </li>
                                <li className='w-full'>
                                    <button onClick={() => { handleLogout(); setToogleMenuResponsive(!ToogleMenuResponsive); }} className='text-body-xl-medium text-Mblack text-left'>Log out</button>
                                </li>
                            </>
                        )}
                    </ul>
                </Container>
            </div>

            <div className={'fixed py-4 w-full z-[999] left-0 top-0 ' + (navabarScroll ? "bg-MsoftYellow" : ToogleMenuResponsive ? "bg-MsoftYellow" : "bg-transparent")}>
                <Container className='relative flex items-center'>


                    <NavLink to="/" className=''>
                        <div className="flex items-center gap-2">
                            <LogoIcon />
                            <span className={'font-Kalam text-body-xl-medium font-bold text-Mblack'}>Kinn</span>
                        </div>
                    </NavLink>


                    <ul className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 list-none p-0 m-0 hidden lg:flex items-center gap-6'>
                        <li>
                            <a href="/" className={'text-body-lg-medium ' + (navabarScroll ? "text-Mblack" : "text-Mblack")}>Home</a>
                        </li>
                        <li>
                            <a href="#how-it-works" className={'text-body-lg-medium ' + (navabarScroll ? "text-Mblack" : "text-Mblack")}>How it works</a>
                        </li>
                        <li>
                            <a href="#about" className={'text-body-lg-medium ' + (navabarScroll ? "text-Mblack" : "text-Mblack")}>About us</a>
                        </li>
                        <li>
                            <a href="mailto:hello@eatwithkinn.com" className={'text-body-lg-medium ' + (navabarScroll ? "text-Mblack" : "text-Mblack")}>Contact us</a>
                        </li>
                    </ul>


                    <div className="flex items-center ml-auto gap-3">
                        {!isAuthenticated ? (
                            <>
                                <div className="lg:inline-block hidden">
                                    <NavLink to="/founding-sellers" className='btn-primary'>Become a Founding Seller</NavLink>
                                </div>
                                {/* Login button disabled for public release */}
                                {false && (
                                    <div className="lg:inline-block hidden">
                                        <NavLink to="/auth/login" className='btn-secondary'>Log in</NavLink>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {/* Cart Icon */}
                                <NavLink to="/cart" className='lg:inline-block hidden relative'>
                                    <div className="w-[40px] h-[40px] rounded-full bg-white hover:bg-gray-100 flex items-center justify-center cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </div>
                                </NavLink>

                                {/* Profile Dropdown */}
                                <div className="relative lg:inline-block hidden profile-dropdown">
                                    <div
                                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                        className="w-[40px] h-[40px] rounded-full bg-Myellow flex items-center justify-center cursor-pointer font-semibold text-Mblack"
                                    >
                                        {user?.user_metadata?.full_name 
                                            ? user.user_metadata.full_name.charAt(0).toUpperCase() 
                                            : user?.email?.charAt(0).toUpperCase() || 'U'}
                                    </div>

                                    {/* Dropdown Menu */}
                                    {showProfileDropdown && (
                                        <div className="absolute right-0 mt-2 w-[240px] bg-white rounded-[16px] shadow-lg border border-gray-100 py-2 z-[1000]">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-body-md font-semibold text-Mblack">
                                                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                                                </p>
                                                <p className="text-body-sm text-gray-500">{user?.email}</p>
                                            </div>

                                            <NavLink to="/profile" onClick={() => setShowProfileDropdown(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-Mblack">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                </svg>
                                                <span className="text-body-md">Account</span>
                                            </NavLink>

                                            <NavLink to="/orders" onClick={() => setShowProfileDropdown(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-Mblack">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                                <span className="text-body-md">Orders</span>
                                            </NavLink>

                                            <NavLink to="/favourites" onClick={() => setShowProfileDropdown(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-Mblack">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>
                                                <span className="text-body-md">Favourites</span>
                                            </NavLink>

                                            <NavLink to="/settings" onClick={() => setShowProfileDropdown(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-Mblack">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                                </svg>
                                                <span className="text-body-md">Notification Settings</span>
                                            </NavLink>

                                            <NavLink to="/help" onClick={() => setShowProfileDropdown(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-Mblack">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                                                </svg>
                                                <span className="text-body-md">Help</span>
                                            </NavLink>

                                            {hasApplication ? (
                                                <NavLink
                                                    to={applicationStatus === 'approved' ? '/seller/onboarding' : '/application/pending'}
                                                    onClick={() => setShowProfileDropdown(false)}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#FFA98A] text-Mblack bg-[#FFA98A]"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                                    </svg>
                                                    <span className="text-body-md">
                                                        {applicationStatus === 'pending' && 'Application Status'}
                                                        {applicationStatus === 'approved' && 'Complete Onboarding'}
                                                        {applicationStatus === 'rejected' && 'Application Rejected'}
                                                    </span>
                                                </NavLink>
                                            ) : (
                                                <NavLink to="/open-your-shop-welcome" onClick={() => setShowProfileDropdown(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-[#FFA98A] text-Mblack bg-[#FFA98A]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                                                    </svg>
                                                    <span className="text-body-md">Become a seller</span>
                                                </NavLink>
                                            )}

                                            <div className="border-t border-gray-100 mt-2 pt-2">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-red-600 w-full text-left"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                                    </svg>
                                                    <span className="text-body-md">Log out</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        <div onClick={() => setToogleMenuResponsive(!ToogleMenuResponsive)} className={"relative px-1 py-1 barIcon w-[30px] h-[30px] cursor-pointer lg:hidden ml-auto " + (ToogleMenuResponsive ? "active" : "")}>
                            <div className={(navabarScroll ? "!bg-Mblack" : ToogleMenuResponsive ? "!bg-Mblack" : "!bg-Mblack")}></div>
                            <div className={(navabarScroll ? "!bg-Mblack" : ToogleMenuResponsive ? "!bg-Mblack" : "!bg-Mblack")}></div>
                            <div className={(navabarScroll ? "!bg-Mblack" : ToogleMenuResponsive ? "!bg-Mblack" : "!bg-Mblack")}></div>
                        </div>
                    </div>
                </Container>
            </div>
        </Fragment>
    )
}

export default Navbar