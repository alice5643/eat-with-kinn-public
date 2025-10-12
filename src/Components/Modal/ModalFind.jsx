import React, { Fragment, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { SearchIcon } from '../Icon/Icon'

const ModalFind = ({ show, handleClose }) => {
    const navigate = useNavigate()
    const [address, setAddress] = useState('')

    const handleSearch = () => {
        if (address.trim()) {
            handleClose()
            navigate('/search')
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <Fragment>
            <Modal size={"md"} className='modalSearch' show={show} onHide={() => handleClose()} centered>
                <Modal.Body className='bg-[#F8F8F8] py-8 px-4 shadow-[40px_40px_120px_0px_#2E2F3A0A] !border-none rounded-[16px]'>
                    <h3 className="text-center font-semibold text__24 mb-6">Choose a delivery address</h3>
                    <div className="mx-auto max-w-[566px] flex items-center pl-[16px] pr-[4px] py-[4px] rounded-full bg-white border border-solid !border-white gap-2">
                        <div className="flex-shrink-0">
                            <SearchIcon color={"#A3A3A3"} />
                        </div>
                        <input
                            type="text"
                            className="w-full bg-transparent outline-none shadow-none text__14 placeholder:text-[#A3A3A3]"
                            placeholder="Enter address ..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            onClick={handleSearch}
                            className="inline-block cursor-pointer text-center font-semibold text__14 text-Mblack bg-Mblack !py-[10px] sm:!py-[15px] !px-[20px] sm:!px-[28px] !border-Mblack btnClass flex-shrink-0 text-white hover:bg-gray-800 transition-colors"
                        >
                            Find Now
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default ModalFind