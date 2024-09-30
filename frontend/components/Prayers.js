import React, { useState, useEffect } from 'react'

import { items as prayers, nextPrayer } from "@/stores/Prayers"
import { Enabled, update } from "@/stores/Config"

const Prayer = ({ item }) => {

    let classes = "row prayer-item center-xs"
    let active = false

    if(item === nextPrayer.value)
        classes += " highlight"

    if("undefined" !== typeof Enabled && -1 === Enabled.indexOf(item))
        classes += " inactive"
    else {
        classes += " active"
        active = true
    }

    const togglePrayer = (prayer) => {

        if("undefined" !== typeof Enabled.value && -1 === Enabled.value.indexOf(prayer)) {
            Enabled.value.push(prayer)
        }
        else {
            Enabled.value.splice(Enabled.value.indexOf(prayer), 1)
        }

        update()
    }

    return (
        <div className={classes} onClick={togglePrayer.bind(null, item)}>
            <div className="col-xs-6">
                <span className={"fa fa-circle " + (active ? 'active' : 'inactive')} style={{ marginRight: "10px" }} />
                {item}
            </div>
            <div className="col-xs-6 text-center">{prayers.value[item] && prayers.value[item]}</div>
        </div>
    )
}

const Prayers = () => {

    return (
        <div className="container">
            <Clock />

            <Prayer item="Fajr" />
            <Prayer item="Sunrise" />
            <Prayer item="Dhuhr" />
            <Prayer item="Asr" />
            <Prayer item="Maghrib" />
            <Prayer item="Isha" />
            <Prayer item="Midnight" />
        </div>
    )
}

export default Prayers