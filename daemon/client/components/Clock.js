import React from 'react'
import moment from 'moment'

import {inject, observer} from 'mobx-react'

@inject("stores") @observer
export default class Clock extends React.Component {

    state = {
        clock : null,
        now : moment().format("HH:mm")
    }

    componentDidMount() {

        document.querySelector('body').style['background-image'] = ""
        document.querySelector('body').style['background-color'] = "#000"

        this.setState({
            clock : setInterval(() => {
                this.setState({ now: moment().format("HH:mm") })
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.clock)
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <h1 style={{ fontSize: "18em" }}>
                            {this.state.now}
                        </h1>
                    </div>
                </div>
            </div>
        )
    }
}
