import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import { getDateTime } from "../getTime"

const Prayer = observer(({ stores, item }) => {

    let classes = "row prayer-item center-xs"
    let active = false

    if(item === stores.prayers.nextPrayer)
        classes += " highlight"

    if("undefined" !== typeof stores.config.Enabled && -1 === stores.config.Enabled.indexOf(item))
        classes += " inactive"
    else {
        classes += " active"
        active = true
    }

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
        <div className={classes} onClick={togglePrayer.bind(null, item)}>
            <div className="col-xs-6">
                <span className={"fa fa-circle " + (active ? 'active' : 'inactive')} style={{ marginRight: "10px" }} />
                {item}
            </div>
            <div className="col-xs-6 text-center">{stores.prayers.items[item] && stores.prayers.items[item]}</div>
        </div>
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
        setInterval(() => {
            stores.prayers.fetch()
        }, 600000)

        return () => clearInterval(clock)

    }, [])

    return (
        <div className="row">
            <div className="col-xs-2">
                <img src="img/mosque.png" style={{ width: "50px", height: "50px" }} />
            </div>
            <div className="col-xs-10 text-center">
                <h2 className="no-margin" style={{ marginBottom : "10px", marginTop : "10px" }}>
                    {stores.config.City} - {now}
                </h2>
            </div>
        </div>
    )
}

const Home = ({ stores }) => {

    return (
        <div className="container">
            <Clock stores={stores} />

            <Prayer stores={stores} item="Fajr" />
            <Prayer stores={stores} item="Sunrise" />
            <Prayer stores={stores} item="Dhuhr" />
            <Prayer stores={stores} item="Asr" />
            <Prayer stores={stores} item="Maghrib" />
            <Prayer stores={stores} item="Isha" />
            <Prayer stores={stores} item="Midnight" />
        </div>
    )
}

export default inject("stores")(observer(Home))