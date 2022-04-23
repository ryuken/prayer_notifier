import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import clx from "classnames"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faCircleDot } from "@fortawesome/pro-regular-svg-icons"

import { getDateTime } from "../getTime"

const Prayer = observer(({ stores, item }) => {

    let highlight = false
    let active = false

    if(item === stores.prayers.nextPrayer)
        highlight = true

    if(!("undefined" !== typeof stores.config.Enabled && -1 === stores.config.Enabled.indexOf(item)))
        active = true

    // TODO move update logic to store
    const togglePrayer = (prayer) => {

        if("undefined" !== typeof stores.config.Enabled && -1 === stores.config.Enabled.indexOf(prayer)) {
            stores.config.Enabled.push(prayer)
        }
        else {
            stores.config.Enabled.splice(stores.config.Enabled.indexOf(prayer), 1)
        }

        stores.config.update()
    }

    return (
        <li className={clx("px-6 py-2 border-b border-gray-400 w-full rounded-t-lg", { highlight })} onClick={togglePrayer.bind(null, item)}>
            <div className='flex'>
                <div className="w-1/2">
                    <FontAwesomeIcon className={clx("mr-2", [active ? "active" : "inactive"])} icon={active ? faCircleDot : faCircle } />
                    {item}
                </div>
                <div className="w-1/2 text-right">{stores.prayers.items[item] && stores.prayers.items[item]}</div>
            </div>
        </li>
    )
})

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
        <h5 className="text-gray-900 text-xl text-center leading-tight font-large py-2">
            {stores.config.City} - {now}
        </h5>
    )
}

const Home = ({ stores }) => {

    return (
        <div className="flex justify-center">
            <div className="block mt-6 rounded-lg shadow-lg bg-white bg-opacity-70">
                
                <Clock stores={stores} />

                <div className="flex justify-center">
                    <ul className="rounded-b-lg border border-gray-400 w-96 text-gray-900">
                        <Prayer stores={stores} item="Fajr" />
                        <Prayer stores={stores} item="Sunrise" />
                        <Prayer stores={stores} item="Dhuhr" />
                        <Prayer stores={stores} item="Asr" />
                        <Prayer stores={stores} item="Maghrib" />
                        <Prayer stores={stores} item="Isha" />
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default inject("stores")(observer(Home))