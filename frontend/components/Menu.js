/**
 * Created by taushif on 08/01/2017.
 */
import React from 'react'

import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import 'tw-elements'
import clx from 'classnames'

import screenfull from "screenfull"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowsRotate, faTimer, faArrowsMaximize, faCloudExclamation } from "@fortawesome/pro-regular-svg-icons"

const NavLink = ({ children, to = "#", onClick }) => {

    const router = useRouter()

    const isActive = router.route === to

    return (
        <a
            href={to}
            onClick={onClick}
            className={clx("px-3 py-2 rounded-md text-sm font-medium", {
                'bg-gray-900 text-white': isActive,
                'text-gray-300 hover:bg-gray-700 hover:text-white': !isActive
            })}
        >
            {children}
        </a>
    )
}

const Menu = ({ stores }) => {

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
                                    <FontAwesomeIcon icon={faArrowsRotate} />
                                </NavLink>
                                <NavLink to="/clock">
                                    <FontAwesomeIcon icon={faTimer} />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {stores.prayers.errors === 3 && (
                                 <button
                                    type="button"
                                    onClick={stores.prayers.resetErrors}
                                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                >
                                    <span className="sr-only">View fullscreen</span>
                                    <FontAwesomeIcon icon={faCloudExclamation} />
                                </button>
                            )}

                            <div className="ml-3 relative">
                                <div>
                                    <button type="button" onClick={toggleSF} className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">View fullscreen</span>
                                        <FontAwesomeIcon icon={faArrowsMaximize} />
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

export default inject("stores")(observer(Menu))