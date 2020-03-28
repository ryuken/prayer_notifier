import React from 'react'
import {inject, observer} from 'mobx-react'

import { getDateTime } from "../getTime"

@inject("stores") @observer
export default class Home extends React.Component {

    state = {
        clock : null,
        now : getDateTime()
    }

    componentWillMount() {
        this.setState({
            clock : setInterval(() => {
                this.setState({ now: getDateTime() })
            }, 1000)
        })

        // get prayer times every 10 minutes
        setInterval(() => {
            this.props.stores.prayers.fetch()
        }, 600000)
    }

    componentWillUnmount() {
        clearInterval(this.state.clock)
    }

    togglePrayer = (e) => {
        const {stores} = this.props
        const el = e.target
        let prayer = el.dataset.prayer

        if("undefined" === typeof prayer) {
            prayer = el.parentNode.dataset.prayer
        }

        if("undefined" !== typeof stores.config.Enabled && -1 === stores.config.Enabled.indexOf(prayer)) {
            stores.config.Enabled.push(prayer)
        }
        else {
            stores.config.Enabled.splice(stores.config.Enabled.indexOf(prayer), 1)
        }

        stores.config.update()
    }

    renderPrayer(item) {

        const {stores} = this.props

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

        if(stores.prayers.items[item])
            return (
                <div className={classes} onClick={this.togglePrayer} data-prayer={item}>
                    <div className="col-xs-6">
                        <span className={"fa fa-circle " + (active ? 'active' : 'inactive')} style={{ marginRight: "10px" }} />
                        {item}
                    </div>
                    <div className="col-xs-6 text-center">{stores.prayers.items[item]}</div>
                </div>
            )
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-2">
                        <img src="img/mosque.png" style={{ width: "50px", height: "50px" }} />
                    </div>
                    <div className="col-xs-10 text-center">
                        <h2 className="no-margin" style={{ marginBottom : "10px", marginTop : "10px" }}>
                            {this.props.stores.config.City} - {this.state.now}
                        </h2>
                    </div>
                </div>

                {this.renderPrayer("Fajr")}
                {this.renderPrayer("Sunrise")}
                {this.renderPrayer("Dhuhr")}
                {this.renderPrayer("Asr")}
                {this.renderPrayer("Maghrib")}
                {this.renderPrayer("Isha")}
                {this.renderPrayer("Midnight")}
            </div>
        )
    }
}