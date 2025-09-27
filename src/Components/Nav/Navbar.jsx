import React from 'react'
import { Container } from 'react-bootstrap'
import { Fragment } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { LogoIcon } from '../Icon/Icon'

const Navbar = () => {

    let location = useLocation();
    const [ToogleMenuResponsive, setToogleMenuResponsive] = useState(false);
    const [navabarScroll, setnavabarScroll] = useState(false)

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
                        <li className='w-full'>
                            <NavLink to="/founding-sellers" onClick={() => setToogleMenuResponsive(!ToogleMenuResponsive)} className='btn-primary w-full text-center'>Become a Founding Seller</NavLink>
                        </li>
                        <li className='w-full'>
                            <NavLink to="/auth/login" onClick={() => setToogleMenuResponsive(!ToogleMenuResponsive)} className='btn-secondary w-full text-center'>Log in</NavLink>
                        </li>
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
                        <div className="lg:inline-block hidden">
                            <NavLink to="/founding-sellers" className='btn-primary'>Become a Founding Seller</NavLink>
                        </div>
                        <div className="lg:inline-block hidden">
                            <NavLink to="/auth/login" className='btn-secondary'>Log in</NavLink>
                        </div>

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
