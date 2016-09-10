import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {fetch_prayers, fetch_next_prayer} from '../actions/prayers'
import {fetch_config} from '../actions/config'

class App extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetch_prayers())
        dispatch(fetch_next_prayer())
        dispatch(fetch_config())
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
