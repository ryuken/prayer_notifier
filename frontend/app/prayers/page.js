"use client"

import React, { Suspense } from 'react'

import Clock from "@/components/Clock"

import { nextPrayer, items as prayers } from "@/stores/Prayers"
import { Enabled, update } from "@/stores/Config"

import clx from "classnames"

import { Circle, CircleCheck } from "lucide-react"

const Prayer = ({ item }) => {

    let highlight = false
    let active = false

    if (item === nextPrayer.value)
        highlight = true

    if (!("undefined" !== typeof Enabled.value && -1 === Enabled.value.indexOf(item)))
        active = true

    // TODO move update logic to store
    const togglePrayer = (prayer) => {

        if ("undefined" !== typeof Enabled.value && false === Enabled.value.includes(prayer)) {
            Enabled.value.push(prayer)
        }
        else {
            Enabled.value.splice(Enabled.value.indexOf(prayer), 1)
        }

        update()
    }

    return (
        <li className={clx("px-6 py-2 border-b border-gray-400 w-full rounded-t-lg", { highlight })} onClick={() => togglePrayer(item)}>
            <div className='flex'>
                <div className="w-1/2 flex">
                    {active ? <CircleCheck className={clx("mr-2", [active ? "active" : "inactive"])} /> : <Circle className={clx("mr-2", [active ? "active" : "inactive"])} />}
                    {item}
                </div>
                <div className="w-1/2 text-right">{prayers.value[item] && prayers.value[item]}</div>
            </div>
        </li>
    )
}

const Prayers = () => {

    return (
        <div className="flex justify-center">
            <div className="block mt-6 rounded-lg shadow-lg bg-white bg-opacity-70">
                <Suspense key={new Date().getTime()}>
                    <Clock />
                </Suspense>

                <div className="flex justify-center">
                    <ul className="rounded-b-lg border border-gray-400 w-96 text-gray-900">
                        <Prayer item="Fajr" />
                        <Prayer item="Sunrise" />
                        <Prayer item="Dhuhr" />
                        <Prayer item="Asr" />
                        <Prayer item="Maghrib" />
                        <Prayer item="Isha" />
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Prayers