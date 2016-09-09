import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

class Home extends React.Component {

    state = {
        nextPrayer : null
    }

    componentWillReceiveProps(nextProps) {
        const {prayers} = nextProps
        this.checkNext(prayers)
    }

    checkNext(prayers) {
        const now = moment()

        const list = [
            "Fajr",
            "Sunrise",
            "Dhuhr",
            "Asr",
            "Maghrib",
            "Isha"
        ]

        if(now.isBefore(moment(prayers.Fajr, "HH:mm")))
            this.setState({ nextPrayer : list[0] })
        else {
            list.forEach(item => {
                const time = moment(prayers[item], "HH:mm")

                if(time.isAfter(now))
                    this.setState({ nextPrayer : item })
            })

            if(now.isAfter(moment(prayers.Isha, "HH:mm").add(1, "hour")))
                this.setState({ nextPrayer : list[0] })
        }
    }

    renderDate() {
        const {prayers} = this.props

        if(prayers.Date) {
            return moment(prayers.Date, "YYYY-M-D").format("DD-MM-YYYY")
        }
    }

    renderPrayer(item) {

        const {prayers, config} = this.props
        const {nextPrayer} = this.state
        let classes = "row prayer-item center-xs"

        if(item == nextPrayer)
            classes += " highlight"

        if("undefined" !== typeof config.Enabled && -1 == config.Enabled.indexOf(item))
            classes += " inactive"
        else
            classes += " active"

        if(prayers[item])
            return (
                <div className={classes}>
                    <div className="col-xs-6">{item}</div>
                    <div className="col-xs-6">{prayers[item]}</div>
                </div>
            )
    }

    render() {

        const {prayers} = this.props

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-3">
                        <img src="/img/mosque.png" style={{ width: "150px", height: "150px" }} />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <h2 className="no-margin" style={{ marginBottom : "10px" }}>{this.renderDate()}</h2>

                        {this.renderPrayer("Fajr")}
                        {this.renderPrayer("Sunrise")}
                        {this.renderPrayer("Dhuhr")}
                        {this.renderPrayer("Asr")}
                        {this.renderPrayer("Maghrib")}
                        {this.renderPrayer("Isha")}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        prayers : state.app.prayers,
        config : state.app.config,
    }
}

export default connect(mapStateToProps)(Home)
