import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import clx from "classnames"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot, faQuoteLeft } from "@fortawesome/pro-regular-svg-icons"
import { faStop } from "@fortawesome/pro-solid-svg-icons"

import { getDateTime } from "../getTime"

const Clock = ({ stores }) => {

    const [clock, setClock] = useState(null)
    const [now, setNow] = useState(getDateTime())

    useEffect(() => {

        setClock(
            setInterval(() => {
                setNow(getDateTime())
            }, 1000)
        )

        // get prayer times every 10 minutes
        let prayers = setInterval(() => {
            stores.prayers.fetch()
        }, 600000)

        return () => {
            clearInterval(clock)
            clearInterval(prayers)
        }

    }, [])

    return (
        <h5 className="text-gray-900 text-lg text-center leading-tight font-large py-2">
            {now}
        </h5>
    )
}

const Home = ({ stores }) => {

    return (
        <div className="flex justify-center">
            <div className="flex flex-col mt-6 md:flex-row md:max-w-xl rounded-lg bg-white  bg-opacity-80 shadow-lg">
                
                <div className="p-6 flex justify-center w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg">
                    <div className='self-center flex-col text-center'>
                        <h1 className='text-xl font-large'>
                            {stores.prayers.nextPrayer}
                        </h1>
                        <div>
                            {stores.prayers.items[stores.prayers.nextPrayer]}
                        </div>
                        <FontAwesomeIcon className='cursor-pointer' icon={faStop} size="2x" onClick={stores.config.stop} />
                    </div>
                </div>

                <div className="py-6 flex flex-col justify-center">
                    <div className='text-center'>
                        <FontAwesomeIcon className='mr-2' icon={faLocationDot} />
                        {stores.config.City}
                    </div>
                    <Clock stores={stores} />

                    <div className='p-3 flex flex-col justify-center'>
                        <FontAwesomeIcon icon={faQuoteLeft} />
                        
                        <div id="carouselExampleIndicators" className="carousel slide relative" data-bs-ride="carousel">
                            {/* <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide-to="0"
                                    className="active"
                                    aria-current="true"
                                    aria-label="Slide 1"
                                ></button>
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide-to="1"
                                    aria-label="Slide 2"
                                ></button>
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide-to="2"
                                    aria-label="Slide 3"
                                ></button>
                            </div> */}
                            <div className="carousel-inner relative w-full overflow-hidden">
                                <div className="carousel-item active float-left w-full">
                                    <p className="text-gray-700 text-base my-4">
                                        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                    </p>
                                    <p className="text-gray-600 text-xs">Last updated 3 mins ago</p>
                                </div>
                                <div className="carousel-item float-left w-full">
                                    <p className="text-gray-700 text-base my-4">
                                        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                    </p>
                                    <p className="text-gray-600 text-xs">Last updated 5 mins ago</p>
                                </div>
                                <div className="carousel-item float-left w-full">
                                    <p className="text-gray-700 text-base my-4">
                                        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                    </p>
                                    <p className="text-gray-600 text-xs">Last updated 13 mins ago</p>
                                </div>
                            </div>
                            <button
                                className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default inject("stores")(observer(Home))