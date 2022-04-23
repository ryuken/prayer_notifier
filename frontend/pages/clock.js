import React from 'react'
import {inject, observer} from 'mobx-react'

import getTime from "../getTime"

class Clock extends React.Component {

    state = {
        clock : null,
        now : getTime()
    }

    componentDidMount() {

        this.setState({
            clock : setInterval(() => {
                
                let time = getTime()

                if(time != this.state.now)
                    this.setState({ now: time })
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.clock)
    }

    render() {

        return (
            <div className="flex justify-center">
                <div className="block mt-6 p-6 rounded-lg shadow-lg bg-white bg-opacity-50">
                    <h5 className="text-gray-900 text-xl leading-tight font-large mb-2" style={{ fontSize: "18em" }}>{this.state.now}</h5>
                </div>
            </div>
        )
    }
}

export default inject("stores")(observer(Clock))