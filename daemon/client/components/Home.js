import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import {update_config} from '../actions/config'

class Home extends React.Component {

    renderDate() {
        const {prayers} = this.props

        if(prayers.Date) {
            return moment(prayers.Date, "YYYY-M-D").format("DD-MM-YYYY")
        }
    }

    togglePrayer = (e) => {
        const {dispatch, config} = this.props
        const el = e.target
        let prayer = el.dataset.prayer

        if("undefined" === typeof prayer) {
            prayer = el.parentNode.dataset.prayer
        }

        if("undefined" !== typeof config.Enabled && -1 == config.Enabled.indexOf(prayer)) {
            config.Enabled.push(prayer)
        }
        else {
            config.Enabled.splice(config.Enabled.indexOf(prayer), 1)
        }

        dispatch(update_config(config))
    }

    renderPrayer(item) {

        const {prayers, nextPrayer, config} = this.props

        let classes = "row prayer-item center-xs"

        if(item == nextPrayer)
            classes += " highlight"

        if("undefined" !== typeof config.Enabled && -1 == config.Enabled.indexOf(item))
            classes += " inactive"
        else
            classes += " active"

        if(prayers[item])
            return (
                <div className={classes} onClick={this.togglePrayer} data-prayer={item}>
                    <div className="col-xs-6">{item}</div>
                    <div className="col-xs-6 text-center">{prayers[item]}</div>
                </div>
            )
    }

    render() {

        const {prayers} = this.props

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-2">
                        <img src="/img/mosque.png" style={{ width: "50px", height: "50px" }} />
                    </div>
                    <div className="col-xs-10 text-center">
                        <h2 className="no-margin"
                            style={{ marginBottom : "10px", marginTop : "10px" }}
                        >
                            {this.renderDate()}
                        </h2>
                    </div>
                </div>

                {this.renderPrayer("Fajr")}
                {this.renderPrayer("Sunrise")}
                {this.renderPrayer("Dhuhr")}
                {this.renderPrayer("Asr")}
                {this.renderPrayer("Maghrib")}
                {this.renderPrayer("Isha")}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        prayers : state.app.prayers,
        nextPrayer : state.app.nextPrayer,
        config : state.app.config,
    }
}

export default connect(mapStateToProps)(Home)
