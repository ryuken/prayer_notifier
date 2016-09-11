import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {fetch_prayers, fetch_next_prayer} from '../actions/prayers'
import {fetch_config} from '../actions/config'

class App extends React.Component {

    state = {
        poller : null
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetch_prayers())
        dispatch(fetch_config())

        this.setState({
            poller : setInterval(function() {
                dispatch(fetch_next_prayer())
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.poller)
    }

    render() {

        const year = new Date().getFullYear()

        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default connect()(App)
