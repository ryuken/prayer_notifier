"use client"

import { useState, useEffect } from 'react'

import { fetchPrayers } from "../stores/Prayers"

import { getDateTime } from "../getTime"

const Clock = () => {

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
            fetchPrayers()
        }, 600000)

        return () => {
            clearInterval(clock)
            clearInterval(prayers)
        }

    }, [])

    return (
        <h5 className="text-gray-900 text-xl text-center leading-tight font-large py-2">
            {now}
        </h5>
    )
}

export default Clock