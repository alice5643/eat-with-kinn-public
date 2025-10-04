import React from 'react'
import { useState } from 'react';
import { Fragment } from 'react'
import { ModalStepStarted } from '../Modal/Modal';

export const BtnStarted = ({ position, satatusModal, navabarScroll, ToogleMenuResponsive }) => {
    const [StatusModal, setStatusModal] = useState(satatusModal ? satatusModal : "Login");
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true);
    };

    console.log("data " + satatusModal)
    return (
        <Fragment>
            <ModalStepStarted show={show} handleClose={() => handleClose()} handleShow={() => handleShow()} StatusModal={StatusModal} setStatusModal={(e) => setStatusModal(e)} />
            <div onClick={() => {
                setShow(true);
                setStatusModal(satatusModal);
            }} className={'cursor-pointer'}>
                {
                    position == "Checkout" ?
                        <div className="inline-block w-full text-center mb-4">
                            <div className={'inline-block w-full text-center cursor-pointer font-medium text__16 btnClass !py-[16px] text-white bg-Myellow !border-Myellow hover:bg-Myellow hover:!text-white'}>Checkout</div>
                        </div>
                        : position == "Login" ? <div className="inline-block">
                            <div className={'inline-block cursor-pointer font-medium text__14 btnClass !border-none  ' + (navabarScroll ? "text-white text-white hover:!text-white" : ToogleMenuResponsive ? "text-white text-white hover:!text-white" : "text-Myellow text-Myellow hover:!text-Myellow")}>Login</div>
                        </div> : position == "Register" ? <div className="inline-block">
                            <div className={'inline-block cursor-pointer font-medium text__14 btnClass !px-[32px]  ' + (navabarScroll ? "text-white !border-white hover:bg-white text-white hover:!text-Myellow" : ToogleMenuResponsive ? "text-white !border-white hover:bg-white text-white hover:!text-Myellow" : "text-Myellow !border-Myellow hover:bg-Myellow text-Myellow hover:!text-white")}>Join Us</div>
                        </div> : position == "join now" ? <a href='#!' className="inline-block">
                            <div className={'inline-block cursor-pointer font-medium text__14 btnClass !px-[32px]  !border-Myellow bg-Myellow text-white'}>Join Now</div>
                        </a> : ""
                }
            </div>
        </Fragment>
    )
}