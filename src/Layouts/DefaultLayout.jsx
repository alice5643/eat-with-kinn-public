import React, { Fragment } from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../shared/components/Nav/Navbar'
import Footer from '../shared/components/Nav/Footer'

const DefaultLayout = () => {
    return (
        <Fragment>
            <div className='w-full overflow-hidden'>
                <Navbar />

                <div className="mt-[88px] lg:mt-[98px] ">
                    <Outlet />
                </div>

                <Footer />
            </div>
        </Fragment>
    )
}

export default DefaultLayout
