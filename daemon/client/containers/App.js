import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {fetch_prayers, fetch_next_prayer} from '../actions/prayers'
import {fetch_config} from '../actions/config'

class App extends React.Component {

    state = {
        poller : null,
        backgrounds : [
            '/img/backgrounds/islamic_wallpaper_2.jpg',
            '/img/backgrounds/islamic_wallpaper_3.jpg',
            '/img/backgrounds/islamic_wallpaper_10.jpg',
            '/img/backgrounds/bismillah.jpg',
        ]
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetch_prayers())
        dispatch(fetch_config())

        const {backgrounds} = this.state

        if(window.screen.width >= 800) {

            const randomIndex = Math.floor(Math.random() * (backgrounds.length - 1)) + 0

            const body = document.querySelector('body')
            body.style['background-image'] = `url('${backgrounds[randomIndex]}')`
            body.style.color = "#fff"
        }

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
