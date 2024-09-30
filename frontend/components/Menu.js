"use client"
/**
 * Created by taushif on 08/01/2017.
 */
import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

//import 'tw-elements'
import clx from 'classnames'
import screenfull from "screenfull"
import { RefreshCw, Timer, CloudOff, Maximize2 } from "lucide-react"

import { errors, resetErrors } from "../stores/Prayers"

const NavLink = ({ children, to = "#", onClick }) => {

    const router = useRouter()

    const isActive = router.route === to

    return (
        <Link
            href={to}
            onClick={onClick}
            className={clx("px-3 py-2 rounded-md text-sm font-medium", {
                'bg-gray-900 text-white': isActive,
                'text-gray-300 hover:bg-gray-700 hover:text-white': !isActive
            })}
        >
            {children}
        </Link>
    )
}

const Menu = ({ }) => {

    const toggleSF = () => {
        
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    }

    const refresh = (e) => {
        e.preventDefault()

        window.location.reload()
    }

    return (
        <nav className="bg-gray-800">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-8 w-8" src="/img/icon.png" alt="Logo" />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/prayers">Gebedstijden</NavLink>
                                <NavLink to="/settings">Instellingen</NavLink>
                                <NavLink onClick={refresh}>
                                    <RefreshCw className="inline-block" />
                                </NavLink>
                                <NavLink to="/clock">
                                    <Timer className="inline-block" />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {errors.value >= 3 && (
                                <button
                                    type="button"
                                    onClick={resetErrors}
                                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                >
                                    <span className="sr-only">View fullscreen</span>
                                    <CloudOff />
                                </button>
                            )}

                            <div className="ml-3 relative">
                                <div>
                                    <button type="button" onClick={toggleSF} className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">View fullscreen</span>
                                        <Maximize2 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Menu