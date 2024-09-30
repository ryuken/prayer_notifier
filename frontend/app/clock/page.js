"use client"

import React, { Suspense, useEffect, useState } from 'react'
import { getDateTime } from "../../getTime"

const Clock = () => {

    const [time, setTime] = useState(getDateTime())

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getDateTime())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex justify-center p-10">
                <div className="block mt-6 p-10 rounded-lg shadow-lg bg-white bg-opacity-50 text-center">
                    <Suspense>
                        <h5 className="text-gray-900 text-xl leading-tight font-large mb-2" style={{ fontSize: "8em" }}>
                            {time}
                        </h5>
                    </Suspense>
                </div>
            </div>
    )
}

export default Clock