import React from 'react'
import { Modal } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const ModalSuccess = ({ show, handleClose }) => {
    return (
        <Modal size={"md"} className='modalSearch' show={show} onHide={() => handleClose()} centered>
            <Modal.Body className='bg-white py-8 px-4 shadow-[40px_40px_120px_0px_#2E2F3A0A] !border-none rounded-[16px]'>
                <div className="text-center">
                    <img src={window.location.origin + "/images/Illustration.svg"} className='mx-auto -mb-[1rem]' alt="" />

                    <h3 className='font-medium text__32 mb-2 relative z-2'>Payment Success!</h3>
                    <p className='text__16 text-Mgray relative z-2 mb-6'>Thanks for your order, the order confirmation has been sent to customer@gmail.com</p>

                    <NavLink to="/" className={'cursor-pointer inline-block cursor-pointer font-medium text__14 text-[#171717] !border-[#171717] btnClass hover:bg-[#171717] hover:text-white relative z-2'}>Back to Home</NavLink>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalSuccess