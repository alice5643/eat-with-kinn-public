import React, { Fragment, useState } from 'react'

const SortAction = () => {
    const [toogle, settoogle] = useState(false)
    const [select, setselect] = useState("Recommendation")
    return (
        <Fragment>
            <div className="px-4 py-3 rounded-full border !border-[#E5E5E5] relative w-[190px]">
                <div className="flex justify-between items-center gap-2 cursor-pointer" onClick={() => settoogle(!toogle)}>
                    <h5 className='font-medium text__14'>{select}</h5>
                    <img src={window.origin + "/images/arrow-down.svg"} className={'transition-all duration-300 ' + (toogle ? "-rotate-[180deg]" : "")} alt="" />
                </div>
                <div className={"absolute left-0 top-[110%] bg-white w-full px-4 rounded-xl overflow-hidden transition-all duration-300 " + (toogle ? "max-h-screen py-4" : "max-h-0 py-0")}>
                    <div className="flex items-center flex-wrap gap-3">
                        <div className="w-full text__12 cursor-pointer" onClick={() => {
                            settoogle(!toogle)
                            setselect("Recommendation")
                        }
                        }>
                            Recommendation
                        </div>
                        <div className="w-full text__12 cursor-pointer" onClick={() => {
                            settoogle(!toogle)
                            setselect("Price")
                        }
                        }>
                            Price
                        </div>
                        <div className="w-full text__12 cursor-pointer" onClick={() => {
                            settoogle(!toogle)
                            setselect("Category")
                        }}>
                            Category
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SortAction